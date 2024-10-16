import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../../firebaseinit"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import styles from "../../Styles/Home.module.css";
import { storage } from "../../firebaseinit";
import Footer from "../Navbar/Footer";

const Home = () => {

  const [highlightedJobs, setHightlightedJobs] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading]= useState(true);

  useEffect(()=>{
        

    const unsubscribe1 = onSnapshot(
      query(collection(db, "highlightedJobs"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        const jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      setHightlightedJobs(jobs);
      }
    );
    const unsubscribe2 = onSnapshot(
      query(collection(db, "tests"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        const tests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
      setTests(tests);
      setLoading(false)
      }
    );



    return () => {
        
        unsubscribe1();
        unsubscribe2();

    };
},[])

  return (
    <>
      {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
      <div className="flex items-center justify-center flex-col">
        <div className="h-full w-full md:w-3/5 m-10 rounded-md flex flex-col items-center bg-[#38874C]">
        <img className="h-full w-auto" src="https://firebasestorage.googleapis.com/v0/b/rankers-c47cb.appspot.com/o/rankers%20banner.png?alt=media&token=8ad787a1-480f-4f0d-bbe8-833704b965c3"/>
 

        </div>
        {/*-------------------------------------------------- Exams -------------------------------------------------- */}
        <div className="h-10 w-full md:w-3/5 m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg  text-center w-full md:w-[30%] ">New Jobs</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
        <div className="exam-div h-full w-full md:w-3/5">
          
          {loading? <div className="h-[200px] w-full flex items-center justify-center">
            <i>Loading...</i>
          </div> : <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
          {highlightedJobs.map((data)=>
                 data.newMark === true ? <Link to={`/jobs/${data.id}`} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} ><h1>{data.JobsName}</h1></div>
                  </Link> : ""
              )}


            <Link to="/jobs" className="h-10 w-full ">
              <div className={`text-[#38874C] font-bold ${ styles.examDiv}`}>
                more Jobs
              </div>
            </Link>
          </div>}
        </div>
        {/*-------------------------------------------------- Tests -------------------------------------------------- */}
        <div className="h-10 w-full md:w-3/5 m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg text-center  w-full md:w-[30%]">New Tests</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
        <div className="test-div w-full md:w-3/5">
          
        {loading? <div className="h-[200px] w-full flex items-center justify-center">
          <i>Loading...</i>
          </div> :<div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
          {tests.map((data)=>
                 data.newMark === true ? <Link to={`/tests/${data.id}`} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} ><h1>{data.testName}</h1></div>
                  </Link> : ""
              )}

            <Link to="/tests" className="h-10 w-full ">
              <div className={`text-[#38874C] font-bold ${ styles.examDiv}`}>
                more Tests
              </div>
            </Link>
          </div>}
        </div>
        <Footer/>
        <div className="h-[50px]"></div>
      </div>
    </>
  );
};

export default Home;
