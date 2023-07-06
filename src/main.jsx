import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import i18next from "i18next";

import routes from './routes.jsx';

import './scss/bootstrap.scss';
import './scss/main.scss'
import 'hack-font/build/web/hack.css';
import {initReactI18next} from "react-i18next";


import languageDetector from 'i18next-browser-languagedetector';
import translations from "./translations/index.js";
import {QueryClient, QueryClientProvider} from "react-query";

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ...translations
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

const router = createBrowserRouter(routes);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
