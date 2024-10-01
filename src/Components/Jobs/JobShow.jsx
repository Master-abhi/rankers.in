import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from "firebase/firestore"; // Import doc for specific document
import { db } from "../../firebaseinit";

const JobShow = () => {
  const { jobId } = useParams(); // Destructure jobId from route parameters
  const [job, setJob] = useState(null); // Use state to store the fetched job data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (jobId) {
      const jobDocRef = doc(db, "highlightedJobs", jobId);

      const unsubscribe = onSnapshot(jobDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setJob({ id: docSnapshot.id, ...docSnapshot.data() });
          console.log(job)
        } else {
          console.log("No such document!");
        }
        setLoading(false); // Set loading to false when data is fetched
      });
      console.log(job)

      return () => {
        unsubscribe();
      };
    }

    console.log(job.vacancyDetails)
  }, [jobId]);  // Empty dependency array ensures it runs once on mount

  

  return (
    <>
      <div className="bg-slate-50 md:flex h-full w-full">
        <div className="max-h-full w-full md:w-3/12 bg-[#F6F6F2] hidden">
          {/* adLeft */}
        </div>
        {loading ? (
              <div className="flex justify-center items-center h-100 w-full">
                <p>Loading job details...</p>
              </div>
            ) : job ? (

              


        <div className="max-h-full w-full bg-[#F6F6F2] flex-col md:flex items-center justify-center">
          {/* Highlighted jobs */}
          <div className="h-full w-full">

            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center items-center flex-col w-full">
              <div className='h-40 w-40 p-2 my-2 flex justify-center items-center bg-blend'>
                <img className='h-[100px] w-[120px] bg-blend-darken' src="https://ssc.nic.in/Content/library/assets/images/ssc-logo.png"/>
              </div>
                <div className="flex items-center justify-center my-1 w-[90%]">
                  <h1 className='text-red-700 text-center font-semibold text-lg w-[90%]'>{job.JobsName}</h1>
                </div>
                <div className="flex items-center justify-center my-1 w-full">
                  <p>Post Date : {job.postDate}</p>
                </div>
                <div className="flex items-center justify-center my-1 w-full">
                  <p>Total Vacancy : {job.totalVacancy} </p>
                </div>

              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="h-10 w-full text-center text-xl text-red-700 font-bold flex justify-center items-center">
                Vacancy Details
              </div>
              <div className="flex items-center justify-center my-2 w-[90%] md:w-[70%]">
                  <p className='w-full text-justify'><span className="text-red-700 font-semibold items-stretch">संक्षिप्त जानकारी: </span> {job.recruitmentBy} </p>
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold items-stretch">महत्वपूर्ण तिथियाँ: </span><div dangerouslySetInnerHTML={{ __html: job.impDate }} />
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">आयु सीमा:</span><div dangerouslySetInnerHTML={{ __html: job.age }} />
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">योग्यता:</span><div dangerouslySetInnerHTML={{ __html: job.qualificationDetail
 }} />
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">आवेदन शुल्क:</span><div dangerouslySetInnerHTML={{ __html: job.fee
 }} />
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%] table-auto">
                <span className="text-red-700 font-semibold text-justify items-stretch">विवरण:</span>
                <div >
                <div className='w-full'  dangerouslySetInnerHTML={{ __html: job.vacancyDetails1
 }} />
                </div>
                <div>
                <div className='w-full' dangerouslySetInnerHTML={{ __html: job.vacancyDetails2
 }} />
                </div>
                </div>
                <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">महत्वपूर्ण लिंक:</span>
                <div>
                <div dangerouslySetInnerHTML={{ __html: job.impLinks}} />
                </div>
                </div>
                
            </div>
           
            {/* Additional form sections go here (Age Limit, Qualification, etc.) */}
            
          </div>
          <div className='h-[50px]'></div>
            </div>
         ): (
            <p>Job not found</p>
          )}
        
        
        <div className="max-h-full w-full md:w-3/12 bg-[#F6F6F2] hidden">
          {/* adRight */}
        </div>
        </div>
    </>
  );
};

export default JobShow;
