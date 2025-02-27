export const SET_CHILDREN = "SET_CHILDREN";
export const ADD_CHILD = "ADD_CHILD";
export const UPDATE_CHILD = "UPDATE_CHILD";
export const SELECT_CHILD = "SELECT_CHILD";

export const setChildren = (children) => ({
  type: SET_CHILDREN,
  payload: children,
});

export const addChild = (child) => ({
  type: ADD_CHILD,
  payload: child,
});

export const updateChild = (child) => ({
  type: UPDATE_CHILD,
  payload: child,
});

export const selectChild = (child) => ({
  type: SELECT_CHILD,
  payload: child,
});