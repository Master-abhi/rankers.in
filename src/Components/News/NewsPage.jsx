
import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import {db} from "../../firebaseinit"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const NewsPage = ()=>{

    let [newsdata, setNewsdata] = useState([]);
    const [loading, setLoading]= useState(true);
    useEffect(()=>{
        // fetch('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=998f4eba46fb48f78540e7701a22a8e6')
        // .then(res=> res.json())
        // .then(json=> setNewsdata(json.articles))
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


    console.log(newsdata)

    return (
        <>
         {loading? <div className="h-[200px] w-full flex items-center justify-center">
            <i>Loading...</i>
          </div> :
        <div className="bg-slate-50 md:flex  h-full">
            <div className="max-h-full w-full md:w-3/12 bg-[#F6F6F2]">
                {/* adLeft */}
            </div>
            <div className="max-h-full w-full bg-[#F6F6F2]  flex-col md:flex items-center justify-center ">
                {
                    newsdata.map((news)=>(
                        <NewsCard news={news} key={news.id} />
                    ))
                }
            </div>
            <div className='max-h-full w-full md:w-3/12 bg-[#F6F6F2]'>
                {/* adRight */}
            </div>
        </div>}
        <div className="h-[50px]">

        </div>
        </>
    )
};

export default NewsPage;