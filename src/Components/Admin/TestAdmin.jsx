import {collection, doc, setDoc, deleteDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../Styles/Home.module.css"

const TestsAdmin = ()=>{
    const [tests, setTests] = useState([]);

    useEffect(()=>{
          
  
      const unsubscribe1 = onSnapshot(collection(db, "tests"), snapShot => {
          const test = snapShot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          setTests(test);
      });
  
  
      return () => {
          
          unsubscribe1();
  
      };
  },[])

    const deleteBtn = async (id)=>{
        await deleteDoc(doc(db, "tests", id));
    }

    return (
        <>

        <div className="h-full main w-full flex items-center justify-center">
        <div className="h-full main w-full md:w-[60%] flex flex-col items-center justify-center my-10">
        <div className={`mx-10 ${styles.adminExam}`} >
                    <Link to={`test-post-admin`} className="w-[90%]"> 
                    <div className=" text-center">Add New Job Post</div>
                    </Link>
                    </div>
        <div className="h-10 w-full  m-5 rounded-md flex justify-center items-center ">
        
          <div className="w-full h-1 border bg-red-700"></div>
          <span className="text-red-700 text-lg  text-center w-[100%] ">New Exams</span>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
    <div className="exam-div h-full w-full md:w-full">
          
          <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
                            {tests.map((data)=>
                            
                               
                               <div key={data.id} className={styles.adminExam} >
                                <Link to={`/jobs/${data.id}`} className="w-full"> 
                                <div className=" text-center">{data.testName}</div>
                                </Link>
                                <div className="mx-2 h-[30px] w-[70px] text-center rounded-md p-[2px] bg-red-600 text-white cursor-pointer" onClick={()=>deleteBtn(data.id)}>Delete</div>
                                </div>
                                
                            
                            )}
          </div>
        </div>

        </div>

    </div>

        </>
    )
};

export default TestsAdmin;