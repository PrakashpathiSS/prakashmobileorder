//  ** import core packages:
import React from "react";

// ** import state management:
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../store";

const Providers = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
