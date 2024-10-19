import styles from "../../Styles/Testpage.module.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebaseinit";

const TestStart = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [count, setCount] = useState(0);  // Track current question index
  const [score, setScore] = useState(0);  // Track score
  const [isTestCompleted, setIsTestCompleted] = useState(false);  // Track if test is completed
  const [timeLeft, setTimeLeft] = useState(300);  // Timer set to 300 seconds (5 minutes)
  const [totalTime, setTotalTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);  // Time taken after the test is completed
  const [selectedOptions, setSelectedOptions] = useState({});  // Track selected option for each question
  const [language, setLanguage] = useState('hi');  // Track the current language (Hindi by default)
  const [questionStatus, setQuestionStatus] = useState({});  // Track whether a question is answered or skipped
  const [answered, setAnswered] = useState({});
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    console.log("Current Test ID:", testId);

    if (testId) {
      const testDocRef = doc(db, "tests", testId);

      const unsubscribe = onSnapshot(testDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const testData = { id: docSnapshot.id, ...docSnapshot.data() };
          setTest(testData);  // Update test state
          setLoading(false);  // Set loading to false after data is fetched
        } else {
          console.log("No such document!");
          setLoading(false);  // Set loading to false even if no document is found
        }
      });

      return () => {
        unsubscribe();
      };
    } else {
      console.log("Test ID or Test data not available");
      setLoading(false);
    }
  }, [testId]);

  // Use another useEffect to update timeLeft only when the test is loaded

    useEffect(() => {
      if (!loading && test) {
        setTimeLeft(test.timer);
        setTotalTime(test.timer);
        console.log("Time left has been set:", test.timer);
      }
    }, [loading, test]);
  

  // Handle answer selection and allow re-selection of options
  const handleOptionClick = (selectedOption) => {
    // Allow re-selection of the option
    setSelectedOptions((prev) => ({ ...prev, [count]: selectedOption }));

    // Mark question as answered in questionStatus
    setAnswered((prevStatus) => ({ ...prevStatus, [count]: 'answered' }));
  };

  // Check and update the score when moving to the next or previous question
  const checkAndUpdateScore = () => {
    const selectedOption = selectedOptions[count];
    if (selectedOption === test.questions[count].answer[language]) {
      if (!questionStatus[count]) {
        setScore((prevScore) => prevScore + 1);
        setQuestionStatus((prevStatus) => ({ ...prevStatus, [count]: 'answered' }));
      }
    }
    console.log(selectedOption, test.questions[count].answer[language], questionStatus[count], score);
  };

  const nextQuestion = () => {
    checkAndUpdateScore();
    if (count < test.questions.length - 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const previousQuestion = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  // Timer logic
  useEffect(() => {
    if (start && !isTestCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      completeTest(); // Complete the test if time runs out
    }
  }, [start, timeLeft, isTestCompleted]);



  // Function to complete the test
  const completeTest = () => {
    checkAndUpdateScore();
    setIsTestCompleted(true);
    setTimeTaken(totalTime - timeLeft);
  };

  // Toggle language between English and Hindi
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'hi' ? 'en' : 'hi'));
  };

  // Format the time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startBtn = () => {
    setStart(true);
    startTimer()
  };

  return (
    <>
    {
      loading ? <div className="h-full w-full flex items-center justify-center">
        <i>Loading...</i>
      </div> :
      (!start ? (
        <div className="h-full w-full flex flex-col  items-center justify-center">
          <div className=" bg-green-50 p-10 my-10 rounded-lg">
            <div className="my-5">
            <p>* इस टेस्ट को पुरा करने के लिए आपको <b>{formatTime(timeLeft)}</b>  मिनट का समय दिया गया है। यदि निर्धारित समय में आप सभी प्रश्न हल नहीं कर पाए तो टेस्ट अपने-आप <b>SUBMIT</b> हो जाएगा।</p>
            <p>* यदि आपने टेस्ट समय से पहले पुरा कर लिया है तो आप <b>SUBMIT</b> बटन पर क्लिक करके टेस्ट समाप्त कर सकते हैं।</p>
            <p>* टेस्ट में प्रश्नों में आगे जाने के लिए <b>NEXT </b>बटन एवं पिछे जाने के लिए <b>PREVIOUS</b> बटन दबाएं।</p>
            <p>* टेस्ट की भाषा हिन्दी में सेट की गई है। <b>ENGLISH</b> करने के लिए <b>ENGLISH</b> का बटन दबाएं।</p>
            <p>* टेस्ट में विशेष प्रश्न क्रमांक में जाने के लिए पेज के दाहिने ओर प्रश्नों की संख्या इी है प्रश्न संख्या पर क्लिक कर आप उस प्रश्न पर जा सकते हैं। </p>
            
            </div>

            <div className="flex justify-center items=center ">
            <button className="w-[150px] rounded-md" onClick={startBtn}>Start Test</button> {/* Corrected here */}
            </div>
            </div>
           
          

        </div>
          ) : (
         !isTestCompleted ? (
          <div>
            <div className={`flex-col lg:flex-row ${styles.mainContainer}`}>
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
                    {test.questions[count].qList[language].map((q, index) => (
                      <div key={index}>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={styles.queOptions}>
                  {test.questions[count].options[language].map((option, index) => (
                    <div
                      key={index}
                      className={`${styles.optionBtn} ${selectedOptions[count] === option ? styles.selected : ""}`}
                      onClick={() => handleOptionClick(option)}
                      style={{
                        backgroundColor: selectedOptions[count] === option ? '#d5ecdb' : '',
                        border: selectedOptions[count] === option ? '1px solid #74c78a' : '',
                        color: selectedOptions[count] === option ? '#38874C' : '',
                      }}
                    >
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.btns}>
                  {count > 0 ? (
                    <div className={styles.queBtns} onClick={previousQuestion}>
                      Previous
                    </div>
                  ): <div></div>}
                  {count < test.questions.length - 1 && (
                    <div className={styles.queBtns} onClick={nextQuestion}>
                      Next
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-full h-screen lg:w-2/5 flex items-center flex-col bg-[#f2fff5]`}>
                <div className={styles.timerContainer}>
                  <div className={styles.timer}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <div className={styles.queNoContainer}>
                  {test.questions.map((_, index) => (
                    <div
                      key={index}
                      className={styles.queNos}
                      onClick={() => setCount(index)}
                      style={{
                        backgroundColor: count === index ? '#F8CD8D' : selectedOptions[index] ? (answered[index] === 'answered' ? '#BFDFB0' : 'red') : '',
                        color: count === index ? '#EE7373' : selectedOptions[index] ? (answered[index] === 'answered' ? '#38874C' : 'white') : '',
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className={styles.exitNsubmit}>
                  <div className={styles.exitBtn} onClick={completeTest}>
                    Submit Test
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[100vw] h-[100vh] flex items-center flex-col border ">
            <div className="w-[300px] h-[230px] m-10 flex items-center flex-col rounded-2xl bg-[#eff7f1]">
              <div className="w-full flex items-center flex-col py-4">
                <h1 className="text-[#38874C] font-bold">Test Completed!</h1>
                <p className="my-5"><span className="text-red-700 font-semibold">Your final score is:</span> {score}/{test.questions.length}</p>
                <p><span className="text-red-700 font-semibold">Total time taken:</span> {formatTime(timeTaken)}</p>
              </div>
              <div className="w-full flex justify-center items-center my-5 border-gray-50">
                <div className={`${styles.queBtns} mx-5`}>
                  <Link to={`/tests`}>Retake Test</Link>
                </div>
                <div className={`${styles.queBtns} mx-5`}>
                  <Link to={`/tests/solution/${testId}`}>Solution</Link>
                </div>

              </div>
              
            </div>
            <div className="w-[60%] h-full">
              <div className="W-full h-[50px] flex justify-center items-center bg-[#38874C] text-white font-bold rounded-lg my-5">QUESTIONS WITH YOUR SELECTED OPTION</div>
              {test.questions.map((question, index) => (
                <div key={index} className={styles.questionContainer}>
                  {/* Displaying the question number and text */}
                  <div className={styles.mainQue}>
                    <h1>{question.numb}. {question.question[language]}</h1>
                  </div>

                  {/* Check if the question has a question list and render it */}
                  {question.qList && (
                    <div className={styles.qList}>
                      {question.qList[language].map((q, idx) => (
                        <div key={idx}>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Display the options for the current question */}
                  <div className={styles.queOptions}>
                    {question.options[language].map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`${styles.optbtn} ${selectedOptions[index] === option ? styles.selected : ""}`}
                        style={{
                          backgroundColor: selectedOptions[index] === option ? '#d5ecdb' : '',
                          border: selectedOptions[index] === option ? '1px solid #74c78a' : '',
                          color: selectedOptions[index] === option ? '#38874C' : '',
                        }}
                      >
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>


          </div>
          
        )
          ))
    }
      
    </>
  );
};

export default TestStart;
