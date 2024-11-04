import styles from "../../Styles/Testpage.module.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { onSnapshot, doc} from "firebase/firestore";
import { db } from "../../firebaseinit";

const TestStart = () => {
  const {testId} = useParams(); 
  const [test, setTest] = useState(null);
  // const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0);  // Track current question index
  const [score, setScore] = useState(0);  // Track score
  const [isTestCompleted, setIsTestCompleted] = useState(false);  // Track if test is completed
  const [timeLeft, setTimeLeft] = useState(300);  // Timer set to 300 seconds (5 minutes)
  const [timeTaken, setTimeTaken] = useState(0);  // Time taken after the test is completed
  const [selectedOptions, setSelectedOptions] = useState({});  // Track selected option for each question
  const [language, setLanguage] = useState('hi');  // Track the current language (Hindi by default)
  const [questionStatus, setQuestionStatus] = useState({});  // Track whether a question is answered or skipped
  const [answered, setAnswered] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Current Test ID:", testId);
    
    if (testId) {
      const testDocRef = doc(db, "tests", testId);

      const unsubscribe = onSnapshot(testDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setTest({ id: docSnapshot.id, ...docSnapshot.data() });
          console.log(test)
        } else {
          console.log("No such document!");
        }
        
        setLoading(false); // Set loading to false when data is fetched
      });

      return () => {
        unsubscribe();
      };
    }
    
    console.log("Test ID or Test data not available");
  }, [testId]);

  // Total time allowed for the test (300 seconds = 5 minutes)
  const totalTime = 300;

  // Questions array (with English and Hindi versions)


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
    // Check if the selected option matches the correct answer
    if (selectedOptions[count] === test.questions[count].answer[language]) {
      // If the question hasn't already been marked as answered, update the score
      if (!questionStatus[count]) {
        setScore((prevScore) => prevScore + 1);
        // Mark question as answered to avoid double scoring
        setQuestionStatus((prevStatus) => ({ ...prevStatus, [count]: 'answered' }));
      }

    }
    console.log(selectedOptions[count], test.questions[count].answer[language], questionStatus[count], score)
    console.log()
  };
  
  const nextQuestion = () => {
    // Always check and update the score before moving to the next question
    checkAndUpdateScore();
  
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
  

  // Timer logic using useEffect to count downwards
  useEffect(() => {
    if (!isTestCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      completeTest();
    }
  }, [timeLeft, isTestCompleted]);

  // Function to manually complete the test
  const completeTest = () => {
    checkAndUpdateScore();
    setIsTestCompleted(true);
    setTimeTaken(totalTime - timeLeft);  // Calculate time taken
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

  return (
    <>
    {loading ? (
      <div>Loading...</div>  // Show a loading message while the data is being fetched
    ) : (
      !isTestCompleted ? (
        <div>
          <div className={`flex-col lg:flex-row ${styles.mainContainer} `}>
            <div className={`${styles.queContainer}`}>
              <div className={styles.langDiv}>
                <button className={styles.langBtn} onClick={toggleLanguage}>
                  {language === 'hi' ? 'English' : 'Hindi'}
                </button>
              </div>
              <div className={styles.mainQue}>
                <p>{test.questions[count].numb}. {test.questions[count].question[language]}</p>
              </div>
              <div className={styles.queOptions}>
                {test.questions[count].options[language].map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionBtn} ${selectedOptions[count] === option ? styles.selected : ""}`}
                    onClick={() => handleOptionClick(option)}  // Re-select options anytime
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
              {
                  (count > 0) ? 
                  <div className={styles.queBtns} onClick={previousQuestion}>
                  Previous
                </div>
                :
                <div></div>
                }
                {
                  (count < test.questions.length - 1) ? 
                  <div className={styles.queBtns} onClick={nextQuestion}>
                  Next
                </div>
                
                :
                ""
                }
              </div>
            </div>
            <div className={`w-full h-screen lg:w-2/5 flex items-center flex-col bg-[#f2fff5] `}>
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
                    onClick={() => setCount(index)}  // Jump to specific question
                    style={{
                      backgroundColor:
                        count === index
                          ? '#F8CD8D'  // Highlight current question
                          : selectedOptions[index]
                          ? answered[index] === 'answered'
                            ? '#BFDFB0'  // Green for answered
                            : 'red'  // Red for skipped
                          : '',
                      color: count === index
                          ? '#EE7373'  // Red for current question text
                          : selectedOptions[index]
                          ? answered[index] === 'answered'
                            ? '#38874C'  // Green for answered text
                            : 'white'  // Red for skipped text
                          : ''
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
        <div className="w-full flex justify-center items-center flex-col">
          <div className={`w-full flex items-center flex-col py-4`}>
            <h1>Test Completed!</h1>
            <p>Your final score is: {score}/{test.questions.length}</p>
            <p>Total time taken: {formatTime(timeTaken)}</p>
          </div>
          <div className=" w-full flex justify-center items-center  border-gray-50 ">
          <div className={`${styles.queBtns} mx-5`}>
              <Link to={`/tests`}>Retake Test</Link>
            </div>
            <div className={`${styles.queBtns} mx-5`}>
              <Link to={`/tests/solution/${testId}`}>Solution</Link>
            </div>
          </div>

        </div>
        )
      
        )}
      
      </>
  );
};

export default TestStart;