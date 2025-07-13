// DRY Quiz Generation System
// This abstracts common quiz patterns into reusable functions

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Core utility functions for quiz generation
export class QuizBuilder {
  private questions: QuizQuestion[] = [];

  // Add a multiple choice question with proper shuffling
  addMultipleChoice(
    question: string, 
    correctAnswer: string, 
    wrongAnswers: string[], 
    explanation?: string
  ): QuizBuilder {
    const allOptions = [correctAnswer, ...wrongAnswers];
    const shuffledOptions = this.shuffleArray(allOptions);
    const correctIndex = shuffledOptions.indexOf(correctAnswer);
    
    this.questions.push({
      question,
      options: shuffledOptions,
      correctAnswer: correctIndex,
      explanation
    });
    
    return this;
  }

  // Add a calculation question with percentage-based wrong answers
  addCalculationQuestion(
    questionTemplate: string,
    correctAnswer: number,
    explanation: string,
    wrongAnswerMultipliers: number[] = [0.7, 1.3, 0.5]
  ): QuizBuilder {
    const correctText = `$${correctAnswer.toLocaleString()}`;
    const wrongAnswers = wrongAnswerMultipliers.map(multiplier => 
      `$${Math.round(correctAnswer * multiplier).toLocaleString()}`
    );
    
    return this.addMultipleChoice(questionTemplate, correctText, wrongAnswers, explanation);
  }

  // Add a calculation question with percentage formatting
  addPercentageQuestion(
    questionTemplate: string,
    correctAnswer: number,
    explanation: string,
    wrongAnswerMultipliers: number[] = [0.7, 1.3, 0.5]
  ): QuizBuilder {
    const correctText = `${correctAnswer}%`;
    const wrongAnswers = wrongAnswerMultipliers.map(multiplier => {
      const wrongValue = Math.round(correctAnswer * multiplier * 10) / 10; // Round to 1 decimal
      return `${wrongValue}%`;
    });
    
    return this.addMultipleChoice(questionTemplate, correctText, wrongAnswers, explanation);
  }

  // Add a "which is best" scenario question
  addScenarioQuestion(
    scenario: string,
    correctAnswer: string,
    options: string[],
    explanation: string
  ): QuizBuilder {
    const wrongAnswers = options.filter(option => option !== correctAnswer);
    return this.addMultipleChoice(
      `${scenario}. Which is better?`,
      correctAnswer,
      wrongAnswers,
      explanation
    );
  }

  // Add a "which company is X type" question
  addCompanyTypeQuestion(
    companies: Array<{name: string, type: string}>,
    additionalOptions: string[] = ['Tesla']
  ): QuizBuilder {
    const selectedCompany = this.getRandomFromArray(companies);
    const otherCompanies = companies
      .filter(c => c !== selectedCompany)
      .slice(0, 2)
      .map(c => c.name);
    
    const wrongAnswers = [...otherCompanies, ...additionalOptions];
    
    return this.addMultipleChoice(
      `Which of these companies is ${selectedCompany.type}?`,
      selectedCompany.name,
      wrongAnswers,
      `${selectedCompany.name} is a ${selectedCompany.type} company. ${
        selectedCompany.type === 'public' 
          ? 'You can buy shares on stock exchanges.' 
          : 'Shares are not available to the general public.'
      }`
    );
  }

  // Build and return the final questions array
  build(): QuizQuestion[] {
    return [...this.questions];
  }

  // Reset the builder for reuse
  reset(): QuizBuilder {
    this.questions = [];
    return this;
  }

  // Utility methods
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// Predefined data for common quiz types
export const QuizData = {
  riskAssets: [
    { name: 'Government Bonds', risk: 'low' },
    { name: 'Savings Account', risk: 'lowest' },
    { name: 'High-Growth Stocks', risk: 'high' },
    { name: 'Cryptocurrency', risk: 'highest' }
  ],

  companies: [
    { name: 'Apple', type: 'public' },
    { name: 'Microsoft', type: 'public' },
    { name: 'Google', type: 'public' },
    { name: 'Amazon', type: 'public' },
    { name: 'SpaceX', type: 'private' },
    { name: 'Stripe', type: 'private' },
    { name: 'Discord', type: 'private' },
    { name: 'Canva', type: 'private' }
  ],

  liquidityScenarios: [
    { scenario: 'You need to sell your investment today', answer: 'Public company stock' },
    { scenario: 'You want maximum liquidity', answer: 'Public company stock' },
    { scenario: 'You can wait years to sell', answer: 'Private company equity' }
  ],

  roundNumbers: {
    investments: [100, 500, 1000, 2000, 5000],
    rates: [5, 10], // Easy percentages for mental math
    years: [10, 20], // Round years
    shares: [1000, 2000, 5000, 10000],
    newShares: [500, 1000, 2000],
    percentages: [10, 20, 25, 50],
    valuations: [1, 2, 5, 10], // In millions
    funding: [0.5, 1, 2], // In millions
    strikePrices: [1, 5, 10, 20],
    priceIncreases: [5, 10, 20, 50]
  }
};

// Helper functions for common calculations
export const QuizCalculations = {
  compoundInterest: (principal: number, rate: number, years: number): number => {
    return Math.round(principal * Math.pow(1 + rate/100, years));
  },

  dilutionPercentage: (originalShares: number, originalPercent: number, newShares: number): number => {
    const totalAfter = originalShares + newShares;
    return Math.round((originalPercent / 100 * originalShares / totalAfter) * 100);
  },

  optionValue: (currentPrice: number, strikePrice: number): number => {
    return Math.max(0, currentPrice - strikePrice);
  },

  vestedOptions: (totalOptions: number, monthsWorked: number, vestingMonths: number): number => {
    return Math.floor((monthsWorked / vestingMonths) * totalOptions);
  }
};