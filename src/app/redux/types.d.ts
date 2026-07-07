import store from "./store";

type AppStore = typeof store;

declare global {
  type RootState = ReturnType<AppStore["getState"]>;
  type AppDispatch = AppStore["dispatch"];
}

export {};
