import App from "./components/App.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * @see https://reactrouter.com/en/main/routers/create-browser-router
 */
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '*',
                element: <NotFound/>,
            },
        ],
    },
];

export default routes;