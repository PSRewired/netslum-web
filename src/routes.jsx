import App from "./components/App.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ViewCharacter from "./pages/ViewCharacter.jsx";
import SearchCharacters from "./pages/SearchCharacters.jsx";

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
                path: 'akashic-records',
                children: [
                    {
                        index: true,
                        element: <SearchCharacters/>
                    },
                    {
                        path: ':id',
                        element: <ViewCharacter/>
                    },
                ]
            },
            {
                path: '*',
                element: <NotFound/>,
            },
        ],
    },
];

export default routes;