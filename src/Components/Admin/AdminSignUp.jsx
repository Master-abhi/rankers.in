import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../../firebaseinit"
import { setDoc, doc } from "firebase/firestore";
import styles from "../../Styles/Login.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseinit";
import { toast } from "react-toastify";

const AdminSignUp = () => {

  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password === confirmPassword){
      try{
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user)
        console.log("User registered successfully!")
        toast.success("User registered successfully!", {
          position: "top-center"
      }
      
    )
        if (user){
          await setDoc(doc(db, "Users", user.uid),{
            email:  email,
            firstName: fName,
            lastName: lName
          });
        }

        window.location.href = '/adminLogin'

    }catch (error){
        console.log(error.message)
        toast.error(error.message, {
          position: "top-center"
      })
    }

    setFname("")
    setLname("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    }else{
      console.log("password and confirm password are not matched!!")
      toast.error("password and confirm password are not matched!!", {
        position: "top-center"
    })
    }

  };

  return (
    <div className="flex items-center justify-center w-full">
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="First name"
            value={fName}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={lName}
            onChange={(e) => setLname(e.target.value)}
            required
          />
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
          <input
            type="text"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign up</button>
        </form>
        <div>Already registered? <Link to="/adminLogin">Log in</Link></div>
        {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
      </div>
    </div>
    
    </div>
  );

}


export default AdminSignUp;
