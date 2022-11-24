import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { NotFound } from "./components/NotFound";
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import Mans from './components/Mans';


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/mans',
        requireAuth: true,
        element: <Mans />
    },
    {
        path: '*',
        element: <NotFound />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
