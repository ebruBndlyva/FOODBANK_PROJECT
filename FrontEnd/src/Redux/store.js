import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import apis from "./services";
import CounterReducer from "./slice/CounterSlice"
import BasketReducer from "./slice/BasketSlice"
const reducers = { counter: CounterReducer, basket: BasketReducer };
const middlewares = [];

apis.forEach((api) => {
  reducers[api.reducerPath] = api.reducer;
  middlewares.push(api.middleware);
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);
