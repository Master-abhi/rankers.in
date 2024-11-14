import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseinit";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../../Styles/Testpage.module.css";

const TestPostAdmin = () => {
  const [isNew, setIsNew] = useState();
  const testNameRef = useRef();
  const belongsToRef = useRef();
  const questionsRef = useRef();
  const postDateRef = useRef();
  const timerRef = useRef();
  const [isLoggedin, setLoggedin] = useState(false);
  const [language, setLanguage] = useState('hi');
  const [test, setTest] = useState(null);
  const [count, setCount] = useState(0)

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'hi' ? 'en' : 'hi'));
  };

  

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

  // Function to handle isNew radio input
  const handleRadio = (event) => {
    const value = event.currentTarget.value === 'true';
    setIsNew(value);
  };

  // Function to convert the text input into an array of questions
  const convertTextToQuestions = (input) => {
    // Split input into lines, remove any empty lines
    const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const questionsArray = [];
    let currentQuestion = {};
  
    for (let i = 0; i < lines.length; i++) {
      // Check for question number
      if (lines[i].startsWith("No.")) {
        if (currentQuestion.numb) {
          questionsArray.push(currentQuestion);  // Push previous question to array
          currentQuestion = {};  // Reset current question
        }
        // Extract the question number
        currentQuestion.numb = parseInt(lines[i].replace("No. ", "").trim(), 10);
  
      } else if (lines[i].startsWith("Question (EN):")) {
        currentQuestion.question = currentQuestion.question || {}; // Initialize if not already initialized
        currentQuestion.question.en = lines[i].split(":")[1].trim();
  
      } else if (lines[i].startsWith("Question (HI):")) {
        currentQuestion.question = currentQuestion.question || {}; // Initialize if not already initialized
        currentQuestion.question.hi = lines[i].split(":")[1].trim();
  
      } else if (lines[i].startsWith("Qlist (EN):")) {
        currentQuestion.qList = currentQuestion.qList || {}; // Initialize if not already initialized
        currentQuestion.qList.en = lines[i].split(":")[1].trim().split(", ");
  
      } else if (lines[i].startsWith("Qlist (HI):")) {
        currentQuestion.qList = currentQuestion.qList || {}; // Initialize if not already initialized
        currentQuestion.qList.hi = lines[i].split(":")[1].trim().split(", ");
  
      } else if (lines[i].startsWith("Answer (EN):")) {
        currentQuestion.answer = currentQuestion.answer || {}; // Initialize if not already initialized
        currentQuestion.answer.en = lines[i].split(":")[1].trim();
  
      } else if (lines[i].startsWith("Answer (HI):")) {
        currentQuestion.answer = currentQuestion.answer || {}; // Initialize if not already initialized
        currentQuestion.answer.hi = lines[i].split(":")[1].trim();
  
      } else if (lines[i].startsWith("Options (EN):")) {
        currentQuestion.options = currentQuestion.options || {}; // Initialize if not already initialized
        currentQuestion.options.en = lines[i].split(":")[1].trim().split(", ");
  
      } else if (lines[i].startsWith("Options (HI):")) {
        currentQuestion.options = currentQuestion.options || {}; // Initialize if not already initialized
        currentQuestion.options.hi = lines[i].split(":")[1].trim().split(", ");

      } else if (lines[i].startsWith("Solution (HI):")) {
        currentQuestion.solution = currentQuestion.solution || {}; // Initialize if not already initialized
        currentQuestion.solution.hi = lines[i].split(":")[1].trim();

      } else if (lines[i].startsWith("Solution (EN):")) {
        currentQuestion.solution = currentQuestion.solution || {}; // Initialize if not already initialized
        currentQuestion.solution.hi = lines[i].split(":")[1].trim();
      }
    }
  
    // Push the last question into the array if it exists
    if (currentQuestion.numb) {
      questionsArray.push(currentQuestion);
    }
  
    return questionsArray;
  };
  
  const nextQuestion = () => {
  
    // Move to the next question
    if (count < test.questions.length - 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };
  
  const previousQuestion = () => {
    // Navigate back to the previous question if possible
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  
  
  

  // Function to add or update the Firestore document
  const addTest = async () => {
    const questionsInput = questionsRef.current.value;

    // Parse the questions input
    const questionsArray = convertTextToQuestions(questionsInput);

    try {
      await addDoc(collection(db, "tests"), {
        testName: testNameRef.current.value,
        newMark: isNew,
        timer: timerRef.current.value,
        belongsTo: belongsToRef.current.value,
        questions: questionsArray,  // Save questions as an array
        postDate: postDateRef.current.value,
        timeStamp: new Date().toISOString()
      });

      toast.success("Test added!!")

      // Clear input fields after submission
      testNameRef.current.value = "";
      timerRef.current.value = "";
      belongsToRef.current.value = "";
      questionsRef.current.value = "";
      postDateRef.current.value = "";
      setIsNew(undefined);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addPreview =  () => {
    const questionsInput = questionsRef.current.value;

    // Parse the questions input
    const questionsArray = convertTextToQuestions(questionsInput);

    try {
      setTest({
        testName: testNameRef.current.value,
        newMark: isNew,
        timer: timerRef.current.value,
        belongsTo: belongsToRef.current.value,
        questions: questionsArray,  // Save questions as an array
        postDate: postDateRef.current.value,
        timeStamp: new Date().toISOString()
    });

    console.log(test)

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  return (
    <>
    { isLoggedin ? 
      <div className="bg-slate-50 flex flex-col md:flex items-center justify-center w-full h-full">
        <div className="max-h-full w-full bg-[#F6F6F2] flex flex-col md:flex items-center justify-center ">
          <div className="h-full w-[60%] m-10">
            <form>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter Test's Name: </span>
                <input type="text" ref={testNameRef} className="border border-black w-[80%] m-5" />
              </div>
              <div className="flex items-center m-4 w-full">
                <p className="mx-4">New Mark (true/false): </p>
                <div className="radio">
                  <label><input type="radio" name="isNew" value="true" onClick={handleRadio} />Yes</label>
                </div>
                <div className="radio">
                  <label><input type="radio" name="isNew" value="false" onClick={handleRadio} />No</label>
                </div>
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter Questions: </span>
                <textarea ref={questionsRef} className="border border-black w-[80%] m-5 h-[500px] p-2" />
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter test time: </span>
                <input type="text" ref={timerRef} className="border border-black w-[80%] m-5" />
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter Examiner: </span>
                <input type="text" ref={belongsToRef} className="border border-black w-[80%] m-5" />
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter Post Date: </span>
                <input type="text" ref={postDateRef} className="border border-black w-[80%] m-5" />
              </div>
              <div className="text-center flex items-center justify-center">
                <div type="button" className="border border-black w-20 rounded-md" onClick={addPreview}>Preview</div>
              </div>


              {test ?<div>
              <div className={`flex-col lg:flex-row ${styles.mainContainer} `}>
                <div className={`${styles.queContainer}`}>
              <div className={styles.langDiv}>
                <button className={styles.langBtn} onClick={toggleLanguage}>
                  {language === 'hi' ? 'English' : 'Hindi'}
                </button>
              </div>
              <div className={styles.mainQue}>
                <h1>{test.questions[count].numb}. {test.questions[count].question[language]}</h1>
              </div>
              {test.questions[count].qList && (
                    <div className={styles.qList}>
                      {test.questions[count].qList[language].map((q, idx) => (
                        <div key={idx}>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}
              <div className={styles.queOptions}>
                {test.questions[count].options[language].map((option, index) => (
                  <div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className={styles.btns}>
                <div className={styles.queBtns} onClick={previousQuestion}>
                  Previous
                </div>
                {
                  (count < test.questions.length - 1) ? 
                  <div className={styles.queBtns} onClick={nextQuestion}>
                  Next
                </div>
                :
                ""}
                
                
              </div>
              
                  
                  <div className={styles.solution}>
                  <span>Solution: </span>  {test.questions[count].solution?
                  test.questions[count].solution[language] :test.questions[count].answer[language] }
                  </div>
              </div>
              </div>
            </div>
          :""}
              <div className="text-center flex items-center justify-center">
                <div type="button" className="border border-black w-20 rounded-md" onClick={addTest}>Submit</div>
              </div>
            </form>
          </div>
        </div>
      </div>
      :
      "log in first"}
    </>
  );
};

export default TestPostAdmin;
