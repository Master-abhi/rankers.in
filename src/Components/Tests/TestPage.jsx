import styles from "../../Styles/Testpage.module.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import {db} from "../../firebaseinit"


const TestPage = ()=>{
    const [selectedExam, setSelectedExam] = useState("UPSC");
    const [selectedTest, setSelectedTest] = useState("UPSC");
    const [tests, setTests] = useState([]);
  
    const handleExamClick = (exam) => {
      setSelectedExam(exam);
    };
  
    const handleTestClick = (test) => {
      setSelectedTest(test);
    };

    useEffect(()=>{
          
  
      const unsubscribe1 = onSnapshot(collection(db, "tests"), snapShot => {
          const tests = snapShot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          setTests(tests);
      });
  
  
      return () => {
          
          unsubscribe1();
  
      };
  },[])


    return (
        <>
        <div className="flex items-center flex-col w-full">
        <div className="flex items-center flex-col w-full md:w-[60%] p-2 my-5">
        <div className="h-10 w-full m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg text-center  w-full md:w-[30%]">New Tests</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
        <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
            {tests.map((data)=>
                 data.newMark === true ? <Link to={`/tests/${data.id}`} key={data.id} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} >{data.testName}</div>
                  </Link> : ""
              )}

          </div>

          <div className="h-10 w-full m-5 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <span className="text-red-700 text-lg text-center  w-full md:w-[30%]">All Tests</span>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>

            <div className="exam-agency w-full h-full flex items-center justify-between flex-wrap md:justify-around">
            <div
              className={`h-8 w-[100px] md:w-1/6 p-4 mx-1 my-5 flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "UPSC" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "UPSC" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("UPSC")}
            >
              UPSC
            </div>
            <div className={`h-8 w-[100px] md:w-1/6 p-4 mx-1 my-5  flex items-center border-2  hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "SSC" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "SSC" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("SSC")}>
              SSC
            </div>
            <div className={`h-8 w-[100px] md:w-1/6 p-4 mx-1 my-5  flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "CGVYAPAM" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "CGVYAPAM" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("CGVYAPAM")}>
              CGVYAPAM
            </div>
            <div className={`h-8 w-[100px] md:w-1/6 p-4 mx-1 my-5  flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "RAILWAY" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "RAILWAY" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("RAILWAY")}>
              RAILWAY
            </div>
            <div className={`h-8 w-[100px] md:w-1/6 p-4 mx-1 my-5  flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "BANKING" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "BANKING" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("BANKING")}>
              BANKING
            </div>
          </div>
           <div className={styles.examContainer}>
            
           {tests.map((data)=>
                 data.belongsTo === selectedExam && data.newMark !== true ? <Link to={`/tests/${data.id}`} key={data.id} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} >{data.testName}</div>
                  </Link> : ""
              )}
           </div>

                       
        </div>

        </div>
        
        </>
    )
};

export default TestPage;