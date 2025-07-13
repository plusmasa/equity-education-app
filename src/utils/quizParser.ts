import { QuizBuilder, QuizData, QuizCalculations } from './quizGenerator';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const parseQuizFromMarkdown = (content: string): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  // Look for quiz patterns in the markdown
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for **Question:** pattern
    if (line.startsWith('**Question:**')) {
      const questionText = line.replace('**Question:**', '').trim();
      const options: string[] = [];
      let correctAnswer = -1;
      let explanation = '';
      
      // Look for options (A), B), C), D))
      for (let j = i + 1; j < lines.length; j++) {
        const optionLine = lines[j].trim();
        
        if (optionLine.match(/^-\s+[A-D]\)/)) {
          const optionText = optionLine.replace(/^-\s+[A-D]\)\s*/, '');
          options.push(optionText);
        } else if (optionLine.startsWith('**Correct Answer:**')) {
          // Parse correct answer (e.g., "C) Savings Account")
          const answerText = optionLine.replace('**Correct Answer:**', '').trim();
          const answerLetter = answerText.charAt(0);
          correctAnswer = answerLetter.charCodeAt(0) - 'A'.charCodeAt(0);
          break;
        } else if (optionLine.startsWith('**') || optionLine.startsWith('##') || optionLine === '') {
          // End of question block
          break;
        }
      }
      
      if (options.length > 0 && correctAnswer >= 0) {
        questions.push({
          question: questionText,
          options,
          correctAnswer,
          explanation
        });
      }
    }
  }
  
  return questions;
};

// Utility functions for randomization
const getRandomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Dynamic quiz generator - creates randomized questions for each lesson
export const generateDynamicQuiz = (lessonId: string): QuizQuestion[] => {
  const builder = new QuizBuilder();

  switch (lessonId) {
    case 'stage1-section1':
      // Investment calculation question
      const initialInvestment = getRandomFromArray(QuizData.roundNumbers.investments);
      const returnRate = getRandomFromArray(QuizData.roundNumbers.rates);
      const years = getRandomFromArray(QuizData.roundNumbers.years);
      const finalAmount = QuizCalculations.compoundInterest(initialInvestment, returnRate, years);
      
      builder.addCalculationQuestion(
        `If you invest $${initialInvestment.toLocaleString()} at ${returnRate}% annual return for ${years} years, approximately how much will you have?`,
        finalAmount,
        `Compounding means earning returns on your returns. $${initialInvestment.toLocaleString()} growing at ${returnRate}% annually becomes $${finalAmount.toLocaleString()} after ${years} years.`
      );

      // Risk assessment question
      const riskAssets = QuizData.riskAssets.map(asset => asset.name);
      const lowestRiskAsset = QuizData.riskAssets.find(asset => asset.risk === 'lowest')?.name || 'Savings Account';
      
      builder.addMultipleChoice(
        "Which asset typically has the LOWEST risk?",
        lowestRiskAsset,
        riskAssets.filter(asset => asset !== lowestRiskAsset),
        "Savings accounts and government bonds are considered the safest investments with guaranteed or very stable returns."
      );
      break;

    case 'stage1-section2-public':
      // Company type question
      builder.addCompanyTypeQuestion(QuizData.companies);

      // Liquidity scenario question
      const scenario = getRandomFromArray(QuizData.liquidityScenarios);
      const liquidityOptions = ['Public company stock', 'Private company equity', 'Both are equal', 'Neither works'];
      
      builder.addScenarioQuestion(
        scenario.scenario,
        scenario.answer,
        liquidityOptions,
        scenario.answer === 'Public company stock' ? 
          'Public companies trade on exchanges, so you can sell shares quickly during market hours.' :
          'Private equity may offer higher returns but requires patience as liquidity is limited.'
      );
      break;

    case 'stage2-section1-lifecycle':
      // Dilution calculation question
      const initialOwnership = getRandomFromArray([10, 15, 20, 25]);
      const seriesADilution = getRandomFromArray([0.5, 0.6, 0.7]); // Multiply by this to get new ownership
      const finalOwnership = Math.round(initialOwnership * seriesADilution * 10) / 10; // Round to 1 decimal
      const exitValue = getRandomFromArray([10, 20, 50, 100]); // Million dollars
      const yourPayout = Math.round((finalOwnership / 100) * exitValue * 10) / 10;

      builder.addCalculationQuestion(
        `You own ${initialOwnership}% of a startup after seed funding. After Series A dilution, you own ${finalOwnership}%. If the company is acquired for $${exitValue} million, how much do you receive?`,
        yourPayout * 1000000, // Convert to dollars for calculation helper
        `${finalOwnership}% of $${exitValue} million = $${yourPayout} million. Even though your percentage decreased, your actual payout can be substantial if the company grows.`
      );

      // Funding round conceptual question
      const fundingStages = ['Seed Round', 'Series A', 'Series B', 'IPO'];
      const correctStage = 'Series A';
      const wrongStages = fundingStages.filter(stage => stage !== correctStage);
      
      builder.addMultipleChoice(
        "At which stage do startups typically first work with venture capital firms?",
        correctStage,
        wrongStages,
        "Series A is when startups typically first engage with VC firms after showing initial traction and product-market fit."
      );

      // Dilution understanding question
      builder.addMultipleChoice(
        "Why might founders accept dilution when raising funding?",
        "A smaller percentage of a much larger company can be worth more",
        [
          "They have no choice in the matter",
          "Dilution always increases their wealth",
          "It reduces their tax obligations"
        ],
        "Smart founders understand that owning 30% of a $20M company ($6M) is better than owning 60% of a $5M company ($3M)."
      );
      break;

    default:
      // Generic dynamic question for any lesson - will expand these later
      const concepts = ['risk', 'return', 'diversification', 'liquidity'];
      const randomConcept = getRandomFromArray(concepts);
      
      builder.addMultipleChoice(
        `What did you learn about ${randomConcept} in this lesson?`,
        'Important principles that affect investment decisions',
        ['Nothing significant', 'Complex mathematical formulas', 'Day trading strategies'],
        `This lesson covered key concepts about ${randomConcept} to help you make better investment decisions.`
      );
  }

  return builder.build();
};

// Keep the old function name for backward compatibility
export const getSampleQuiz = generateDynamicQuiz;