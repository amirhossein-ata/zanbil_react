import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage
};
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware), applyMiddleware(logger))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
