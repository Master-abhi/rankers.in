import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../../firebaseinit"
import { collection, onSnapshot } from "firebase/firestore";
import styles from "../../Styles/Home.module.css"

const Home = () => {

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
      {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
      <div className="flex items-center justify-center flex-col">
        <div className="h-60 w-full md:w-3/5 m-10 rounded-md flex justify-center p-4 bg-[#74c78a]">
          <span className="text-red-700 text-2xl">Welcome to Rankers.in</span>
        </div>
        {/*-------------------------------------------------- Exams -------------------------------------------------- */}
        <div className="h-10 w-full md:w-3/5 m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg  text-center w-[100%] ">New Exams</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
        <div className="exam-div h-full w-full md:w-3/5">
          
          <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
          {highlightedJobs.map((data)=>
                            
                               <Link to={`/jobs/${data.id}`} className="w-full"> 
                               <div key={data.id} className={styles.examDiv} >{data.JobsName}</div>
                                </Link>
                            
                            )}

            <Link to="/jobs" className="h-10 w-full ">
              <div className={`text-[#38874C] font-bold ${ styles.examDiv}`}>
                more Exams
              </div>
            </Link>
          </div>
        </div>
        {/*-------------------------------------------------- Tests -------------------------------------------------- */}
        <div className="h-10 w-full md:w-3/5 m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg text-center w-[100%]">New Tests</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
        <div className="test-div w-full md:w-3/5">
          
          <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
            <div className={styles.examDiv}>
              test
            </div>

            <Link to="/tests" className="h-10 w-full ">
              <div className={`text-[#38874C] font-bold ${ styles.examDiv}`}>
                more Tests
              </div>
            </Link>
          </div>
        </div>
        <div className="h-[50px]"></div>
      </div>
    </>
  );
};

export default Home;
