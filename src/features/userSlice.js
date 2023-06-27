import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
}
export  const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setMode: (state) => {state.mode = state.mode === 'light' ? 'dark' : 'light'},
        setUser: (state, actions) => {state.user = actions.payload},
        setToken: (state, actions) => {state.token = actions.payload}
    }

})

export const {setMode, setUser, setToken} = userSlice.actions;
export default userSlice.reducer;
