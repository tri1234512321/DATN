/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/styles.scss";
// import App from "./App";
import App from "./routes/AppRoute";

import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <App persistor={persistor} />
            </IntlProviderWrapper>
        </Provider>
    </React.StrictMode>,
);

serviceWorker.unregister();
