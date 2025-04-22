import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    selectedRoom: null, // Estado inicial para la sala seleccionada
  },
  reducers: {
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload; // Guarda la sala seleccionada
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null; // Limpia la sala seleccionada
    },
    updateSelectedRoom: (state, action) => {
      if (state.selectedRoom) {
        // Actualiza solo los campos proporcionados en el payload
        state.selectedRoom = {
          ...state.selectedRoom,
          ...action.payload,
        };
      }
    },
  },
  
});

export const { setSelectedRoom, clearSelectedRoom,updateSelectedRoom } = roomSlice.actions;

export default roomSlice.reducer;