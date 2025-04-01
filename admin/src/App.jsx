import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Analytics from "@/routes/analytics/analytics"
import Reports from "@/routes/reports/reports"
import Users from "@/routes/users/users"
import Busses from "@/routes/busses/busses"
import Addbus from "@/routes/add-bus/addbus"
import Updatebus from "@/routes/update-bus/updatebus"
import Settings from "@/routes/settings/settings"

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <Analytics/>,
                },
                {
                    path: "reports",
                    element: <Reports/>,
                },


                {
                    path: "users",
                    element: <Users/>,
                },
                /*{
                    path: "new-customer",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },*/


                {
                    path: "busses",
                    element: <Busses/>,
                },
                {
                    path: "add-bus",
                    element: <Addbus/>,
                },
                {
                    path: "update-bus",
                    element: <Updatebus/>,
                },


                {
                    path: "settings",
                    element: <Settings/>,
                },

            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
