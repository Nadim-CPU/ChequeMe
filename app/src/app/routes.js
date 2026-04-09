
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

export const routes = [
    {path: "/", element: Home},
    {path: "/about", element: About},
    {path: "/login", element: Login},
    {path: "/register", element: Register},
 

];