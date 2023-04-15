
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//Actions
import { logoutAction } from "./actions/logout";

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard"
import ExpensesPage ,{expensesAction, expensesLoader} from "./pages/ExpensesPage"
//Layouts
import Main, { MainLoader } from "./layouts/Main";


//Library
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Error from "./pages/Error"
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import {deleteBudget} from "./actions/deleteBudget";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLoader,
    errorElement: <Error />,
    children :[ {
      index: true,
      element: <Dashboard />,
      loader: dashboardLoader,
      action: dashboardAction,
      errorElement: <Error />
    },
    {
      path: "budget/:id",
      element: <BudgetPage />,
      loader: budgetLoader,
      action: budgetAction,
      errorElement: <Error />,
      children :[ {
        path:"delete",
        action: deleteBudget
      }]
    },
    {
      path: "expenses",
      element: <ExpensesPage />,
      loader: expensesLoader,
      action: expensesAction
    },
  {
    path: "logout",
    action: logoutAction
  }
  ]
  },

  // {
  //   path: "*",
  //   errorElement: <Error />
  // },
  
]);

function App() {
  

  return (
    <div className="App">
     <RouterProvider router={router} />
     <ToastContainer />
    </div>
  )
}

export default App
