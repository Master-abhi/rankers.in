import {collection, addDoc, updateDoc, onSnapshot, doc, Timestamp} from "firebase/firestore";
import {auth, db} from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const UpdateEditAdmin = ()=>{
    const {updateId} = useParams(); 
    let [newsdata, setNewsdata] = useState([]);
    let [loading, setLoading] = useState(true)
 
    const imgUrlRef = useRef();
    const titleRef = useRef();
    const postDateRef  = useRef();
    const sourceRef  = useRef();
    const urlRef  = useRef();


    const clearInput = ()=>{
        imgUrlRef.current.value = "";
        titleRef.current.value = "";
        postDateRef.current.value = "";
        sourceRef.current.value = "";
        urlRef.current.value = "";


    }
    useEffect(()=>{
        if (updateId) {
          const updateDocRef = doc(db, "updates", updateId);
      
          const unsubscribe1 = onSnapshot(updateDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const newsData = { id: docSnapshot.id, ...docSnapshot.data() };
              setNewsdata(newsData);  // Update test state
               // Set loading to false after data is fetched
               setLoading(false)
            } else {
              console.log("No such document!");
              setLoading(false);  // Set loading to false even if no document is found
            }
          });
    
    
  
  
      return () => {
          
          unsubscribe1();
  
      };}
  },[])

    // ------------------------------------------------------------
    const [isLoggedin, setLoggedin] = useState(false);

    const fetchuser = async ()=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                setLoggedin(true)

            }
            else{
                console.log("user not logged in.")
            }
        })
    }

  useEffect(()=>{
    fetchuser();
},[])

const updateData = async () => {
    const docRef = doc(db, 'updates', newsdata.id); // Get the document reference with an ID
    const updatedFields = {
        imgUrl: imgUrlRef.current.value,
        title: titleRef.current.value,
        postDate: postDateRef.current.value,
        source: sourceRef.current.value,
        url: urlRef.current.value,
    };

    try {
        // Update Firestore document
        await updateDoc(docRef, updatedFields);
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};



    return (
        <>
            { isLoggedin ? 
            <div className="bg-slate-50 flex flex-col md:flex items-center justify-center w-full h-full">
            <div className="max-h-full w-full bg-[#F6F6F2] flex flex-col md:flex items-center justify-center ">

                {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
                <div className="h-full w-[60%] m-10">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="text-center flex items-center justify-center">
                    <span className="text-center">Enter Image Url: </span>
                    <input
                        type="text"
                        ref={imgUrlRef}
                        defaultValue={newsdata.imgUrl}
                        className="border border-black w-[80%] m-5"
                    />
                </div>
                <div className="text-center flex items-center justify-center">
                    <span className="text-center">Enter Title: </span>
                    <textarea
                        ref={titleRef}
                        defaultValue={newsdata.title}
                        className="border border-black w-[80%] m-5"
                    />
                </div>
                <div className="text-center flex items-center justify-center">
                    <span className="text-center">Enter Post Date: </span>
                    <input
                        type="text"
                        ref={postDateRef}
                        defaultValue={newsdata.postDate}
                        className="border border-black w-[80%] m-5"
                    />
                </div>
                <div className="text-center flex items-center justify-center">
                    <span className="text-center">Enter Source: </span>
                    <input
                        type="text"
                        ref={sourceRef}
                        defaultValue={newsdata.source}
                        className="border border-black w-[80%] m-5"
                    />
                </div>
                <div className="text-center flex items-center justify-center">
                    <span className="text-center">Enter Source URL: </span>
                    <input
                        type="text"
                        ref={urlRef}
                        defaultValue={newsdata.url}
                        className="border border-black w-[80%] m-5"
                    />
                </div>
                <div className="text-center flex items-center justify-center">
                    <button
                        type="submit"
                        className="border border-black w-20 rounded-md"
                        onClick={updateData}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
            </div>
            </div>
            : "log in first"}
        <div className="h-[50px]">

        </div>
        </>
    )
};

export default UpdateEditAdmin;