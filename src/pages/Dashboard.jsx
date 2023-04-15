import { Link, useLoaderData } from "react-router-dom"
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"
//components
import Intro from "../components/Intro"
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"
//loader
export function dashboardLoader() {
  const userName = fetchData('userName')
  const budgets = fetchData('budgets')
  const expenses = fetchData('expenses')
  return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {
  await waait()
  const data = await request.formData();
  // const userName = data.get('userName');
  const { _action, ...values } = Object.fromEntries(data)
  if (_action === 'newUser') {
    try {

      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome,${values.userName}`)
    } catch (e) {
      throw new Error("There was a problem createing your account.")
    }
  }
  if (_action === 'createBudget') {
    try {

      createBudget({ name: values.newBudget, amount: values.newBudgetAmount })
      return toast.success("Budget created!")

    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }

  if (_action === 'createExpense') {

    try {
      createExpense({ name: values.newExpense, amount: values.newExpenseAmount, budgetId: values.newExpenseBudget })
      console.log('reach here')
      return toast.success(`Expense ${values.newExpense} created!`)


    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }

  if (_action === 'deleteExpense') {

    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId
      })
      return toast.success(`Expense deleted!`)


    } catch (e) {
      throw new Error("There was a problem deleteing your expense.")
    }
  }

  // console.log("~ dashboardAction ~ userName",formData)
  // console.log({data,request})
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>

          <div className="grid-sm">
            {
              budgets && budgets.length > 0 ?
                (
                  <div className="grid-lg">
                    <div className="flex-sg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existing Budgets</h2>
                    <div className="budgets">
                        {budgets.map((budget)=>(
                                <BudgetItem key={budget.id} budget={budget} showDelete = {false}/>
                                
                        ))}
                    </div>

                    {expenses && expenses.length > 0 && (
            <div className="grid-md">
               <h2>Recent Expenses</h2>
               <Table expenses={expenses.sort((a,b)=>
                b.createdAt  - a.createdAt 
               ).slice(0,8)}/>
            </div>
             
            )}
             {expenses && expenses.length > 8 &&  <Link className="btn btn--dark" to='expenses'>View All Expenses</Link>}
              
                  </div>
                ) : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the scrent financial freedom.</p>
                    <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )
            }
          </div>
        </div>
      ) : <Intro />}

    </>
  )
}

export default Dashboard