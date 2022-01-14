import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userObj: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userObj = action.payload;
    },
  },
  setSignOut: (state) => {
    state.userObj = {};
  },
});

export const { setUserLogin, setSignOut } = userSlice.actions;
export const selectUser = (state) => state.user.userObj;
export default userSlice.reducer;
