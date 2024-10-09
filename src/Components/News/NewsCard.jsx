


const NewsCard = (props)=>{
    return(
        <>
        
        <div className=" w-full md:w-[85%] my-4 p-2 rounded-xl flex flex-col md:flex-row overflow-hidden bg-[#e4e3e3]">
            <div className=" w-full md:w-[45%]  p-2 overflow-hidden">
            <a href={props.news.url}>
                <img className="h-[100%] w-full object-cover rounded-md" src={props.news.imgUrl}/>
                </a>
            </div>
            <div className=" p-2 w-full h-full flex-col flex items-start ">

                <div className="flex w-full">
                    <div className="w-full flex font-medium">
                        <div className="w-[70%] flex justify-start ">
                        <p><span className="text-red-600">Source:</span> {props.news.source}</p> 
                        </div>
                        
                        <div className="w-[30%] flex justify-end">
                        <p>{props.news.postDate}</p> 
                        </div>
                    </div>

                </div>
                <div className="w-full flex text-justify font-bold my-2 ">
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