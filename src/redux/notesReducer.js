import { v4 as uuidv4 } from 'uuid';
import { APPEND_NOTE, EDIT_NOTE, DELETE_NOTE } from "./actions";

const initialState = {
  notesList: [
    {
      id: "1",
      text: "Замена стекла",
      price: 21000,
    }
  ],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_NOTE:
      let newNote = action.payload;
      newNote = {
        ...newNote,
        id: uuidv4(),
        text: action.payload.text,
        price: Number(action.payload.price)
      }
      state.notesList.push(note);
      return state;

    case EDIT_NOTE:
      state.notesList = state.notesList.filter((item) => item.id !== action.payload.id)
      let editNote = action.payload;
      editNote = {
        ...editNote,
        id: action.payload.id,
        text: action.payload.text,
        price: Number(action.payload.price)
      }
      state.notesList.push(editNote);
      return state

    case DELETE_NOTE:
      debugger
      state.notesList = state.notesList.filter((item) => item.id !== action.payload.id)
      return state;

    default:
      return state;
  }
};

export default notesReducer;
