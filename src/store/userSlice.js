import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'isUser', 
    initialState: { 
        user: null,
    },
    reducers: {
        addUser(state, action) {
            state.user = action.payload 
        }, 
        logOut(state) {
            state.user = null
        }
    }
})
 
export const { addUser, logOut  } = userSlice.actions
export default userSlice.reducer 