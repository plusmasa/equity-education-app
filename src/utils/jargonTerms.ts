import { JargonTerm } from '../types';

// Comprehensive jargon terms database
export const JARGON_TERMS: Record<string, JargonTerm> = {
  // Basic Investment Terms
  'assets': {
    term: 'Assets',
    definition: 'Things you own that have value, such as stocks, bonds, cash, real estate, or business ownership. Assets can appreciate (gain value) or depreciate (lose value) over time.',
    learnMoreLesson: 'stage1-section1',
    learnMoreLessonTitle: 'Stage 1.1: What is Investing?'
  },
  'compounding': {
    term: 'Compounding',
    definition: 'The process of earning returns not just on your original investment, but also on the returns that investment has already generated. Often called "interest on interest."',
    learnMoreLesson: 'stage1-section1',
    learnMoreLessonTitle: 'Stage 1.1: What is Investing?'
  },
  'risk': {
    term: 'Risk',
    definition: 'The possibility that an investment will lose value or not perform as expected. Generally, higher potential returns come with higher risk.',
    learnMoreLesson: 'stage1-section1',
    learnMoreLessonTitle: 'Stage 1.1: What is Investing?'
  },
  'stocks': {
    term: 'Stocks',
    definition: 'Shares of ownership in a public company. When you buy stock, you become a partial owner of that company and can benefit from its growth.',
    learnMoreLesson: 'stage1-section2-public',
    learnMoreLessonTitle: 'Stage 1.2: Public vs. Private Companies'
  },
  'bonds': {
    term: 'Bonds',
    definition: 'Loans you make to companies or governments. In return, they pay you interest over time and return your principal when the bond matures.',
    learnMoreLesson: 'stage1-section1',
    learnMoreLessonTitle: 'Stage 1.1: What is Investing?'
  },

  // Equity & Company Terms
  'equity': {
    term: 'Equity',
    definition: 'Ownership stake in a company, typically represented by shares of stock. Equity holders have a claim on company profits and assets.',
    learnMoreLesson: 'stage1-section2-equity',
    learnMoreLessonTitle: 'Stage 1.2: Equity Basics'
  },
  'ipo': {
    term: 'IPO',
    definition: 'Initial Public Offering - when a private company first sells shares to the public, becoming a publicly traded company.',
    learnMoreLesson: 'stage1-section2-public',
    learnMoreLessonTitle: 'Stage 1.2: Public vs. Private Companies'
  },
  'liquidity': {
    term: 'Liquidity',
    definition: 'How easily and quickly you can convert an investment to cash without significantly affecting its price. Public stocks are highly liquid.',
    learnMoreLesson: 'stage1-section2-public',
    learnMoreLessonTitle: 'Stage 1.2: Public vs. Private Companies'
  },
  'private equity': {
    term: 'Private Equity',
    definition: 'Investment in companies that are not publicly traded on stock exchanges. These investments are typically less liquid but may offer higher returns.',
    learnMoreLesson: 'stage1-section2-public',
    learnMoreLessonTitle: 'Stage 1.2: Public vs. Private Companies'
  },

  // Startup Terms
  'startup': {
    term: 'Startup',
    definition: 'A young company designed to grow rapidly, typically seeking to solve a problem with an innovative product or service.',
    learnMoreLesson: 'stage2-section1-lifecycle',
    learnMoreLessonTitle: 'Stage 2.1: Startup Lifecycle'
  },
  'seed funding': {
    term: 'Seed Funding',
    definition: 'The initial capital raised by a startup, typically from friends, family, or angel investors to prove the business concept.',
    learnMoreLesson: 'stage2-section1-lifecycle',
    learnMoreLessonTitle: 'Stage 2.1: Startup Lifecycle'
  },
  'series a': {
    term: 'Series A',
    definition: 'The first major round of venture capital funding, typically used to scale the business after proving initial traction.',
    learnMoreLesson: 'stage2-section1-lifecycle',
    learnMoreLessonTitle: 'Stage 2.1: Startup Lifecycle'
  },
  'cap table': {
    term: 'Cap Table',
    definition: 'Capitalization table - a document showing who owns what percentage of a company and how that ownership is distributed among shareholders.',
    learnMoreLesson: 'stage2-section2',
    learnMoreLessonTitle: 'Stage 2.2: Shares & Dilution'
  },
  'dilution': {
    term: 'Dilution',
    definition: 'The reduction in existing shareholders\' ownership percentage that occurs when a company issues new shares.',
    learnMoreLesson: 'stage2-section2',
    learnMoreLessonTitle: 'Stage 2.2: Shares & Dilution'
  },
  'stock options': {
    term: 'Stock Options',
    definition: 'The right (but not obligation) to buy company shares at a fixed price (strike price) for a certain period of time.',
    learnMoreLesson: 'stage2-section3',
    learnMoreLessonTitle: 'Stage 2.3: Options & Vesting'
  },
  'vesting': {
    term: 'Vesting',
    definition: 'The process by which employees earn the right to their stock options or grants over time, typically with a cliff and monthly vesting schedule.',
    learnMoreLesson: 'stage2-section3',
    learnMoreLessonTitle: 'Stage 2.3: Options & Vesting'
  },
  'strike price': {
    term: 'Strike Price',
    definition: 'The fixed price at which you can exercise (buy) your stock options, regardless of the current market value of the stock.',
    learnMoreLesson: 'stage2-section3',
    learnMoreLessonTitle: 'Stage 2.3: Options & Vesting'
  },
  'cliff': {
    term: 'Cliff',
    definition: 'A period of time (typically one year) during which no equity vests. If you leave before the cliff, you get no equity.',
    learnMoreLesson: 'stage2-section3',
    learnMoreLessonTitle: 'Stage 2.3: Options & Vesting'
  },

  // Advanced Terms
  'rsu': {
    term: 'RSU',
    definition: 'Restricted Stock Units - grants of company shares that vest over time. Unlike options, RSUs have value even if the stock price falls.',
    learnMoreLesson: 'stage3-section1',
    learnMoreLessonTitle: 'Stage 3.1: RSUs & Stock Grants'
  },
  'rsus': {
    term: 'RSUs',
    definition: 'Restricted Stock Units - grants of company shares that vest over time. Unlike options, RSUs have value even if the stock price falls.',
    learnMoreLesson: 'stage3-section1',
    learnMoreLessonTitle: 'Stage 3.1: RSUs & Stock Grants'
  },
  'capital gains': {
    term: 'Capital Gains',
    definition: 'The profit from selling an investment for more than you paid for it. Taxed differently depending on how long you held the investment.',
    learnMoreLesson: 'stage3-section2',
    learnMoreLessonTitle: 'Stage 3.2: Capital Gains & Taxes'
  },
  'espp': {
    term: 'ESPP',
    definition: 'Employee Stock Purchase Plan - allows employees to buy company stock at a discount, typically 15% off the market price.',
    learnMoreLesson: 'stage3-section3',
    learnMoreLessonTitle: 'Stage 3.3: Advanced Concepts'
  },
  '409a valuation': {
    term: '409A Valuation',
    definition: 'An independent appraisal of the fair market value of a private company\'s stock, required by the IRS for option pricing.',
    learnMoreLesson: 'stage2-section3',
    learnMoreLessonTitle: 'Stage 2.3: Options & Vesting'
  }
};

// Function to find jargon terms in text
export const findJargonTerms = (text: string): Array<{ term: string; data: JargonTerm }> => {
  const foundTerms: Array<{ term: string; data: JargonTerm }> = [];
  const lowerText = text.toLowerCase();
  
  Object.entries(JARGON_TERMS).forEach(([key, data]) => {
    if (lowerText.includes(key.toLowerCase())) {
      foundTerms.push({ term: key, data });
    }
  });
  
  return foundTerms;
};

// Function to wrap jargon terms in clickable spans
export const wrapJargonTerms = (text: string, onTermClick: (term: JargonTerm) => void): string => {
  let processedText = text;
  
  Object.entries(JARGON_TERMS).forEach(([key, data]) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    processedText = processedText.replace(regex, (match) => {
      return `<span class="jargon-term" data-term="${key}">${match}</span>`;
    });
  });
  
  return processedText;
};