import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import Airplanes from './components/Airplanes/Airplanes';
import EditAirplanes from './components/Airplanes/EditAirplanes';
import Mans from './components/Mans/Mans';
import EditMans from './components/Mans/EditMans';
import { Tickets } from './components/Tickets/Tickets';
import { EditTickets } from './components/Tickets/EditTickets';
import Flights from './components/Flights/Flights';
import EditFlights from './components/Flights/EditFlights';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';




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
        path: '/airplanes',
        requireAuth: true,
        element: <Airplanes />
    },
    {
        path: '/mans',
        requireAuth: true,
        element: <Mans />
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
        path: '/tickets/edit',
        requireAuth: true,
        element: <EditTickets />
    },
    {
        path: '/flights',
        requireAuth: false,
        element: <Flights />
    },
    {
        path: '/flights/edit',
        requireAuth: true,
        element: <EditFlights />
    },
    {
        path: '*',
        element: <NotFound />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
