import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CreateBrowserRouter, BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddUser from './components/AddUser';
import Home from './components/Home';
import Shorts from './components/Shorts';
import { ConfirmProvider } from "material-ui-confirm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/leave-booking",
        element: <Shorts />
    },
    {
        path: "/users",
        element: <AddUser />
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <ConfirmProvider>
                <App />
            </ConfirmProvider>
        </BrowserRouter>
        {/* <RouterProvider router={router}/> */}
    </>

);


