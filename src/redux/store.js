import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
// import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
