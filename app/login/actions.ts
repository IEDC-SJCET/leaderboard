"use server"

import { login } from "@/lib/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function loginHandler(formData: FormData){
    const id = await login(formData.get("email") as string, formData.get("password") as string)
    if(id){
        cookies().set("SESS", id);
        redirect("/admin");
    }else{
        return "Email or password is incorrect";
    }
}