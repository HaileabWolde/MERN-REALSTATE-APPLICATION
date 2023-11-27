import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CurrentUser: null,
    Error: null,
    Loading: false
  }

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      SignInStart: (state) => {
        state.Loading = true
      },
      SignInSuccess: (state, action) => {
        state.CurrentUser = action.payload
        state.Error = false
        state.Loading = false 
      },
      SignInFailure: (state, action)=>{
        state.Error = action.payload
        state.Loading = false
      },
      UpdateInStart: (state)=>{
        state.Loading = true
      },
      UpdateInSuccess: (state, action)=>{
        state.CurrentUser = action.payload
        state.Error = false
        state.Loading = false
      },
      UpdateInFailure: (state, action)=>{
        state.Error = action.payload
        state.Loading = true
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { SignInStart,  SignInSuccess, SignInFailure, 
    UpdateInFailure, UpdateInSuccess, UpdateInStart } = userSlice.actions
  
  export default userSlice.reducer
  