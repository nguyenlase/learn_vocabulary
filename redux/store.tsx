import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slice/UserSlice';

const store = configureStore({
    reducer: {
        userState: UserSlice,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;