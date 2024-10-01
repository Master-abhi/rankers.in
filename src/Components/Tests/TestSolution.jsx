import styles from "../../Styles/Testpage.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TestStart = () => {
  const [count, setCount] = useState(0);  // Track current question index
  const [score, setScore] = useState(0);  // Track score
  const [isTestCompleted, setIsTestCompleted] = useState(false);  // Track if test is completed
  const [timeLeft, setTimeLeft] = useState(300);  // Timer set to 300 seconds (5 minutes)
  const [timeTaken, setTimeTaken] = useState(0);  // Time taken after the test is completed
  const [selectedOptions, setSelectedOptions] = useState({});  // Track selected option for each question
  const [language, setLanguage] = useState('hi');  // Track the current language (Hindi by default)
  const [questionStatus, setQuestionStatus] = useState({});  // Track whether a question is answered or skipped
  const [answered, setAnswered] = useState({})

  // Total time allowed for the test (300 seconds = 5 minutes)
  const totalTime = 300;

  // Questions array (with English and Hindi versions)
  const questions = [
    {
      numb: 1,
      question: {
        en: "In what year did the Great October Socialist Revolution take place?",
        hi: "महान अक्टूबर समाजवादी क्रांति किस वर्ष हुई थी?"
      },
      answer: {
        en: "A. 1917",
        hi: "A. 1917"
      },
      options: {
        en: ["A. 1917", "B. 1923", "C. 1914", "D. 1920"],
        hi: ["A. 1917", "B. 1923", "C. 1914", "D. 1920"]
      }
    },
    {
      numb: 2,
      question: {
        en: "What is the largest lake in the world?",
        hi: "दुनिया की सबसे बड़ी झील कौन सी है?"
      },
      answer: {
        en: "B. Baikal",
        hi: "B. बैकाल"
      },
      options: {
        en: ["A. Caspian Sea", "B. Baikal", "C. Lake Superior", "D. Ontario"],
        hi: ["A. कैस्पियन सागर", "B. बैकाल", "C. सुपीरियर झील", "D. ओंटारियो"]
      }
    },
    {
      numb: 3,
      question: {
        en: "Which planet in the solar system is known as the 'Red Planet'?",
        hi: "सौरमंडल में किस ग्रह को 'लाल ग्रह' कहा जाता है?"
      },
      answer: {
        en: "C. Mars",
        hi: "C. मंगल"
      },
      options: {
        en: ["A. Venus", "B. Earth", "C. Mars", "D. Jupiter"],
        hi: ["A. शुक्र", "B. पृथ्वी", "C. मंगल", "D. बृहस्पति"]
      }
    },
    {
      numb: 4,
      question: {
        en: "Who wrote the novel 'War and Peace'?",
        hi: "उपन्यास 'युद्ध और शांति' किसने लिखा?"
      },
      answer: {
        en: "C. Leo Tolstoy",
        hi: "C. लियो टॉल्स्टॉय"
      },
      options: {
        en: ["A. Anton Chekhov", "B. Fyodor Dostoevsky", "C. Leo Tolstoy", "D. Ivan Turgenev"],
        hi: ["A. आंतोन चेखव", "B. फ़्योदोर दोस्तोयेव्स्की", "C. लियो टॉल्स्टॉय", "D. इवान तुर्गनेव"]
      }
    },
    {
      numb: 5,
      question: {
        en: "What is the capital of Japan?",
        hi: "जापान की राजधानी क्या है?"
      },
      answer: {
        en: "B. Tokyo",
        hi: "B. टोक्यो"
      },
      options: {
        en: ["A. Beijing", "B. Tokyo", "C. Seoul", "D. Bangkok"],
        hi: ["A. बीजिंग", "B. टोक्यो", "C. सियोल", "D. बैंकॉक"]
      }
    }
  ];


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
    if (selectedOptions[count] === questions[count].answer[language]) {
      // If the question hasn't already been marked as answered, update the score
      if (!questionStatus[count]) {
        setScore((prevScore) => prevScore + 1);
        // Mark question as answered to avoid double scoring
        setQuestionStatus((prevStatus) => ({ ...prevStatus, [count]: 'answered' }));
      }

    }

  };
  
  const nextQuestion = () => {
    // Always check and update the score before moving to the next question
    checkAndUpdateScore();
  
    // Move to the next question
    if (count < questions.length - 1) {
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
      {!isTestCompleted ? (
        <div>
          <div className={`flex-col lg:flex-row ${styles.mainContainer} `}>
            <div className={`${styles.queContainer}`}>
              <div className={styles.langDiv}>
                <button className={styles.langBtn} onClick={toggleLanguage}>
                  {language === 'hi' ? 'English' : 'Hindi'}
                </button>
              </div>
              <div className={styles.mainQue}>
                <p>{questions[count].numb}. {questions[count].question[language]}</p>
              </div>
              <div className={styles.queOptions}>
                {questions[count].options[language].map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.optionBtn} ${selectedOptions[count] === option ? styles.selected : ""}`}
                    onClick={() => handleOptionClick(option)}  // Re-select options anytime
                    style={{
                      backgroundColor: answered[count]
                      ? option === questions[count].answer[language] // Highlight the correct answer only when answered
                          ? "#BFDFB0"
                          : selectedOptions[count] === option && option !== questions[count].answer[language] // Highlight wrong selected option
                          ? "#ecd5d5"
                          : ""
                      : "", // No color if not answered

                      color: answered[count]
                      ? option === questions[count].answer[language] // Highlight the correct answer only when answered
                          ? "#38874C"
                          : selectedOptions[count] === option && option !== questions[count].answer[language] // Highlight wrong selected option
                          ? "#f12121"
                          : ""
                      : "", // No color if not answered

                      border: answered[count]
                      ? option === questions[count].answer[language] // Highlight the correct answer only when answered
                          ? "1px solid #74c78a"
                          : selectedOptions[count] === option && option !== questions[count].answer[language] // Highlight wrong selected option
                          ? "1px solid #f76363"
                          : ""
                      : "", // No color if not answered
                  }}
                  >
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className={styles.btns}>
                <div className={styles.queBtns} onClick={previousQuestion}>
                  Previous
                </div>
                {
                  (count < questions.length - 1) ? 
                  <div className={styles.queBtns} onClick={nextQuestion}>
                  Next
                </div>
                :
                ""
                }
                
              </div>
              
                  {answered[count] ?
                  <div className={styles.solution}>
                  <span>Solution: </span>  
                  {questions[count].answer[language] }
                  </div>
                  : 
                  ""}
              
            </div>
            <div className={`w-full h-screen lg:w-2/5 flex items-center flex-col bg-[#f2fff5] `}>
              <div className={styles.timerContainer}>
                <div className={styles.timer}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className={styles.queNoContainer}>
                {questions.map((_, index) => (
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
            <p>Your final score is: {score}/{questions.length}</p>
            <p>Total time taken: {formatTime(timeTaken)}</p>
          </div>
          <div className=" w-full flex justify-center items-center  border-gray-50 ">
          <div className={`${styles.queBtns} mx-5`}>
              <Link to="/tests">Test Page</Link>
            </div>
            
          </div>

        </div>
      )}
    </>
  );
};

export default TestStart;
