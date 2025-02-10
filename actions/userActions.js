export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});