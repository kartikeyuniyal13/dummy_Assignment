import { connectToDb } from "../db";


export async function createUser (){
    try{
        connectToDb();

        const newUser=
    }
    catch(error){
        console.error("Error creating user", error);
    }

}