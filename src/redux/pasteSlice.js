import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';
import toast from 'react-hot-toast'

const initialState = {
  pastes:localStorage.getItem("pastes") 
  ? JSON.parse(localStorage.getItem("pastes")) 
  : []
}

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    AddToPastes: (state , action) => {
      console.log("Payload : ", action.payload);
      
      const paste = action.payload;
      if(paste) {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully");
      }
    },

    UpdateToPastes: (state , action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updates Succesfully");
      } 
    },

    resetAllPastes: (state, action) => {
      state.pastes=[];

      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      
      const index = state.pastes.findIndex((item) => 
        item._id === pasteId
      )

      if(index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));

        toast.success("Paste Deleted Successfully");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { AddToPastes, UpdateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer