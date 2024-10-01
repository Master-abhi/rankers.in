


const NewsCard = (props)=>{
    return(
        <>
        
        <div className=" md:h-[150px] w-full md:w-[75%] my-4 p-2 rounded-xl flex flex-col md:flex-row overflow-hidden bg-[#D8D7D7]">
            <div className=" w-full md:w-[45%]  p-2 overflow-hidden">
            <a href={props.news.url}>
                <img className="h-[100%] w-full object-cover" src={props.news.urlToImage}/>
                </a>
            </div>
            <div className=" p-2 w-full h-full flex-col flex items-start ">

                <div className="flex w-full">
                    <div className="w-full flex font-medium">
                        <div className="w-[70%] flex justify-start ">
                        <p>{props.news.source.name}</p> 
                        </div>
                        
                        <div className="w-[30%] flex justify-end">
                        <p>{props.news.publishedAt.substring(0,10)}</p> 
                        </div>
                    </div>

                </div>
                <div className="w-full flex text-start font-bold ">
                    <a href={props.news.url} target="blank">
                {props.news.title}
                </a>
                </div>
                {/* <div className="flex w-full h-full text-start">
                    <p>
                    {props.news.content}
                    </p>
                </div> */}
            </div>
            
        </div>
        
        </>
    )
}

export default NewsCard;