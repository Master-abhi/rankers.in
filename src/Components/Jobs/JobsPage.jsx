import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "../../firebaseinit"
import { Link } from "react-router-dom";
import styles from "../../Styles/Home.module.css"

const JobsPage = ()=>{
    const [highlightedJobs, setHightlightedJobs] = useState([]);
    const [jobNotifications, setJobNotifications] = useState([])
    const [admitCards, setAdmitCards] = useState([])
    const [results, setResults] = useState([])


    useEffect(()=>{
        

        const unsubscribe1 = onSnapshot(collection(db, "highlightedJobs"), orderBy('timeStamp'), snapShot => {
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

    console.log(highlightedJobs);

    return (
        <>
            <div className=" flex justify-center  w-full h-full">

            <div className="h-full w-full md:w-[60%]  flex-col md:flex items-center justify-center ">
                <div className="h-10 w-full  rounded-md flex justify-center items-center ">
                 <div className="w-full h-1 border bg-red-700"></div>
                <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                <span className="text-red-700 text-lg text-center  w-full ">New Exams</span>
                <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                <div className="w-full h-1 border bg-red-700"></div>
            </div>
            <div className="exams flex flex-wrap h-70 w-full p-2 my-10 rounded-md bg-[#edfff2]">
            {highlightedJobs.map((data)=>
                 data.newMark === true ? <Link to={`/jobs/${data.id}`} key={data.id} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} >{data.JobsName}</div>
                  </Link> : ""
              )}

          </div>
                {/*----------------------------------------------- jobs Notifications ----------------------------------------------*/}

                    <div id="jobs-nitifications" className="h-full w-full">
                    <div className="h-full w-full  flex-col md:flex items-center justify-center ">
                        <div className="h-10 w-full rounded-md flex justify-center items-center ">
                        <div className="w-full h-1 border bg-red-700"></div>
                        <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                        <span className="text-red-700 text-lg text-center  w-full ">All Job Notifications</span>
                        <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                        <div className="w-full h-1 border bg-red-700"></div>
                        </div>
                        <div className="flex flex-col w-full md:flex-row justify-around items-center">
                        <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md ">
                            {highlightedJobs.map((data)=>
                                data.newMark !== true ? <Link to={`/jobs/${data.id}`} key={data.id} className="w-full"> 
                                <div key={data.id} className={styles.examDiv} >{data.JobsName}</div>
                                </Link> : ""
                            )}

                        </div>
                        </div>
                    </div>
                    </div>
                    {/*----------------------------------------------- Admit Cards ----------------------------------------------*/}

                    {/* <div id="admit-cards" className="h-full w-full">
                        <div className="bg-[#b6e0c1] h-10 w-full mt-20 texts-center text-2xl text-red-700 font-bold flex justify-center items-center">
                            Admit Cards
                        </div>
                        <div className="flex flex-col md:flex-row justify-around items-center">
                            <div >
                                <ul>
                                {
                                        admitCards.map((data)=>
                                            <li key={data.id}>{data.title}</li>
                                        )
                                    }
                                </ul>
                            </div>

                    </div>
                </div>
                
                 */}
                {/*----------------------------------------------- Results ----------------------------------------------*/}

                {/* <div id="results" className="h-full w-full my-10">
                        <div className="bg-[#b6e0c1] h-10 w-full mt-20 texts-center text-2xl text-red-700 font-bold flex justify-center items-center">
                            Results
                        </div>
                        <div className="flex flex-col md:flex-row justify-around items-center">
                            <div >
                                <ul>
                                {
                                        results.map((data)=>
                                            <li key={data.id}>{data.title}</li>
                                        )
                                    }
                                </ul>
                            </div>
                    
                    </div>
                    </div> */}
                
            </div>

        </div>  
        </>
    )
};

export default JobsPage;