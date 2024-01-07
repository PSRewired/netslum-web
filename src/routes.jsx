import App from './components/App.jsx';
import Home from './components/App/Home.jsx';
import NotFound from './components/App/NotFound.jsx';
import ViewCharacter from './components/Players/ViewCharacter.jsx';
import SearchCharacters from './components/Players/SearchCharacters.jsx';

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
        element: <Home />,
      },
      {
        path: 'akashic-records',
        children: [
          {
            index: true,
            element: <SearchCharacters />,
          },
          {
            path: ':id',
            element: <ViewCharacter />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
