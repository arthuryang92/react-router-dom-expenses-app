import { useLoaderData } from "react-router-dom"
import {deleteItem, fetchData} from '../helpers'
import ExpenseItem from '../components/ExpenseItem'
import Table from "../components/Table"
import { toast } from "react-toastify"
export function expensesLoader() { 
  
    const expenses = fetchData('expenses')
    return { expenses }
  }
  
  export async function expensesAction({ request }) {
   
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

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
    
  }

const ExpensesPage = () => {
    const { expenses } = useLoaderData()

  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {expenses && expenses.length > 0 ? (
            <div className="grid-md">
           <div className="table">
            <h2>Recent Expenses <small>({expenses.length} Total)</small></h2>
           <Table expenses={expenses}>
           <thead>
                   <tr>
                       {["Name","Amount","Date"].map((i,index)=>(
                           <th key={index}>{i}</th>
                       ))}
                   </tr>
               </thead>
               <tbody>
                   {expenses.sort((a,b)=>
                b.createdAt  - a.createdAt 
               ).map((expense)=>(
                       <tr key={expense.id}>
                       <ExpenseItem expense = {expense}/>
                       </tr>
                   ))}
               </tbody>
           </Table>
   
       </div>
       </div>      
        ) : <p>No Expenses</p> }
  
    </div>
  )
}

export default ExpensesPage