import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../../firebaseinit"
import { setDoc, doc } from "firebase/firestore";
import styles from "../../Styles/Login.module.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import { toast } from "react-toastify";

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

      try{
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user)
        console.log("User Logged in successfully!")
        toast.success("User Logged in successfully!", {
          position: "top-center"
      })
      window.location.href = "/admin"
    }catch (error){
        console.log(error.message)
        toast.error(error.message, {
          position: "top-center"
      })
    }


    setEmail("")
    setPassword("")


  };

  return (
    <div className="flex items-center justify-center w-full">
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
         
          <button type="submit">Log in</button>
        </form>

        {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
      </div>
    </div>
    
    </div>
  );

}


export default AdminLogin;
