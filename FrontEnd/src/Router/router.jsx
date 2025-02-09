import Addons from "../pages/Admin/Administrators/Addons";
import AdminUsers from "../pages/Admin/Administrators/AdminUsers";
import Customers from "../pages/Admin/Administrators/Customers";
import DeliveryBoys from "../pages/Admin/Administrators/DeliveryBoys";
import RestaurantOwners from "../pages/Admin/Administrators/RestaurantOwners";
import Role from "../pages/Admin/Administrators/Role";
import Update from "../pages/Admin/Administrators/Update";
import AdminLayout from "../pages/Admin/AdminLayout";
import Complaints from "../pages/Admin/Complaints";
import Coupons from "../pages/Admin/Coupons";
import Dashboard from "../pages/Admin/Dashboard";
import BankDetails from "../pages/Admin/Finance/BankDetails";
import Collections from "../pages/Admin/Finance/Collections";
import Expenses from "../pages/Admin/Finance/Expenses";
import RequestWithDraw from "../pages/Admin/Finance/ReqWithDraw";
import Transaction from "../pages/Admin/Finance/Transactions";
import WithDraw from "../pages/Admin/Finance/WithDraw";
import AllPages from "../pages/Admin/FrontendCMS/AllPages";
import AppBanners from "../pages/Admin/FrontendCMS/Banners";
import Language from "../pages/Admin/Language";
import Categories from "../pages/Admin/MenageRestaurants/categories";
import Cousins from "../pages/Admin/MenageRestaurants/Cousins";
import MenuItems from "../pages/Admin/MenageRestaurants/MenuItems";
import Raiting from "../pages/Admin/MenageRestaurants/Raiting";
import Tables from "../pages/Admin/MenageRestaurants/Tables";
import TimeSlots from "../pages/Admin/MenageRestaurants/TimeSlots";
import PendingOrders from "../pages/Admin/PendingOrders";
import PushNotification from "../pages/Admin/PushNotification";
import AdminCommision from "../pages/Admin/Report/AdminCommision";
import CollectionReport from "../pages/Admin/Report/CollectionReport";
import CreditBalance from "../pages/Admin/Report/CreditBalance";
import CustomerReport from "../pages/Admin/Report/CustomerReport";
import DeliveryOrderBalance from "../pages/Admin/Report/DeliveryOrderBalance";
import OwnerSales from "../pages/Admin/Report/OwnerSales";
import ReservationReport from "../pages/Admin/Report/ReservationReport";
import WithdrawReport from "../pages/Admin/Report/WithDrawReport";
import Restaurants from "../pages/Admin/Restaurants";
import Orders from "../pages/Admin/Sales/Orders";
import Rezervations from "../pages/Admin/Sales/Rezervations";
import Settings from "../pages/Admin/Settings";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequestPassword from "../pages/RequestPassword";
import ResetPassword from "../pages/ResetPassword";
import About from "../pages/User/About";
import Contact from "../pages/User/Contact";
import Privaciy from "../pages/User/Privaciy";
import Terms from "../pages/User/Terms";
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
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> }
                ]
            },
            { path: "password/request", element: <RequestPassword /> },
            { path: "/resetpassword/:token", element: <ResetPassword /> },
            { path: "/verify/:token", element: <VerifyPage /> },
            
                {
                    path:"/about",
                    element:<About/>
                },
                {
                    path:"/terms",
                    element:<Terms/>
                },
                {
                    path:"/contact",
                    element:<Contact/>
                },
                {
                    path:"/privaciy",
                    element:<Privaciy/>
                }
            
        ]
    },
    // Admin routing 
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "restaurants", element: <Restaurants /> },
            // menage restaurants
            { path: "category", element: <Categories /> },
            { path: "menu-items", element: <MenuItems /> },
            { path: "cousine", element: <Cousins /> },
            { path: "time-slots", element: <TimeSlots /> },
            { path: "tables", element: <Tables /> },
            { path: "rating", element: <Raiting /> },
            // sales
            { path: "reservation", element: <Rezervations /> },
            { path: "orders", element: <Orders /> },
            // complaints
            { path: "complaints", element: <Complaints /> },
            // coupons
            { path: "coupons", element: <Coupons /> },
            // finance
            { path: "transaction", element: <Transaction /> },
            { path: "collection", element: <Collections /> },
            { path: "request-withdraw", element: <RequestWithDraw /> },
            { path: "withdraw", element: <WithDraw /> },
            { path: "bank", element: <BankDetails /> },
            { path: "expenses", element: <Expenses /> },
            // Adminstrators
            { path: "users", element: <AdminUsers /> },
            { path: "customers", element: <Customers /> },
            { path: "delivery-boys", element: <DeliveryBoys /> },
            { path: "restaurant-owners", element: <RestaurantOwners /> },
            { path: "role", element: <Role /> },
            { path: "update", element: <Update /> },
            { path: "addons", element: <Addons /> },
            // Report
            { path: "restaurant-owner-sales-report", element: <OwnerSales /> },
            { path: "admin-commission-report", element: <AdminCommision /> },
            { path: "credit-balance-report", element: <CreditBalance /> },
            { path: "delivery-order-balance-report", element: <DeliveryOrderBalance /> },
            { path: "customer-report", element: <CustomerReport /> },
            { path: "withdraw-report", element: <WithdrawReport /> },
            { path: "collection-report", element: <CollectionReport /> },
            { path: "reseervation-report", element: <ReservationReport /> },
            // Frontend cms
            { path: "banner", element: <AppBanners /> },
            { path: "page", element: <AllPages /> },
            // push notification
            { path: "push-notification", element: <PushNotification /> },
            // language
            { path: "language", element: <Language /> },
            // Settings
            { path: "settings", element: <Settings /> },
            // pending orders
            { path: "pending-orders", element: <PendingOrders /> }

        ]
    }
];

export default ROUTES;

