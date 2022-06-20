import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
	isAuthenticated: false,
	authUser: null,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setIsAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		setAuthUser: (state, action) => {
			state.authUser = action.payload;
		},
	},
});

export default appSlice.reducer;
const setIsAuthenticated = appSlice.actions.setIsAuthenticated;
const setAuthUser = appSlice.actions.setAuthUser;
export { setIsAuthenticated, setAuthUser };
