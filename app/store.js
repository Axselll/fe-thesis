import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./appSlice";
import tokenReducer from "./tokenSlice";

const persistConfig = {
	key: "root",
	storage,
};
const persistedAppReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
	reducer: {
		app: persistedAppReducer,
		token: tokenReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
