import styles from "../../Styles/Testpage.module.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TestPage = ()=>{
    const [selectedExam, setSelectedExam] = useState("UPSC");
    const [selectedTest, setSelectedTest] = useState("UPSC");
    const [highlightedJobs, setHightlightedJobs] = useState([]);
  
    const handleExamClick = (exam) => {
      setSelectedExam(exam);
    };
  
    const handleTestClick = (test) => {
      setSelectedTest(test);
    };
  


    return (
        <>
        <div className="flex items-center flex-col w-full p-2 my-5">

            <div className="exam-agency w-full md:w-[70%] h-full my-5 flex items-center justify-between md:justify-around">
            <div
              className={`h-8 w-2/6 md:w-1/5 p-4 mx-1 flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
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
            <div className={`h-8 w-2/6 md:w-1/5 p-4 mx-1 flex items-center border-2  hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "SSC" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "SSC" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("SSC")}>
              SSC
            </div>
            <div className={`h-8 w-2/6 md:w-1/5 p-4 mx-1 flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
                 ${
                selectedExam === "CGVYAPAM" ? "text-white border-[#38874C]" : "text-black"
              }
                ${
                selectedExam === "CGVYAPAM" ? "bg-[#38874C]" : "bg-[#edfff2]"
              }`}
              onClick={() => handleExamClick("CGVYAPAM")}>
              CGVYAPAM
            </div>
            <div className={`h-8 w-2/6 md:w-1/5 p-4 mx-1 flex items-center border-2 hover:border-[#38874C] justify-center rounded-md shadow-xl shadow-[#a6d6b2]  
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
               <Link to="/tests/new-test" ><div className={styles.examDiv}> Hostel warden</div></Link>
           </div>

                       
        </div>
        </>
    )
};

export default TestPage;