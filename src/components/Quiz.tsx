import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    
    // Evaluate this question immediately - single source of truth
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newCorrectCount = correctAnswersCount + (isCorrect ? 1 : 0);
    setCorrectAnswersCount(newCorrectCount);
    
    console.log(`Question ${currentQuestion + 1} evaluated:`, {
      userAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      userAnswerText: question.options[selectedAnswer],
      correctAnswerText: question.options[question.correctAnswer],
      isCorrect,
      runningScore: `${newCorrectCount}/${currentQuestion + 1}`
    });
    
    setShowResult(true);

    setTimeout(() => {
      if (isLastQuestion) {
        setQuizComplete(true);
        console.log('Quiz complete! Final score:', newCorrectCount, 'out of', questions.length);
        onComplete?.(newCorrectCount);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setQuizComplete(false);
    setCorrectAnswersCount(0);
  };


  const getResultIcon = (isCorrect: boolean) => {
    return isCorrect ? (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  };

  if (quizComplete) {
    // Use the stored score instead of re-calculating!
    const score = correctAnswersCount;
    console.log('Quiz summary using stored score:', score, 'out of', questions.length);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-neutral-200 p-6"
      >
        <div className="text-center">
          <div className="mb-4">
            {percentage >= 80 ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">Quiz Complete!</h3>
          <p className="text-lg text-neutral-700 mb-4">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
          {percentage >= 80 ? (
            <p className="text-green-700 mb-6">Great job! You have a solid understanding of the material.</p>
          ) : (
            <>
              <p className="text-yellow-700 mb-6">Good effort! Consider reviewing the lesson material again.</p>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-neutral-200 p-6"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-neutral-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-primary-500 bg-primary-50'
                  : showResult && index === question.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-neutral-900">{option}</span>
                {showResult && (selectedAnswer === index || index === question.correctAnswer) && (
                  <div className="ml-2">
                    {index === question.correctAnswer 
                      ? getResultIcon(true)
                      : selectedAnswer === index 
                      ? getResultIcon(false)
                      : null
                    }
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Result Explanation */}
      <AnimatePresence>
        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-lg border ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p className="text-sm text-neutral-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <div className="flex justify-end">
        {showResult ? (
          <div className="text-sm text-neutral-500">
            {isLastQuestion ? 'Calculating final score...' : 'Moving to next question...'}
          </div>
        ) : (
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;