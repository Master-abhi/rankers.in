import {collection, addDoc, setDoc, onSnapshot, Timestamp} from "firebase/firestore";
import {auth, db} from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const UpdatePostAdmin = ()=>{


 
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

    const addUpdate = async (e)=>{
        
        console.log(e)
        const docRef = await addDoc(collection(db, "updates"),{
            imgUrl: e.iu.current.value,
            title: e.t.current.value,
            postDate: e.pd.current.value,
            source: e.s.current.value,
            url: e.u.current.value,
            timeStamp: new Date()
        });
        toast.success("News added!!")
       clearInput();
    }



    return (
        <>
            { isLoggedin ? 
            <div className="bg-slate-50 flex flex-col md:flex items-center justify-center w-full h-full">
            <div className="max-h-full w-full bg-[#F6F6F2] flex flex-col md:flex items-center justify-center ">

                {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
                <div className="h-full w-[60%] m-10">
                    <form>
                        <div className="text-center flex items-center justify-center">
                            <span className="text-center">Enter Image Url: </span>
                            <input type="text" ref={imgUrlRef} className="border border-black w-[80%] m-5" />
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <span className="text-center">Enter Title: </span>
                            <textarea type="text" ref={titleRef} className="border border-black w-[80%] m-5" />
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <span className="text-center">Enter Post Date: </span>
                            <input type="text" ref={postDateRef} className="border border-black w-[80%] m-5" />
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <span className="text-center">Enter Source: </span>
                            <input type="text" ref={sourceRef} className="border border-black w-[80%] m-5" />
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <span className="text-center">Enter Source url: </span>
                            <input type="text" ref={urlRef} className="border border-black w-[80%] m-5" />
                        </div>
                        <div className="text-center flex items-center justify-center">
                        <div type="submit" className="border border-black w-20 rounded-md" onClick={()=> addUpdate(
                            {iu: imgUrlRef,
                                t: titleRef,
                                pd: postDateRef,
                                s: sourceRef,
                                u: urlRef,
                            }
                        )}>submit</div>
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

export default UpdatePostAdmin;