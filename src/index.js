import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* 
        PesistGate - принимает два значения: loading - на случай если у нас большая логика мы будем показывать загрузку,
        вторая эта наш persistor
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
