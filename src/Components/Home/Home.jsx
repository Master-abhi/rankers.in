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
        <img className="h-full w-auto" src="https://firebasestorage.googleapis.com/v0/b/rankers-c47cb.appspot.com/o/JOIN%20NOW%20SARKARI.png?alt=media&token=c2cfb3e9-3c7d-4829-bcf3-e84ba2b89406"/>
 

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
                 data.newMark === true ? <Link to={`/sarkari-jobs-notification/${data.id}`} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} ><h1>{data.JobsName}</h1></div>
                  </Link> : ""
              )}


            <Link to="/sarkari-jobs-notification" className="h-10 w-full ">
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
                 data.newMark === true ? <Link to={`/sarkari-tests/${data.id}`} className="w-full"> 
                  <div key={data.id} className={styles.examDiv} ><h1>{data.testName}</h1></div>
                  </Link> : ""
              )}

            <Link to="/sarkari-tests" className="h-10 w-full ">
              <div className={`text-[#38874C] font-bold ${ styles.examDiv}`}>
                more Tests
              </div>
            </Link>
          </div>}
          <div className="h-10 w-full  mt-10 rounded-md flex justify-center items-center ">
          <div className="w-full h-1 border bg-red-700"></div>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <h1 className="text-red-700 text-lg text-center  w-full ">About Sarkari World</h1>
          <img className="h-10 w-10" src="https://cdn-icons-gif.flaticon.com/13109/13109971.gif"/>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
          <div className="h-full w-full flex-col my-5 rounded-md flex justify-center items-center">
            
              <h1 className="text-justify p-5"> <b>Welcome to Sarkariworld.in</b> – your trusted platform for everything related to <b>Sarkari jobs, Sarkari news, Sarkari results, and test exams</b>. Whether you're looking for the <b>latest Sarkari job notifications, exam updates, or results</b>, we provide all the essential information you need in one convenient place.<br/>

At <b>Sarkari World</b>, we offer real-time updates on all types of Sarkari jobs and recruitment processes across sectors like <b>banking, defense, railways, and public service commissions</b>. Our platform keeps you informed with the most recent Sarkari notifications, including job announcements, exam dates, admit cards, and Sarkari results.<br/>

In addition to job notifications, we provide extensive resources for Sarkari exam preparation, including test exams, study materials, and current affairs to help you excel. Whether you’re aiming for central government jobs or state-level opportunities, <b>Sarkari World</b> is here to support your journey.<br/>

At <b>Sarkari World</b>, we strive to simplify your search for Sarkari jobs by providing everything you need to stay ahead in your career. Stay updated on government job openings, track your applications, and prepare with our test exams and Sarkari results sections.<br/>

Join Sarkariworld.in today, and let us guide you towards a successful career in government service!</h1>
              <br/>
              <br/>

<h1 className="text-justify p-5"> <b>Sarkariworld.in</b> में आपका स्वागत है - <b>सरकारी नौकरियों, सरकारी समाचारों, सरकारी परिणामों और टेस्ट परीक्षाओं</b> से संबंधित हर चीज के लिए आपका विश्वसनीय मंच। चाहे आप <b>नवीनतम सरकारी नौकरी अधिसूचनाएँ, परीक्षा अपडेट या परिणाम</b> की तलाश कर रहे हों, हम आपको एक सुविधाजनक स्थान पर सभी आवश्यक जानकारी प्रदान करते हैं।<br/>

<b>सरकारी दुनिया</b> में, हम <b>बैंकिंग, रक्षा, रेलवे और लोक सेवा आयोगों</b> जैसे क्षेत्रों में सभी प्रकार की सरकारी नौकरियों और भर्ती प्रक्रियाओं पर वास्तविक समय के अपडेट प्रदान करते हैं। हमारा प्लेटफ़ॉर्म आपको नौकरी की घोषणाओं, परीक्षा तिथियों, एडमिट कार्ड और सरकारी परिणामों सहित सबसे हालिया सरकारी अधिसूचनाओं से अवगत कराता रहता है।<br/>

नौकरी अधिसूचनाओं के अलावा, हम सरकारी परीक्षा की तैयारी के लिए व्यापक संसाधन प्रदान करते हैं, जिसमें टेस्ट परीक्षाएँ, अध्ययन सामग्री और करंट अफेयर्स शामिल हैं, ताकि आपको उत्कृष्टता प्राप्त करने में मदद मिल सके। चाहे आप केंद्र सरकार की नौकरियों या राज्य-स्तरीय अवसरों के लिए लक्ष्य बना रहे हों, <b>Sarkari World</b> आपकी यात्रा का समर्थन करने के लिए यहाँ है।<br/>

<b>Sarkari World</b> में, हम आपके करियर में आगे रहने के लिए आवश्यक सभी चीजें प्रदान करके Sarkari नौकरियों के लिए आपकी खोज को सरल बनाने का प्रयास करते हैं। सरकारी नौकरी के अवसरों पर अपडेट रहें, अपने आवेदनों को ट्रैक करें, और हमारे टेस्ट परीक्षाओं और Sarkari परिणाम अनुभागों के साथ तैयारी करें।<br/>

आज ही Sarkariworld.in से जुड़ें, और हमें सरकारी सेवा में एक सफल करियर की ओर मार्गदर्शन करने दें!</h1>
          </div>
        </div>
        <div className="h-[50px]"></div>
      </div>
    </>
  );
};

export default Home;
