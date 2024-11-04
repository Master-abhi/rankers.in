import {collection, addDoc, setDoc, onSnapshot, Timestamp} from "firebase/firestore";
import {db} from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";

const JobPostAdmin = ()=>{
    const [isNew, setIsNew] = useState();

 
    const nameRef = useRef();
    const newMarkRef = useRef();
    const postDateRef  = useRef();
    const totalVacancyRef  = useRef();
    const recruitmentByRef  = useRef();
    const vacancyDetails1Ref  = useRef();
    const vacancyDetails2Ref  = useRef();
    const ageRef  = useRef();
    const maxAgeRef  = useRef();
    const otherRef  = useRef();
    const qualificationDetailRef  = useRef();
    const feeRef  = useRef();
    const impDateRef  = useRef();
    const applyOnlineRef  = useRef();
    const notificationRef  = useRef();
    const officialWebsiteRef  = useRef();
    const tagsRef  = useRef();

    const clearInput = ()=>{
        nameRef.current.value = "";
        newMarkRef.current.value = "";
        postDateRef.current.value = "";
        totalVacancyRef.current.value = "";
        recruitmentByRef.current.value = "";
        vacancyDetails1Ref.current.value = "";
        vacancyDetails2Ref.current.value = "";
        ageRef.current.value = "";
        maxAgeRef.current.value = "";
        otherRef.current.value = "";
        qualificationDetailRef.current.value = "";
        feeRef.current.value = "";
        impDateRef.current.value = "";
        applyOnlineRef.current.value = "";
        notificationRef.current.value = "";
        officialWebsiteRef.current.value = "";
        tagsRef.current.value = "";

    }


    // ------------------------------------------------------------

    // const handleFileUpload1 = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = (e) => {
    //       const binaryStr = e.target.result;
    //       const workbook = XLSX.read(binaryStr, { type: "binary" });
    
    //       // Get the first sheet
    //       const sheetName = workbook.SheetNames[0];
    //       const worksheet = workbook.Sheets[sheetName];
    
    //       // Convert the worksheet to JSON format
    //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
    //       setData1(jsonData); // Save the data to state
         
    //     };
    
    //     reader.readAsBinaryString(file);
        
    //   };

    //     const handleFileUpload2 = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = (e) => {
    //       const binaryStr = e.target.result;
    //       const workbook = XLSX.read(binaryStr, { type: "binary" });
    
    //       // Get the first sheet
    //       const sheetName = workbook.SheetNames[0];
    //       const worksheet = workbook.Sheets[sheetName];
    
    //       // Convert the worksheet to JSON format
    //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
    //       setData2(jsonData); // Save the data to state
    //     };
    
    //     reader.readAsBinaryString(file);
        
    //   };

    //   const handleFileUploadLink = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = (e) => {
    //       const binaryStr = e.target.result;
    //       const workbook = XLSX.read(binaryStr, { type: "binary" });
    
    //       // Get the first sheet
    //       const sheetName = workbook.SheetNames[0];
    //       const worksheet = workbook.Sheets[sheetName];
    
    //       // Convert the worksheet to JSON format
    //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
    //       setLink(jsonData); // Save the data to state
    //     };
    
    //     reader.readAsBinaryString(file);
        
    //   };

    const [htmlCode1, setHtmlCode1] = useState("");
    const [tablePreview1, setTablePreview1] = useState("");
  
    const handleFileUpload1 = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
  
        let htmlOutput = "";
        let tableHtml = `
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      `;
  
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const htmlTable = XLSX.utils.sheet_to_html(sheet);
  
          // Add the sheet's HTML table to the total output
          htmlOutput += htmlTable;
          tableHtml += htmlTable;
        });
  
        // Show the generated HTML code for copying
        setHtmlCode1(htmlOutput);
  
        // Show the preview of the HTML table
        setTablePreview1(tableHtml);
      };
      reader.readAsArrayBuffer(file);
      console.log(Date.now())
    };

     const [htmlCode2, setHtmlCode2] = useState("");
    const [tablePreview2, setTablePreview2] = useState("");
  
    const handleFileUpload2 = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
  
        let htmlOutput = "";
        let tableHtml = `
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      `;
  
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const htmlTable = XLSX.utils.sheet_to_html(sheet);
  
          // Add the sheet's HTML table to the total output
          htmlOutput += htmlTable;
          tableHtml += htmlTable;
        });
  
        // Show the generated HTML code for copying
        setHtmlCode2(htmlOutput);
  
        // Show the preview of the HTML table
        setTablePreview2(tableHtml);
      };
      reader.readAsArrayBuffer(file);
    };

     const [htmlCodeLink, setHtmlCodeLink] = useState("");
    const [tablePreviewLink, setTablePreviewLink] = useState("");
  
    const handleFileUploadLink = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
  
        let htmlOutput = "";
        let tableHtml = ` <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>`;
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const htmlTable = XLSX.utils.sheet_to_html(sheet);
  
          // Add the sheet's HTML table to the total output
          htmlOutput += htmlTable;
          tableHtml +=  htmlTable;
        });
  
        // Show the generated HTML code for copying
        setHtmlCodeLink(htmlOutput);
  
        // Show the preview of the HTML table
        setTablePreviewLink(tableHtml);
      };
      reader.readAsArrayBuffer(file);
    };

    const handleRadio = (event) =>{
      let value = true;
      if (typeof event.currentTarget.value === 'string') {
          (event.currentTarget.value === 'true' ? value = true : value = false );
      }
      setIsNew(value);
      }

    const addJob = async (e)=>{
        
        console.log(e)
        const docRef = await addDoc(collection(db, "highlightedJobs"),{
            JobsName:e.n,
            newMark: isNew,
            postDate:e.p,
            totalVacancy:e.tv,
            recruitmentBy:e.r,
            vacancyDetails1:tablePreview1, 
            vacancyDetails2: tablePreview2,
            age:e.m,
            // maxAge:e.m,
            // other:e.o,
            qualificationDetail:e.q,
            fee:e.f,
            impDate:e.i,
            impLinks: tablePreviewLink,
            // applyOnline:e.a,
            // notification:e.n,
            // officialWebsite:e.o,
            tags:e.t,
            timeStamp: Date.now()
        });
    //    clearInput();
    }



    return (
        <>
            <div className="bg-slate-50 flex flex-col md:flex items-center justify-center w-full h-full">
            <div className="max-h-full w-full bg-[#F6F6F2] flex flex-col md:flex items-center justify-center ">

                {/*-------------------------------------------------- Highlighted jobs-------------------------------------------------- */}
                <div className="h-full w-full md:w-[60%] ">
                    <div className="bg-[#b6e0c1] h-10 w-full texts-center text-2xl text-red-700 font-bold flex justify-center items-center">
                       <img className="h-[30px]" src="https://cdn-icons-png.flaticon.com/128/728/728139.png" />
                        Add a Job details for post
                        <img className="h-[30px]" src="https://cdn-icons-png.flaticon.com/128/728/728139.png" />
                    </div>
                    <div className="flex  items-center w-full">
                        <form className=" flex flex-col items-center  w-full">

                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">Name of the Post : </p>
                                <input type="text" ref={nameRef} className="border border-black w-[80%]" />
                            </div>
                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">new mark (true/false) : </p>
                                <div className="radio">
                                <label><input type="radio" name="isNew" value="true" onClick={handleRadio}/>Yes</label>
                                  </div>
                                  <div className="radio">
                                      <label><input type="radio" name="isNew" value="false"  onClick={handleRadio}/>No</label>
                                  </div>
                            </div>
                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">Post Date :</p>
                                <input type="text" ref={postDateRef} className="border border-black w-[80%]" />
                            </div>
                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">Total Vacancy : </p>
                                <input type="text" ref={totalVacancyRef} className="border border-black w-[80%]" />
                            </div>

                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">Recruitment by :</p>
                                <textarea type="text" ref={recruitmentByRef} className="border border-black w-[80%] h-[100px]" />
                            </div>

                        </form> 


                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        Age Limit
                       
                    </div >
                        <form className=" flex flex-col w-[90%]">

                        <div className="flex justify-center items-center m-4 w-[90%]">
                                <textarea type="text" ref={ageRef} className="border border-black w-[80%] h-[200px]" />
                            </div>

                        </form>


                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        Qualification
                       
                    </div>
                        <form className=" flex flex-col  w-[90%]">

                            <div className="flex justify-center  items-center m-4 w-[90%]">
                                <textarea type="text" ref={qualificationDetailRef} className="border border-black w-[80%] h-[200px]" />
                            </div>

                        </form>


                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        Application Fee
                       
                    </div>
                        <form className=" flex flex-col  w-[90%]">

                            <div className="flex  items-center m-4 w-[90%]">
                                <p className="mx-4">Add details : </p>
                                <textarea type="text" ref={feeRef} className="border border-black w-[80%] h-[200px]" />
                            </div>

                        </form>


                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        Important Dates
                       
                    </div>
                        <form className=" flex flex-col  w-[90%]">

                            <div className="flex  items-center m-4 w-[90%]">
                                <p className="mx-4">Add details : </p>
                                <textarea type="text" ref={impDateRef} className="border border-black w-[80%] h-[200px]" />
                            </div>

                        </form>


                    </div>
                    <div className="m-10">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        vacancy details
                       
                    </div>
                    <div>
                    <h1>Excel to Hardcoded HTML Converter</h1>
                    <input type="file" onChange={handleFileUpload1} accept=".xlsx, .xls" />
                    <h2>Generated HTML Code:</h2>
                    <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0", padding: "10px" }}>
                        {htmlCode1}
                    </pre>
                    <h2>Preview:</h2>
                    <div dangerouslySetInnerHTML={{ __html: tablePreview1 }} />
                    </div>

                    <div>
                    <h1>Excel to Hardcoded HTML Converter</h1>
                    <input type="file" onChange={handleFileUpload2} accept=".xlsx, .xls" />
                    <h2>Generated HTML Code:</h2>
                    <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0", padding: "10px" }}>
                        {htmlCode2}
                    </pre>
                    <h2>Preview:</h2>
                    <div dangerouslySetInnerHTML={{ __html: tablePreview2 }} />
                    </div>
                    {/* <div className="m-5 flex">
                        <h1 className="mx-5">Upload Excel File</h1>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload1} />
                        <br />
                    </div>


                        {/* Render the data in a table */}
                        {/* <table className= "border:1">
                            <thead>
                            <tr>
                                {data1.length > 0 &&
                                Object.keys(data1[0]).map((key) => <th key={key}>{key}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {data1.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="m-5 flex">
                        <h1 className="mx-5">Upload Excel File</h1>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload2} />
                        <br />
                    </div> */}


                        {/* Render the data in a table */}
                        {/* <table className= "border:1">
                            <thead>
                            <tr>
                                {data2.length > 0 &&
                                Object.keys(data2[0]).map((key) => <th key={key}>{key}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {data2.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table> */}
                            

                        </div>

                    <div className="flex flex-col items-center w-full">
                    <div className="h-10 w-full texts-center text-xl text-red-700 font-bold flex justify-center items-center">
                       
                        Important Links
                       
                    </div>

                                    <div>
                    <h1>Excel to Hardcoded HTML Converter</h1>
                    <input type="file" onChange={handleFileUploadLink} accept=".xlsx, .xls" />
                    <h2>Generated HTML Code:</h2>
                    <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0", padding: "10px" }}>
                        {htmlCodeLink}
                    </pre>
                    <h2>Preview:</h2>
                    <div dangerouslySetInnerHTML={{ __html: tablePreviewLink }} />
                    </div>
                    {/* <form className=" flex flex-col  w-full">

                        <div className="flex  items-center m-4 w-full">
                                <p className="mx-4">Apply Online : </p>
                                <input type="text" ref={applyOnlineRef} className="border border-black w-1/3" />
                            </div>

                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4">Notification :</p>
                                <input type="text" ref={notificationRef} className="border border-black w-1/3" />
                            </div>

                            <div className="flex items-center m-4 w-full">
                                <p className="mx-4"> Official Website:</p>
                                <input type="text" ref={officialWebsiteRef} className="border border-black w-1/3" />
                            </div>

                        </form> */}
{/* 
                    <div className="m-5 flex">
                        <h1 className="mx-5">Upload Excel File</h1>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUploadLink} />
                        <br />
                    </div> */}


                        {/* Render the data in a table */}
                        {/* <table className= "border:1">
                            <thead>
                            <tr>
                                {link.length > 0 &&
                                Object.keys(link[0]).map((key) => <th key={key}>{key}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {link.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table> */}


                    </div>

                    <div className="flex  items-center m-4 w-full">
                                <p className="mx-4">Tags : </p>
                                <input type="text" ref={tagsRef} className="border border-black w-1/3" />
                            </div>


                    
                </div>
               
                                


                <div className="flex  items-center m-4 w-full">      
                    <input type="submit" onClick={()=>addJob({n:nameRef.current.value,
                     tv: totalVacancyRef.current.value,
                     p:postDateRef.current.value, 
                     r:recruitmentByRef.current.value, 
                     i:impDateRef.current.value,
                     m:ageRef.current.value, 
                     q:qualificationDetailRef.current.value, f:feeRef.current.value,
                     t:tagsRef.current.value, 
                })} className="border border-black w-1/5" />
                </div>
              </div>

        </div>  
        <div className="h-[50px]">

        </div>
        </>
    )
};

export default JobPostAdmin;