import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
	token: null,
};

const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export default tokenSlice.reducer;
const setToken = tokenSlice.actions.setToken;
export { setToken };
