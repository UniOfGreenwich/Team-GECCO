import { useState, useMemo, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./financialQuiz.scss";

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  tip: string;
}

const initialQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    questionText: "What is a common recommendation for an emergency fund?",
    options: [
      "1 month of expenses",
      "3-6 months of expenses",
      "1 year of expenses",
      "No fund needed",
    ],
    correctAnswer: "3-6 months of expenses",
    tip: "Aim to save 3-6 months of essential living expenses in an easily accessible savings account for emergencies like job loss or medical bills.",
  },
  {
    id: "q2",
    questionText:
      "What does APR stand for in relation to loans or credit cards?",
    options: [
      "Annual Percentage Rate",
      "Applied Payment Ratio",
      "Annual Payment Requirement",
      "Actual Percentage Return",
    ],
    correctAnswer: "Annual Percentage Rate",
    tip: "APR (Annual Percentage Rate) represents the yearly cost of borrowing money, including interest and fees. A lower APR is generally better.",
  },
  {
    id: "q3",
    questionText:
      "Which of these typically has the highest potential for long-term growth, but also higher risk?",
    options: [
      "Savings Account",
      "Government Bonds",
      "Stocks",
      "Certificate of Deposit (CD)",
    ],
    correctAnswer: "Stocks",
    tip: "Stocks offer higher potential returns over the long term compared to safer options like savings accounts or bonds, but they also come with greater volatility and risk of loss.",
  },
  {
    id: "q4",
    questionText: "What is diversification in investing?",
    options: [
      "Putting all money in one stock",
      "Spreading investments across different asset types",
      "Only investing in your home country",
      "Timing the market perfectly",
    ],
    correctAnswer: "Spreading investments across different asset types",
    tip: "Diversification means spreading your investments across various assets (stocks, bonds, real estate, etc.) to reduce risk. Don't put all your eggs in one basket.",
  },
  {
    id: "q5",
    questionText: "A credit score primarily indicates your:",
    options: [
      "Annual income",
      "Investment knowledge",
      "Creditworthiness or risk as a borrower",
      "Age and location",
    ],
    correctAnswer: "Creditworthiness or risk as a borrower",
    tip: "Your credit score reflects your history of managing debt. A higher score makes it easier and cheaper to borrow money for things like mortgages or car loans.",
  },
  {
    id: "q6",
    questionText: "What is compound interest?",
    options: [
      "Interest paid only on the principal amount",
      "Interest earned on both the principal and accumulated interest",
      "A type of complex loan",
      "Interest that decreases over time",
    ],
    correctAnswer:
      "Interest earned on both the principal and accumulated interest",
    tip: "Compound interest is powerful! It means your money earns returns, and then those returns start earning returns too, accelerating growth over time.",
  },
  {
    id: "q7",
    questionText: 'Which budget category is often considered a "need"?',
    options: [
      "Dining out",
      "Streaming subscriptions",
      "Rent or Mortgage payment",
      "Vacations",
    ],
    correctAnswer: "Rent or Mortgage payment",
    tip: "Distinguish between needs (essential for living, like housing, basic food, utilities) and wants (non-essential, like entertainment). Prioritize needs in your budget.",
  },
  {
    id: "q8",
    questionText:
      "What is a 401(k) or similar employer-sponsored plan primarily used for?",
    options: [
      "Short-term savings",
      "Buying a car",
      "Retirement savings",
      "Paying off student loans",
    ],
    correctAnswer: "Retirement savings",
    tip: "Employer-sponsored retirement plans (like 401(k)s) are valuable tools for long-term retirement savings, often offering tax advantages and employer matching contributions.",
  },
  {
    id: "q9",
    questionText:
      "Paying only the minimum amount due on a credit card each month generally leads to:",
    options: [
      "Paying off the debt quickly",
      "Improving your credit score significantly",
      "Paying significantly more interest over time",
      "Getting rewards points faster",
    ],
    correctAnswer: "Paying significantly more interest over time",
    tip: "Always try to pay more than the minimum on credit card debt. Paying only the minimum can keep you in debt for years and cost a lot in interest.",
  },
  {
    id: "q10",
    questionText: "What is inflation?",
    options: [
      "The rate at which investments grow",
      "A decrease in the general price level of goods and services",
      "An increase in the general price level, reducing purchasing power",
      "A government tax on savings",
    ],
    correctAnswer:
      "An increase in the general price level, reducing purchasing power",
    tip: "Inflation erodes the value of your money over time. Your savings and investments need to grow at least as fast as inflation to maintain their purchasing power.",
  },
  {
    id: "q11",
    questionText: 'What is a "deductible" in an insurance policy?',
    options: [
      "The amount insurance pays for a claim",
      "The monthly cost of the insurance",
      "The amount you pay out-of-pocket before insurance pays",
      "A discount for safe drivers",
    ],
    correctAnswer: "The amount you pay out-of-pocket before insurance pays",
    tip: "The deductible is the amount you must pay towards a covered claim before your insurance benefits kick in. A higher deductible usually means a lower premium, but more cost upfront if you file a claim.",
  },
  {
    id: "q12",
    questionText: 'Which of the following is generally considered "good debt"?',
    options: [
      "High-interest credit card debt",
      "A payday loan",
      "A mortgage for a primary residence",
      "A loan for a depreciating asset like a boat",
    ],
    correctAnswer: "A mortgage for a primary residence",
    tip: '"Good debt" typically refers to borrowing for assets that may increase in value or generate income, like a home (mortgage) or education (student loans, potentially). High-interest debt for consumption is usually considered "bad debt".',
  },
  {
    id: "q13",
    questionText: 'What does "liquidity" refer to in finance?',
    options: [
      "How quickly an asset can be converted to cash without losing value",
      "The total value of your assets",
      "The profitability of an investment",
      "The risk associated with an investment",
    ],
    correctAnswer:
      "How quickly an asset can be converted to cash without losing value",
    tip: "Liquidity measures how easily you can access your money. Cash and savings accounts are very liquid, while real estate or certain investments are less liquid.",
  },
  {
    id: "q14",
    questionText: "What is the purpose of a W-4 form in the US?",
    options: [
      "To file your annual income taxes",
      "To tell your employer how much federal income tax to withhold from your paycheck",
      "To apply for unemployment benefits",
      "To open a retirement account",
    ],
    correctAnswer:
      "To tell your employer how much federal income tax to withhold from your paycheck",
    tip: "The W-4 form helps determine your tax withholding based on your filing status and dependents. Filling it out accurately helps avoid owing large amounts or overpaying throughout the year.",
  },
  {
    id: "q15",
    questionText: "What is a FICO score?",
    options: [
      "A type of investment fund",
      "A measure of your physical fitness",
      "A widely used type of credit score",
      "A government savings bond",
    ],
    correctAnswer: "A widely used type of credit score",
    tip: "FICO scores are a brand of credit score commonly used by lenders to assess credit risk. Maintaining a good credit history positively impacts your FICO score.",
  },
  {
    id: "q16",
    questionText:
      "What is the difference between a debit card and a credit card?",
    options: [
      "No difference, they work the same",
      "Debit cards use borrowed money, credit cards use your own funds",
      "Debit cards draw money directly from your bank account, credit cards use borrowed funds",
      "Credit cards are only for online shopping",
    ],
    correctAnswer:
      "Debit cards draw money directly from your bank account, credit cards use borrowed funds",
    tip: "Debit cards deduct funds immediately from your checking account. Credit cards allow you to borrow money up to a limit, which you must repay later, potentially with interest.",
  },
  {
    id: "q17",
    questionText: "What is a mutual fund?",
    options: [
      "A fund that invests in only one company",
      "A pool of money from many investors used to buy a variety of stocks, bonds, etc.",
      "A type of high-risk individual stock",
      "A government-run savings program",
    ],
    correctAnswer:
      "A pool of money from many investors used to buy a variety of stocks, bonds, etc.",
    tip: "Mutual funds offer instant diversification by spreading your investment across many different securities, managed by a professional fund manager.",
  },
  {
    id: "q18",
    questionText: 'What is the "Rule of 72"?',
    options: [
      "A rule for how much to save for retirement",
      "A way to estimate how long it takes for an investment to double",
      "A regulation for bank lending practices",
      "A method for calculating mortgage payments",
    ],
    correctAnswer:
      "A way to estimate how long it takes for an investment to double",
    tip: "The Rule of 72 is a quick way to estimate doubling time: divide 72 by the annual interest rate (e.g., 72 / 8% interest = approx 9 years to double).",
  },
  {
    id: "q19",
    questionText: "What is identity theft?",
    options: [
      "Forgetting your online passwords",
      "Someone using your personal information without permission, often for financial gain",
      "Changing your name legally",
      "Applying for multiple credit cards",
    ],
    correctAnswer:
      "Someone using your personal information without permission, often for financial gain",
    tip: "Protect your personal information (Social Security number, bank details) to prevent identity theft. Regularly check your credit reports and bank statements for suspicious activity.",
  },
  {
    id: "q20",
    questionText: "What is a budget deficit?",
    options: [
      "Spending exactly as much as you earn",
      "Earning more than you spend",
      "Spending more than you earn",
      "Having no budget at all",
    ],
    correctAnswer: "Spending more than you earn",
    tip: "A budget deficit occurs when expenses exceed income in a given period. Consistently running a deficit leads to debt accumulation.",
  },
];

const QUIZ_DURATION_SECONDS = 360;

type QuizAction =
  | { type: "SELECT_ANSWER"; payload: { questionId: string; answer: string } }
  | { type: "NEXT_QUESTION"; payload: { totalQuestions: number } }
  | { type: "SHOW_RESULTS" }
  | { type: "RETAKE_QUIZ"; payload: { questions: QuizQuestion[] } }
  | { type: "SET_QUESTIONS"; payload: QuizQuestion[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string>;
  showResults: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  showResults: false,
  loading: true,
  error: null,
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "An unknown error occurred";
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareShuffledQuestions(
  questionsData: QuizQuestion[],
): QuizQuestion[] {
  const shuffledQuestions = shuffleArray(questionsData);
  const questionsWithOptionsShuffled = shuffledQuestions.map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
  return questionsWithOptionsShuffled;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECT_ANSWER":
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case "NEXT_QUESTION":
      if (state.currentQuestionIndex < action.payload.totalQuestions - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      } else {
        return { ...state, showResults: true };
      }
    case "SHOW_RESULTS":
      return { ...state, showResults: true };
    case "RETAKE_QUIZ":
      return {
        ...initialState,
        questions: action.payload.questions,
        loading: false,
      };
    default: {
      const _: never = action;
      console.error("Unhandled action:", _);
      throw new Error(`Unhandled action type`);
    }
  }
}

function FinancialQuizPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [openTips, setOpenTips] = useState<Record<number, boolean>>({});

  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    showResults,
    loading,
    error,
  } = state;

  const toggleTip = (index: number) => {
    setOpenTips((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchAndSetShuffledQuestions = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const shuffledData = prepareShuffledQuestions(initialQuizQuestions);
      dispatch({ type: "SET_QUESTIONS", payload: shuffledData });
      setTimeLeft(QUIZ_DURATION_SECONDS);
    } catch (err: unknown) {
      dispatch({ type: "SET_ERROR", payload: getErrorMessage(err) });
    }
  };

  useEffect(() => {
    fetchAndSetShuffledQuestions();
  }, []);

  const timerRunning = !showResults && !loading && !error && timeLeft > 0;

  useEffect(() => {
    if (!timerRunning) {
      if (timeLeft <= 0 && !loading && !error && !showResults) {
        dispatch({ type: "SHOW_RESULTS" });
      }
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timerRunning, showResults, loading, error, timeLeft]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion
    ? userAnswers[currentQuestion.id]
    : undefined;

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (showResults) return;
    dispatch({ type: "SELECT_ANSWER", payload: { questionId, answer } });
  };

  const handleNextQuestion = () => {
    dispatch({
      type: "NEXT_QUESTION",
      payload: { totalQuestions: questions.length },
    });
  };

  const handleRetakeQuiz = () => {
    const newShuffledQuestions = prepareShuffledQuestions(initialQuizQuestions);
    dispatch({
      type: "RETAKE_QUIZ",
      payload: { questions: newShuffledQuestions },
    });
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setOpenTips({});
  };

  const handleRetryFetch = () => {
    fetchAndSetShuffledQuestions();
  };

  const results = useMemo(() => {
    if (!showResults || questions.length === 0)
      return { score: 0, incorrectTips: [] };
    let score = 0;
    const incorrectTips: string[] = [];
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      } else if (userAnswers[q.id]) {
        incorrectTips.push(q.tip);
      }
    });
    const uniqueTips = Array.from(new Set(incorrectTips));
    return { score, incorrectTips: uniqueTips };
  }, [showResults, userAnswers, questions]);

  if (loading) {
    return (
      <div className="financial-quiz-page">
        <div className="loading-indicator">Loading Quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="financial-quiz-page">
        <div className="error-message">
          <p>Error loading quiz: {error}</p>
          <button className="button-secondary" onClick={handleRetryFetch}>
            Try Again
          </button>
          <button
            className="button-secondary"
            onClick={() => navigate("/")}
            style={{ marginLeft: "1rem" }}
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="financial-quiz-page">
      {!showResults ? (
        <div className="quiz-card">
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Welcome
          </button>
          <h2>Financial Literacy Quiz</h2>
          <div className="quiz-header-info">
            <div className="progress-indicator">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="timer-display">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
          {currentQuestion && (
            <div className="question-container">
              <h3>{currentQuestion.questionText}</h3>
              <div className="options-container">
                {currentQuestion.options.map((option) => (
                  <label
                    key={`${currentQuestion.id}-${option}`}
                    className={`option-label ${
                      selectedAnswer === option ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() =>
                        handleAnswerSelect(currentQuestion.id, option)
                      }
                      className="option-radio"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}
          <button
            className="button-primary next-button"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </div>
      ) : (
        <div className="results-card">
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Welcome
          </button>
          <h2>Quiz Results</h2>
          {timeLeft <= 0 && <p className="time-up-message">Time's up!</p>}
          <p className="score-display">
            You scored {results.score} out of {questions.length}!
          </p>

          {results.incorrectTips.length > 0 && (
            <div className="tips-section">
              <h3>Personalized Tips Based On Your Answers:</h3>
              <div className="tips-list">
                {results.incorrectTips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <button
                      className="tip-toggle-button"
                      onClick={() => toggleTip(index)}
                      aria-expanded={!!openTips[index]}
                      aria-controls={`tip-content-${index}`}
                    >
                      <span>Tip #{index + 1}</span>
                      <span className="tip-indicator">
                        {openTips[index] ? "−" : "+"}
                      </span>
                    </button>
                    {openTips[index] && (
                      <div
                        id={`tip-content-${index}`}
                        className="tip-content"
                        role="region"
                        aria-labelledby={`tip-button-${index}`}
                      >
                        {tip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.incorrectTips.length === 0 && questions.length > 0 && (
            <p className="congrats-message">
              Great job! You have a solid understanding of these financial
              concepts.
            </p>
          )}

          <button className="button-secondary" onClick={handleRetakeQuiz}>
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

const styles = `
.loading-indicator, .error-message {
  color: var(--color-text-light);
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
}
.error-message p {
  color: var(--color-negative);
  margin-bottom: 1.5rem;
}
.quiz-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted-light);
  font-size: 0.9rem;
  padding: 0 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.timer-display {
  font-weight: 500;
  color: var(--color-primary-light);
}
.time-up-message {
   color: var(--color-negative);
   text-align: center;
   font-weight: 600;
   margin-bottom: 1rem;
}
`;
const existingStyleSheet = document.getElementById("quiz-styles");
if (!existingStyleSheet) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "quiz-styles";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default FinancialQuizPage;
