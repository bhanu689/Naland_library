import { loginUser } from "./Auth/login.js";
import {registerUser} from "./Auth/Register.js"




const authController = {
    login : loginUser,
    register : registerUser,
   
}

export {authController}