import { configureStore} from '@reduxjs/toolkit';
import { AdminReducer, PublicReducer } from '../features/Reducers';
import userReducer from '../features/Public/Login/LoginSlice';
import redirectSlice from '../redirectSlice';


export const store = configureStore({
  reducer: {
    public: PublicReducer,
    admin: AdminReducer,
    user: userReducer,
    redirect: redirectSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
