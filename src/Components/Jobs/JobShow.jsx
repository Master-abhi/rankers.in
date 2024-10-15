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
        } else {
          console.log("No such document!");
        }
        setLoading(false); // Set loading to false when data is fetched
      });
      return () => {
        unsubscribe();
      };
    }
  }, [jobId]);  // Empty dependency array ensures it runs once on mount


  function copyLink() {
    const url = `https://rankers-beta.vercel.app/jobs/${jobId}`;

    // Check if navigator.clipboard is available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Error copying text: ', err);
            fallbackCopyTextToClipboard(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    // Create a temporary text area to hold the text to copy
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    
    // Select the text and copy it
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Link copied to clipboard!' : 'Unable to copy';
        alert(msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    // Remove the temporary text area
    document.body.removeChild(textArea);
}
  return (
    <>
      <div className="bg-slate-50 md:flex h-full w-full">
        <div className="max-h-full w-full md:w-3/12 bg-[#F6F6F2] hidden">
          {/* adLeft */}
        </div>
        {loading ? (
              <div className="h-[200px] w-full flex items-center justify-center">
              <i>Loading...</i>
              </div> 
            ) : job ? (

              


        <div className="max-h-full w-full bg-[#F6F6F2] flex-col md:flex items-center justify-center">
          {/* Highlighted jobs */}
          <div className="h-full w-full">

            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center items-center flex-col w-full">
              {job.logo?<div className='h-[100px] w-[100px] p-2 flex justify-center items-center bg-blend'>
                <img className='h-[auto] w-[100px] bg-blend-color-dodge' src={job.logo}/>
              </div>:""}
                <div className="flex items-center justify-center my-1 w-[90%]">
                  <h1 className='text-red-700 text-center font-bold text-xl mx-10'>{job.JobsName}</h1>
                  {/* <button
                    className="bg-white text-white rounded-full h-10 w-10 "
                    onClick={() => handleShare(job)}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/128/10550/10550076.png" className='h-full w-full'/>
                  </button> */}
                </div>
                {job.postDate?<div className="flex items-center justify-center my-1 w-full">
                  <p>Post Date : {job.postDate}</p>
                </div>:""}
                {job.totalVacancy?<div className="flex items-center justify-center my-1 w-full">
                  <p>Total Vacancy : {job.totalVacancy} </p>
                </div>: ""}

              </div>
            </div>
                      {/* Share Button */}
                      <div className='flex justify-center items-center w-full my-4'>
                      <a href={`https://api.whatsapp.com/send?text=Check out this Job post: rankers-beta.vercel.app/jobs/${jobId}`} target="_blank">
                          <img src="https://cdn-icons-png.flaticon.com/128/15707/15707820.png" alt="WhatsApp" className='h-[40px] w-[40px] mx-2'/>
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=https://rankers-beta.vercel.app/jobs/${jobId}`} target="_blank">
                          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" className='h-[40px] w-[40px] mx-2'/>
                      </a>
                      <div onClick={()=>copyLink()}><img src="https://cdn-icons-png.flaticon.com/128/7073/7073707.png" alt="copy link" className='h-[40px] w-[40px] mx-2'/></div>
                      </div>

            <div className="flex flex-col justify-center items-center w-full">
              <div className="h-10 w-full text-center text-xl text-red-700 font-bold flex justify-center items-center">
                Vacancy Details
              </div>
              {job.recruitmentBy?<div className="flex items-center justify-center my-2 w-[90%] md:w-[70%]">
                  <p className='w-full text-justify'><span className="text-red-700 font-semibold items-stretch">संक्षिप्त जानकारी: </span> {job.recruitmentBy} </p>
                </div>:""}
                {job.impDate? <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold items-stretch">महत्वपूर्ण तिथियाँ: </span><div dangerouslySetInnerHTML={{ __html: job.impDate }} />
                </div>:""}
                {job.age?<div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">आयु सीमा:</span><div dangerouslySetInnerHTML={{ __html: job.age }} />
                </div>:""}
                {job.qualificationDetail?<div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">योग्यता:</span><div dangerouslySetInnerHTML={{ __html: job.qualificationDetail}} />
                </div>:""}
                {job.fee?<div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">आवेदन शुल्क:</span><div dangerouslySetInnerHTML={{ __html: job.fee}} />
                </div>:""}
                {job.vacancyDetails1? <div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%] table-auto">
                <span className="text-red-700 font-semibold text-justify items-stretch">विवरण:</span>
                <div >
                <div className='w-full overflow-scroll'  dangerouslySetInnerHTML={{ __html: job.vacancyDetails1 }} />
                </div>
                <div>
                <div className='w-full overflow-scroll' dangerouslySetInnerHTML={{ __html: job.vacancyDetails2}} />
                </div>
                </div>:""}
                {job.impLinks?<div className="flex flex-col justify-center text-justify my-2 w-[90%] md:w-[70%]">
                <span className="text-red-700 font-semibold text-justify items-stretch">महत्वपूर्ण लिंक:</span>
                <div>
                <div dangerouslySetInnerHTML={{ __html: job.impLinks}} />
                </div>
                </div>:""}
                
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
