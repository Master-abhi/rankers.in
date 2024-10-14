import {collection, doc, setDoc, query, orderBy, deleteDoc, onSnapshot} from "firebase/firestore";
import {auth, db} from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../Styles/Home.module.css"
import NewsCard from "../News/NewsCard";

const UpdatesAdmin = ()=>{
    let [newsdata, setNewsdata] = useState([]);
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

    useEffect(()=>{
          
  
        const unsubscribe1 = onSnapshot(
            query(collection(db, "updates"), orderBy("timeStamp", "desc")),
            (snapshot) => {
              const article = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNewsdata(article);
              setLoading(false)
            }
          );
    
    
  
  
      return () => {
          
          unsubscribe1();
  
      };
  },[])

  const editBtn = () =>{

  }

    const deleteBtn = async (id)=>{
        await deleteDoc(doc(db, "updates", id));
    }

    return (
        <>
{ isLoggedin ? 
        <div className="h-full main w-full flex items-center justify-center">
        <div className="h-full main w-full md:w-[60%] flex flex-col items-center justify-center my-10">
        <div className={`mx-10 ${styles.adminExam}`} >
                    <Link to={`updates-post-admin`} className="w-[90%]"> 
                    <div className=" text-center">Add New Update Post</div>
                    </Link>
                    </div>
        <div className="h-10 w-full  m-5 rounded-md flex justify-center items-center ">
        
          <div className="w-full h-1 border bg-red-700"></div>
          <span className="text-red-700 text-lg  text-center w-[100%] ">Updates</span>
          <div className="w-full h-1 border bg-red-700"></div>
        </div>
    <div className="exam-div h-full w-full md:w-full">
          
    <div className="bg-slate-50 md:flex w-full h-full">

            <div className="h-full w-full bg-[#F6F6F2]  flex-col md:flex items-center justify-center ">
                
                    
                    {
                    newsdata.map((news)=>(
                        <div className=" h-full w-full my-4 p-2 rounded-xl flex flex-col md:flex-row overflow-hidden bg-[#D8D7D7]">
                            <div className=" w-full md:w-[45%]  p-2 overflow-hidden">
                            <a href={news.url}>
                                <img className="h-[100%] w-full object-cover rounded-md" src={news.imgUrl}/>
                                </a>
                            </div>
                            <div className=" p-2 w-full h-full flex-col flex items-start ">

                                <div className="flex w-full">
                                    <div className="w-full flex font-medium">
                                        <div className="w-[70%] flex justify-start ">
                                        <p><span className="text-red-600">Source:</span> {news.source}</p> 
                                        </div>
                                        
                                        <div className="w-[30%] flex justify-end">
                                        <p>{news.date}</p> 
                                        </div>
                                    </div>

                                </div>
                                <div className="w-full flex text-start font-bold my-2">
                                    <a href={news.url} target="blank">
                                {news.title}
                                </a>
                                </div>
                                {/* <div className="flex w-full h-full text-start">
                                    <p>
                                    {news.content}
                                    </p>
                                </div> */}
                                <div className="flex self-end">
                                <Link to={`updates-edit-admin/${news.id}`}>
                                    <div className="bg-blue-300 h-10 w-20 m-1 flex items-center cursor-pointer justify-center text-white text-center rounded-md self-end">
                                    Edit</div>
                                    </Link>
                               
                                <div className="bg-red-600 h-10 w-20 m-1 flex items-center cursor-pointer justify-center text-white text-center rounded-md self-end" onClick={()=>deleteBtn(news.id)}>
                                    Delete</div>
                                    </div>
                            </div>
                            
                        </div>
                        
                    ))
                    }
                    
                    
               
                
            </div>

        </div>
        </div>

        </div>

    </div>
    : "log in first"}
        </>
    )
};

export default UpdatesAdmin;