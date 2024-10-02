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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext";
import {SocketContext, socket} from "./context/socketContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <IntlProviderWrapper>
      <AuthContextProvider>
        <SocketContext.Provider value={socket}>
          <QueryClientProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App persistor={persistor} />
            </LocalizationProvider>
          </QueryClientProvider>
        </SocketContext.Provider>
      </AuthContextProvider>
    </IntlProviderWrapper>
  </Provider>
);

serviceWorker.unregister();
