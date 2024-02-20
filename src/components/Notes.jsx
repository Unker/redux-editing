import { useDispatch, useSelector } from "react-redux";
import { APPEND_NOTE, EDIT_NOTE, DELETE_NOTE } from "../redux/actions";
import { useState } from "react";


const Notes = () => {
  const dispatch = useDispatch();
  const { notesList } = useSelector((state) => state.notes);

  const [noteText, setNoteText] = useState('');
  const [notePrice, setNotePrice] = useState('');
  const [editId, setEditId] = useState('');

  const handleNoteTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleNotePriceChange = (e) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setNotePrice(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: editId ? EDIT_NOTE : APPEND_NOTE,
      payload: {
        id: editId,
        text: noteText,
        price: notePrice,
      },
    });
  }

  const editNote = (noteId) => {
    let note = notesList.filter((item) => item.id === noteId)[0]
    if(note) {
      setNoteText(note.text)
      setNotePrice(note.price)
      setEditId(noteId);
    }
  }

  const cancelEdit = () => {
    setEditId('');
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input type="text" required placeholder='Задача...' value={noteText}
            onChange={handleNoteTextChange}
          />
          <input type="number" required placeholder='Цена...' value={notePrice}
            onChange={handleNotePriceChange}
          />
          <button>Save</button>
          {editId && <button onClick={cancelEdit}>Cacnel</button>}
        </div>
      </form>

      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {notesList && notesList.map((row) => (
            <tr key={row.id}>
              <td>{row.text}</td>
              <td>{row.price}</td>
              <td>
                <button
                  onClick={(e) => {
                    dispatch({
                      type: DELETE_NOTE,
                      payload: {id: row.id},
                    });
                  }}
                >✘</button>
                <button onClick={() => editNote(row.id)}>✎</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Notes;
