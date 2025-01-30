import  { useState } from "react";
import useFetchQuizData from "../hooks/useFetchQuizData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaretDown, CaretUp, CheckCircle, Smiley, SmileySad } from "@phosphor-icons/react";
import Loading from "./Loading";
interface QuizData {
  questions: {
    description: string;
    options: {
      id: number;
      description: string;
      is_correct: boolean;
    }[];
  }[];
}
function Quiz() {
  const { data, loading, error } = useFetchQuizData<QuizData>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(true);

  if (loading) {
    return (
     <Loading/>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const questions = data?.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (optionId: number) => {
    setSelectedOption(optionId);
  };
 
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const selectedOptionData = currentQuestion.options.find(
        (option) => option.id === selectedOption
      );

      if (selectedOptionData?.is_correct) {
        toast.success("Correct Answer!", { autoClose: 1000 });
        setCorrectAnswers((prev) => prev + 1);
      } else {
        toast.error("Wrong Answer!", { autoClose: 1000 });
      }

      setTimeout(() => {
        setAnsweredQuestions((prev) => prev + 1);
        setSelectedOption(null);
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setShowResults(true);
        }
      }, 1600);
    }
  };

  const toggleReview = () => {
    setShowReview((prev) => !prev);
  };

  return (
    <div className="w-11/12   sm:w-5/12  ">
      {/* Toast Container */}
      <ToastContainer position="top-center" />

      {showResults ? (
        <div className="h-full mt-20 flex justify-start items-center flex-col">
          <h1 className="text-center text-3xl font-semibold">
            Quiz Completed!
          </h1>
          <div className="text-center flex items-center gap-x-2 text-gray-500">
            Correct Answers: {correctAnswers}/{totalQuestions}
            {
                correctAnswers > totalQuestions/2 ? <Smiley size={20} />:<SmileySad size={20} />
            }
          </div>
          <button
            onClick={toggleReview}
            className="mt-4  flex items-center justify-center transition-all duration-500  gap-x-2 px-4 cursor-pointer py-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Review Answers
            <span>{showReview ? <CaretDown size={24} /> : <CaretUp size={24} /> }
               </span>
            
          </button>
          {/* {showReview && ( */}
          <div
    className={`mt-8 overflow-hidden transition-all duration-500 ${
      showReview ? "min-h-screen   opacity-100" : "h-0 opacity-0"
    }`}
  >
              {questions.map((question, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-6 mb-2">
                  <h3 className="font-semibold text-lg text-left text-gray-700">{index+1}. {question.description}</h3>
                  <ul className="mt-3  grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                      <li
                        key={option.id}
                        className={`p-2 flex items-center gap-x-2  border border-gray-200  rounded ${
                          option.is_correct ? "bg-green-500 text-white" : "bg-gray-200 text-black"
                        }`}
                      >
                       {option.is_correct && <CheckCircle size={20} className="mt-0.5"/>} {option.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          {/* )} */}
        </div>
      ) : (
        <div className="w-full  mt-20">
          {/* Question Counter */}
          <div className="mb-4 text-xl text-center font-semibold">
            Question {answeredQuestions + 1} / {totalQuestions}
          </div>

          {/* Display Current Question */}
          <div className="border w-full border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 text-left text-lg">{currentQuestion.description}</h3>

            {/* Display Options */}
            <ul className="mt-3  grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start justify-start text-left p-2 gap-x-2  border border-gray-200 rounded cursor-pointer transition hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => handleOptionChange(option.id)}
                    className="form-radio mt-1.5"
                  />
                  {option.description}
                </label>
              ))}
            </ul>

            {/* Next Button */}
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className={`mt-8 px-4 py-2 w-full bg-blue-500 ${
                selectedOption !== null && "cursor-pointer"
              } text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
