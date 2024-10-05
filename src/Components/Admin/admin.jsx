import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {auth, db} from "../../firebaseinit"
import { collection, onSnapshot } from "firebase/firestore";
// import styles from "../../Styles/Home.module.css"

const Admin = () => {

  const [isLoggedin, setLoggedin] = useState(false);

    const fetchuser = async ()=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                setLoggedin(true)

            }
            else{
                console.log("user not logged in.")
            }
        })
    }

  useEffect(()=>{
    fetchuser();
},[])

    const handleLogout = () => {
        auth.signOut();
        window.location.href = "/adminLogin"
    }

  return (
    <>
    <div className="h-full main w-full flex items-center justify-center">
        { isLoggedin ? 
    <div className="h-full main w-full flex flex-col items-center justify-center my-10">
        <Link to='jobs-admin'>
            <div className="flex justify-center items-center h-20 w-[200px] rounded-xl border border-black m-10">
                <span>Exams</span>
            </div>
        </Link>
        <Link to='tests-admin'>
            <div className="flex justify-center items-center h-20 w-[200px] rounded-xl border border-black m-10">
                <span>Tests</span>
            </div>
            </Link>
            <Link to='updates-admin'>
            <div className="flex justify-center items-center h-20 w-[200px] rounded-xl border border-black m-10">
                <span>Updates</span>
            </div>
            </Link>
            <div onClick={handleLogout} className="flex items-center justify-center border border-black rounded-md h-[50px] w-[100px]">
                Log out
            </div>

        </div>
        :
        <div className="m-10">
            <span>"Please log in first"  </span>
            <Link to="/adminLogin">
            <div className="p-3 rounded-md border-2 border-black hover:border-[#38874C] my-10">
                Go ot Log in page
            </div>
            </Link>
            
        </div>
          
    }

    </div>


    </>
  );
};

export default Admin;
