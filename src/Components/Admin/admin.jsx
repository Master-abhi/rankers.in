import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../../firebaseinit"
import { collection, onSnapshot } from "firebase/firestore";
// import styles from "../../Styles/Home.module.css"

const Admin = () => {

  const [highlightedJobs, setHightlightedJobs] = useState([]);

  useEffect(()=>{
        

    const unsubscribe1 = onSnapshot(collection(db, "highlightedJobs"), snapShot => {
        const jobs = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setHightlightedJobs(jobs);
    });


    return () => {
        
        unsubscribe1();

    };
},[])

  return (
    <>
    <div className="h-full main w-full flex items-center justify-center">
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

        </div>

    </div>


    </>
  );
};

export default Admin;
