import { configureStore } from '@reduxjs/toolkit';



export const store = configureStore({
    reducer: {
        auth: authReducer,

    },
});

store.subscribe(() => {
    const user = store.getState().auth.user;
    try {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    } catch {
        console.log('Error in (../stores/index.js)! <--');
    }
})