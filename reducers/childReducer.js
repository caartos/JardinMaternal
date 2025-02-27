import { ADD_CHILD, SET_CHILDREN, UPDATE_CHILD, SELECT_CHILD } from "../actions/childActions";

const initialState = {
  children: [],
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHILDREN:
      return {
        ...state,
        children: action.payload,
      };
    case ADD_CHILD:
      return {
        ...state,
        children: [...state.children, action.payload],
      };
    case UPDATE_CHILD:
      return {
        ...state,
        children: state.children.map((child) =>
          child.id === action.payload.id ? action.payload : child
        ),
      };
    case SELECT_CHILD:
      return {
        ...state,
        selectedChild: action.payload,
      };
    default:
      return state;
  }
};

export default childReducer;
