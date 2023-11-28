import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CurrentUser: null,
    Error: null,
    Loading: false,
    token: null
  }

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      SignInStart: (state) => {
        state.Loading = true
      },
      SignInSuccess: (state, action) => {
        state.CurrentUser = action.payload.rest
        state.Error = false
        state.Loading = false 
        state.token = action.payload.token
      },
      ErrorInSuccess: (state)=>{
        state.Error = false
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
        state.Loading = false
      },
      DeleteInStart: (state)=>{
        state.Loading = true
      },
      DeleteInFailure: (state)=>{
        state.Error = action.payload,
        state.Loading = false
      },
      DeleteInSuccess: (state)=>{
        state.CurrentUser = null
        state.Error = null,
        state.Loading = false
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { SignInStart,  SignInSuccess, SignInFailure, 
    UpdateInFailure, UpdateInSuccess, UpdateInStart, ErrorInSuccess,
    DeleteInFailure, DeleteInStart, DeleteInSuccess
   } = userSlice.actions
  
  export default userSlice.reducer
  