
import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const NewsPage = ()=>{

    let [newsdata, setNewsdata] = useState([]);

    useEffect(()=>{
        fetch('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=998f4eba46fb48f78540e7701a22a8e6')
        .then(res=> res.json())
        .then(json=> setNewsdata(json.articles))
    
    },[])


    console.log(newsdata)

    return (
        <div className="bg-slate-50 md:flex  h-full">
            <div className="max-h-full w-full md:w-3/12 bg-[#F6F6F2]">
                {/* adLeft */}
            </div>
            <div className="max-h-full w-full bg-[#F6F6F2]  flex-col md:flex items-center justify-center ">
                {
                    newsdata.map((news)=>(
                        <NewsCard news={news} />
                    ))
                }
            </div>
            <div className='max-h-full w-full md:w-3/12 bg-[#F6F6F2]'>
                {/* adRight */}
            </div>
        </div>

    )
};

export default NewsPage;