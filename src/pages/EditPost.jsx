import { useEffect, useState } from "react";
import appwriteService from "../appwrite/Config";
import { PostForm } from "../components";
import { useParams } from "react-router";
import {Container} from "../components";

export default function EditPost(){

    const {slug} = useParams();
    const [post, setPost] = useState("")
    useEffect(()=>{
        appwriteService.getRow(slug).then((row)=>setPost(row))
    },[])

    return(
        <div className="flex justify-center items-center w-full ">
            <Container>
            <PostForm post = {post}/>
            </Container>
        </div>
    )
}