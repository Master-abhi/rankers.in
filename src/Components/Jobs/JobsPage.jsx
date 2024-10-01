import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "../../firebaseinit"
import { Link } from "react-router-dom";
import styles from "../../Styles/Home.module.css"

const JobsPage = ()=>{
    const [x, setX] = useState();
    const [highlightedJobs, setHightlightedJobs] = useState([]);
    const [jobNotifications, setJobNotifications] = useState([])
    const [admitCards, setAdmitCards] = useState([])
    const [results, setResults] = useState([])


    useEffect(()=>{
        

        const unsubscribe1 = onSnapshot(collection(db, "highlightedJobs"), snapShot => {
            const jobs = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHightlightedJobs(jobs);
        });

        const unsubscribe2 = onSnapshot(collection(db, "jobNotifications"), snapShot => {
            const jobs = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobNotifications(jobs);
        });

        const unsubscribe3 = onSnapshot(collection(db, "admitCards"), snapShot => {
            const admitCard = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAdmitCards(admitCard);
        });

        const unsubscribe4 = onSnapshot(collection(db, "results"), snapShot => {
            const results = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResults(results);
        });

        return () => {
            
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
            unsubscribe4();
        };
    },[])

    console.log(x);
    console.log(highlightedJobs);
    console.log(jobNotifications);
    console.log(admitCards);
    console.log(results)

    return (
        <>
            <div className=" md:flex  h-full">
            <div className="max-h-full w-full md:w-3/12">
                {/* adLeft */}
            </div>
            <div className="h-full w-full  flex-col md:flex items-center justify-center ">
                <div className="h-10 w-[90%] md:w-3/5 m-5 rounded-md flex justify-center items-center ">
                 <div className="w-full h-1 border bg-red-700"></div>
                <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                <span className="text-red-700 text-lg text-center w-[100%]">New Exams</span>
                <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                <div className="w-full h-1 border bg-red-700"></div>
            </div>
            <div className="exams flex flex-wrap h-70 w-full p-2 my-5 rounded-md bg-[#edfff2]">
          {highlightedJobs.map((data)=>
                            
                               <Link to={`/jobs/${data.id}`} className="w-full"> 
                               <div key={data.id} className={styles.examDiv} >{data.JobsName}</div>
                                </Link>
                            
                            )}

          </div>

                {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
                {/* <div className="h-full w-full">
                    <div className="bg-[#b6e0c1] h-10 w-full texts-center text-2xl text-red-700 font-bold flex justify-center items-center">
                       <img className="h-[30px]" src="https://cdn-icons-png.flaticon.com/128/728/728139.png" />
                        High-lighted Jobs
                        <img className="h-[30px]" src="https://cdn-icons-png.flaticon.com/128/728/728139.png" />
                    </div>
                    <div>
                        {
                            highlightedJobs.map((data)=>
                            <div key={data.id} className="bg-green-100 h-12 m-0.5 font-bold flex justify-center items-center text-slate-600 p-2" >
                               <Link to={`/jobs/${data.id}`} > {data.JobsName}</Link>
                            </div>
                            )
                        }

                    </div>
                </div> */}
                {/*----------------------------------------------- jobs Notifications ----------------------------------------------*/}

                    <div id="jobs-nitifications" className="h-full w-full">
                    <div className="h-full w-full  flex-col md:flex items-center justify-center ">
                        <div className="h-10 w-[90%] md:w-3/5 m-5 rounded-md flex justify-center items-center ">
                        <div className="w-full h-1 border bg-red-700"></div>
                        <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                        <span className="text-red-700 text-lg text-center w-[100%]">All Job Notifications</span>
                        <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
                        <div className="w-full h-1 border bg-red-700"></div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around items-center">
                            <div >
                                <ul>
                                    {
                                        jobNotifications.map((job)=>
                                            <li key={job.id}>{job.title}</li>
                                        )
                                    }
                                    
                                </ul>
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
            <div className='max-h-full w-full md:w-3/12 bg-[#F6F6F2]'>
                {/* adRight */}
            </div>
        </div>  
        </>
    )
};

export default JobsPage;