const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    case "UPDATE_NOTIFICATIONS":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.payload.find((updated) => updated.id === notification.id)
            ? { ...notification, isRead: true }
            : notification
        ),
      };
    default:
      return state;
  }
};

export default notificationReducer;
