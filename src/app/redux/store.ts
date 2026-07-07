import { currencyApi, swapApi } from "@/06.entities";
import {
  combineReducers,
  configureStore,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const combinedReducer = combineReducers({
  [currencyApi.reducerPath]: currencyApi.reducer,
  [swapApi.reducerPath]: swapApi.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

const rootReducer = (
  state: CombinedState | undefined,
  action: UnknownAction,
) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(currencyApi.middleware, swapApi.middleware),
});

setupListeners(store.dispatch);

export default store;
