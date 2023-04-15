import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
//library


export async function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id
          })
         const associatedExpenses = await getAllMatchingItems({
            category:"expenses",
            key:"budgetId",
            value:params.id
         })
         associatedExpenses.forEach((expense)=>{
            deleteItem({key:"expenses",
            id:expense.id})
         })
         toast.success("Budget deleted successfully!")
    }catch(e){
        throw new Error("There was a problem deleteting your budget.")
    }
    return redirect("/")
}