import { ID } from "appwrite";

export default function Input({type="text",label,ref,...props}){
 return(
    <div className="border rounded p-1 px-2 flex w-full items-center">
    <input type={type} id={ID.unique()} {...props} ref={ref} className={`focus:outline-none`} placeholder={label}/>
    </div>
 )
}