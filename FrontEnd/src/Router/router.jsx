import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequestPassword from "../pages/RequestPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyPage from "../pages/Verification";




const ROUTES = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "auth",
                element: <Auth />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },

                ]
            },
            {
                path: "password/request",
                element: <RequestPassword />
            },
            {
                path: "/resetpassword/:token",
                element: <ResetPassword />
            },
            {
                path: "/verify/:token",
                element: <VerifyPage/>
            },
        ]
    }
]

export default ROUTES