import {Input} from "./index"
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import authService from "../appwrite/Auth"
import { toggleLoginRedux } from "../store/AuthSlice"

export default function Login(){
    
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function submit(data){
        try {
            authService.createEPSession({email: data.email, password: data.password})
            const userData = await authService.getAccount()
            if(userData){
                dispatch(toggleLoginRedux(userData))
                console.log(userData);
                
                navigate("/")
            }
        } catch (error) {
            console.log("/src/components/login.jsx: ", error);
            
        }
    }
    
    return(
        <div >
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-10 border rounded justify-center items-center w-full p-2 m-4 py-6" >
            <Input label={`username`} type="text" {...register("email",{required:true})}/>
            <Input label={`password`} type="password"{...register("password",{required:true})}/>
            <button type="submit" className="bg-blue-500 font-medium rounded w-full">submit</button>
            </form>
        </div>
    )
}