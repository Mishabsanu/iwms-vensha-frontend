import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import reducers from "../reducers";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const bindMiddleware = (middleware) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return composeEnhancers(applyMiddleware(...middleware));
};

// Load state from session storage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    // Parse the state
    const parsedState = JSON.parse(serializedState);

    // Verify the state signature
    const { state, signature } = parsedState;
    const isValid = verifySignature(state, signature);
    if (!isValid) {
      console.error(
        "State signature verification failed. State may have been tampered with."
      );
      return undefined;
    }

    return state;
  } catch (err) {
    console.error("Error loading state from session storage:", err);
    return undefined;
  }
};

// Save state to session storage
const saveState = (state) => {
  try {
    // Create a signed token for the state
    const signature = signState(state);
    const signedState = JSON.stringify({ state, signature });
    sessionStorage.setItem("reduxState", signedState);
  } catch (err) {
    console.error("Error saving state to session storage:", err);
  }
};

// Dummy functions for signing and verifying the state
const signState = (state) => {
  // Replace this with your actual signing logic
  return "dummy-signature";
};

const verifySignature = (state, signature) => {
  // Replace this with your actual signature verification logic
  return signature === "dummy-signature";
};


function configureStore(initialState = {}) {
  // Load persisted state from local storage
  const persistedState = loadState();

  const store = createStore(
    reducers(history),
    persistedState || initialState,
    bindMiddleware([routeMiddleware, thunk])
  );

  // Save state to local storage before page unloads
  window.addEventListener("beforeunload", () => {
    saveState(store.getState());
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const exportReducers = require("../reducers");
      store.replaceReducer(exportReducers);
    });
  }
  return store;
}
export default configureStore;
export { history };
