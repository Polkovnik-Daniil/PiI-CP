import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { NotFound } from "./components/NotFound";
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import Airplanes from './components/Airplanes/Airplanes';
import EditAirplanes from './components/Airplanes/EditAirplanes';

import Mans from './components/Mans/Mans';
import EditMans from './components/Mans/EditMans';
import { Tickets } from './components/Tickets/Tickets';



const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/airplanes/edit',
        requireAuth: true,
        element: <EditAirplanes />
    },
    {
        path: '/mans',
        requireAuth: true,
        element: <Mans />
    },
    {
        path: '/airplanes',
        requireAuth: true,
        element: <Airplanes />
    },
    {
        path: '/mans/edit',
        requireAuth: true,
        element: <EditMans />
    },
    {
        path: '/tickets',
        requireAuth: true,
        element: <Tickets />
    },
    {
        path: '*',
        element: <NotFound />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
