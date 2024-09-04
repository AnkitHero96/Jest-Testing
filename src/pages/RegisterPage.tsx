import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../components/component/utils/firebase';
import { setDoc,doc } from "firebase/firestore";



const RegisterPage = () =>{
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("")
    const [fname,setFName] = useState<string>("")
    const [lname,setLName] = useState<string>("")

    const handleRegister =async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault();
        try{
         await createUserWithEmailAndPassword(auth,email,password);
         const user = auth.currentUser;
         if(user){
            await setDoc(doc(db,"Users",user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
            })
         }
        }catch(error:any){
            console.log(error.message);
        }
    }

    return (
        <div>
    <Navbar/>
    <div className="w-full h-[100vh] bg-[#151414f2] flex flex-col justify-center items-center">
        <h1 className="text-[#bababa] text-[20px] font-semibold mb-4">Register Here !!</h1>
        <form className="w-[30rem] h-auto border-[2px] rounded-[8px] border-[#afaeae] bg-[#53535329] flex flex-col justify-center items-start p-4" onClick={(e)=>e.preventDefault()}>
            <span className="text-white font-medium mb-2">First name</span>
            <input required className="bg-[#0c2626]/60 w-[50%] p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef] mb-3" onChange={(e)=>setFName(e.target.value)}/>
            <span className="text-white font-medium mb-2">Last name</span>
            <input required className="bg-[#0c2626]/60 w-[50%] p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef] mb-3" onChange={(e)=>setLName(e.target.value)}/>
            <span className="text-white font-medium mb-2">Email address</span>
            <input required className="bg-[#0c2626]/60 w-[50%] p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef] mb-3" type="email" onChange={(e)=>setEmail(e.target.value)}/>
            <span className="text-white font-medium mb-2">Password</span>
            <input required className="bg-[#0c2626]/60 w-[50%] p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef]" onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button className="bg-[#0c2626]/60 w-[30%] p-1 rounded-[6px] border border-[#87f7f7] text-[#87f7f7] font-normal text-xs" onClick={(e)=>handleRegister(e)}>Sign Up</button>
        </form>
    </div>
    </div> 
    )
}


export default RegisterPage;