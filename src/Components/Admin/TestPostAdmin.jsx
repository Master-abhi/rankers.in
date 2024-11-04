import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { useState, useRef } from "react";

const TestPostAdmin = () => {
  const [isNew, setIsNew] = useState();
  const testNameRef = useRef();
  const belongsToRef = useRef();
  const questionsRef = useRef();
  const postDateRef = useRef();
  const timerRef = useRef();

  // Function to handle isNew radio input
  const handleRadio = (event) => {
    const value = event.currentTarget.value === 'true';
    setIsNew(value);
  };

  // Function to convert the text input into an array of questions
  const convertTextToQuestions = (input) => {
    // Split the input by lines and filter out any empty lines
    const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const questionsArray = [];
    let currentQuestion = {};
  
    // Process each line
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("No.")) {
        // If there is an existing question, push it to the array
        if (currentQuestion.numb) {
          questionsArray.push(currentQuestion);
          currentQuestion = {};
        }
        currentQuestion.numb = parseInt(lines[i].replace("No. ", "").trim(), 10);
      } else if (lines[i].startsWith("Question (EN):")) {
        currentQuestion.question = { en: lines[i].split(": ")[1] };
      } else if (lines[i].startsWith("Question (HI):")) {
        currentQuestion.question.hi = lines[i].split(": ")[1];
      } else if (lines[i].startsWith("Answer (EN):")) {
        currentQuestion.answer = { en: lines[i].split(": ")[1] };
      } else if (lines[i].startsWith("Answer (HI):")) {
        currentQuestion.answer.hi = lines[i].split(": ")[1];
      } else if (lines[i].startsWith("Options (EN):")) {
        currentQuestion.options = { en: lines[i].split(": ")[1].split(", ") };
      } else if (lines[i].startsWith("Options (HI):")) {
        currentQuestion.options.hi = lines[i].split(": ")[1].split(", ");
      }
    }
  
    // Push the last question if exists
    if (currentQuestion.numb) {
      questionsArray.push(currentQuestion);
    }
  
    return questionsArray;
  };
  
  

  // Function to add or update the Firestore document
  const addUpdate = async () => {
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

      // Clear input fields after submission
      testNameRef.current.value = "";
      belongsToRef.current.value = "";
      questionsRef.current.value = "";
      postDateRef.current.value = "";
      setIsNew(undefined);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
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
                <textarea ref={questionsRef} className="border border-black w-[80%] m-5" />
              </div>
              <div className="text-center flex items-center justify-center">
                <span className="text-center">Enter test time: </span>
                <input type="text" ref={timerToRef} className="border border-black w-[80%] m-5" />
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
                <div type="button" className="border border-black w-20 rounded-md" onClick={addUpdate}>Submit</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPostAdmin;
