export interface LessonSubsection {
  id: string;
  title: string;
  content: string;
  type: 'content' | 'quiz';
}

export const parseLessonIntoSubsections = (content: string, lessonId: string): LessonSubsection[] => {
  const sections: LessonSubsection[] = [];
  
  // Split by markdown headers (##)
  const parts = content.split(/(?=^## )/m);
  
  // First part usually contains the main title, keep it as overview
  if (parts[0] && parts[0].trim()) {
    const firstPart = parts[0].trim();
    // Extract title from first line (currently unused)
    // const titleMatch = firstPart.match(/^# (.+)$/m);
    // const title = titleMatch ? titleMatch[1] : 'Overview';
    
    sections.push({
      id: 'overview',
      title: 'Overview',
      content: firstPart,
      type: 'content'
    });
  }
  
  // Process remaining sections
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;
    
    // Extract section title
    const titleMatch = part.match(/^## (.+)$/m);
    if (!titleMatch) continue;
    
    const title = titleMatch[1];
    const sectionId = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Skip mini-game sections - we'll handle those separately as quiz
    if (title.toLowerCase().includes('mini-game') || title.toLowerCase().includes('quiz')) {
      continue;
    }
    
    sections.push({
      id: sectionId,
      title: title,
      content: part,
      type: 'content'
    });
  }
  
  // Add quiz as final section
  sections.push({
    id: 'quiz',
    title: 'Knowledge Check',
    content: '',
    type: 'quiz'
  });
  
  return sections;
};

// Predefined lesson structures for better UX
export const getLessonStructure = (lessonId: string): LessonSubsection[] => {
  switch (lessonId) {
    case 'stage1-section1':
      return [
        {
          id: 'overview',
          title: 'Overview',
          content: `# What is Investing?

Investing means putting your money into something with the hope that it will grow over time. You can invest in things like stocks, bonds, real estate, or even your own business.

**Example:**
If you put $100 in a savings account with 2% interest, after one year you'll have $102. If you invest $100 in stocks and they grow by 10%, you'll have $110 after one year. But stocks can also lose value, so you might end up with less than $100.`,
          type: 'content'
        },
        {
          id: 'why-invest',
          title: 'Why Do People Invest?',
          content: `## Why Do People Invest?
People invest to grow their wealth, save for the future, and reach financial goals like buying a house or retiring comfortably.

**Example:**
If you invest $5,000 every year for 20 years and earn an average return of 7% per year, you could have over $200,000 by the end, thanks to compounding.`,
          type: 'content'
        },
        {
          id: 'key-concepts',
          title: 'Key Concepts',
          content: `## Key Concepts
- **Assets:** Things you own that have value (like stocks, cash, or property).
- **Risk vs. Reward:** Higher rewards often come with higher risks. Safer investments usually grow slower.
- **Compounding:** Earning money on both your original investment and the money it has already earned.

**Example:**
If you earn 5% on $100, you get $5. Next year, you earn 5% on $105, which is $5.25. Over time, this adds up!`,
          type: 'content'
        },
        {
          id: 'compounding-example',
          title: 'The Power of Compounding',
          content: `## The Power of Compounding

**Timeline Example:**
Let's say you invest $1,000 and earn 7% per year:
- Year 1: $1,070
- Year 2: $1,144.90
- Year 3: $1,225.04
- Year 4: $1,310.79
- Year 5: $1,402.55
- Year 10: $1,967.15
- Year 20: $3,869.68

You started with $1,000. After 20 years, you have $3,869.68. You earned an extra $2,869.68 just for doing nothing—your money worked for you!

If you started with $5,000, after 20 years at 7% per year, you would have $19,348.41. That's an extra $14,348.41 earned passively!`,
          type: 'content'
        },
        {
          id: 'quiz',
          title: 'Knowledge Check',
          content: '',
          type: 'quiz'
        }
      ];
      
    case 'stage1-section2-public':
      return [
        {
          id: 'overview',
          title: 'Overview',
          content: `# Public vs. Private Companies

Understanding the difference between public and private companies is crucial for investors. This affects how you can buy shares, how liquid your investment is, and what information is available.`,
          type: 'content'
        },
        {
          id: 'public-companies',
          title: 'Public Companies',
          content: `## Public Companies

Public companies have shares that anyone can buy and sell on stock exchanges like the NYSE or NASDAQ.

**Examples:** Apple, Microsoft, Google, Amazon

**Key Features:**
- Shares trade on public stock exchanges
- Anyone can buy shares during market hours
- Must publish financial reports (transparency)
- High liquidity - easy to buy/sell quickly`,
          type: 'content'
        },
        {
          id: 'private-companies',
          title: 'Private Companies',
          content: `## Private Companies

Private companies are owned by a small group of people and don't sell shares to the general public.

**Examples:** SpaceX, Stripe, many startups

**Key Features:**
- Shares not available to general public
- Limited transparency requirements
- Lower liquidity - harder to sell shares
- May offer higher growth potential`,
          type: 'content'
        },
        {
          id: 'going-public',
          title: 'Going Public (IPO)',
          content: `## Going Public (IPO)

An Initial Public Offering (IPO) is when a private company first sells shares to the public.

**Why companies go public:**
- Raise capital for growth
- Provide liquidity for early investors
- Increase brand visibility

**Famous IPOs:** Facebook (2012), Uber (2019), Airbnb (2020)`,
          type: 'content'
        },
        {
          id: 'quiz',
          title: 'Knowledge Check',
          content: '',
          type: 'quiz'
        }
      ];

    case 'stage2-section1-lifecycle':
      return [
        {
          id: 'overview',
          title: 'Overview',
          content: `# Startup Lifecycle

Understanding how startups grow and raise funding is crucial for anyone working at or investing in startups. This lesson covers the funding journey from seed to exit.`,
          type: 'content'
        },
        {
          id: 'startup-growth',
          title: 'How Do Startups Grow?',
          content: `## How Do Startups Grow?

Startups usually begin with an idea and a small team. They raise money in stages to grow their business.

**Example:**
A startup might raise $100,000 from friends and family (seed round), then $2 million from investors (Series A), and later $10 million (Series B) as it grows.

## Why Raise More Funding?

Even if a company is profitable after the seed round, it might want to raise more money to:
- Hire more employees
- Build new products or features
- Expand into new markets
- Invest in marketing and sales
- Outpace competitors

**Example:**
A startup making $50,000 profit per year could use Series A funding to hire a sales team, launch in new cities, or develop new technology. This could help the company grow much faster than relying only on profits.`,
          type: 'content'
        },
        {
          id: 'funding-effects',
          title: 'What Happens When You Raise Funds?',
          content: `## What Happens When You Raise Funds?

Raising funds means selling shares (ownership) in the company to new investors. This gives away part of the company, so founders and early investors own less.

**Effect on Founders:**
- Founders' ownership percentage goes down (dilution)
- But, if the company grows, their smaller piece can be worth much more
- Founders may lose some control if they give away too much ownership

**Example:**
If a founder owns 60% after seed, but raises Series A and Series B, they might end up with 30%. If the company is worth $10 million, their 30% is $3 million—much more than their original 60% of a smaller company.`,
          type: 'content'
        },
        {
          id: 'funding-rounds',
          title: 'Funding Rounds Explained',
          content: `## Funding Rounds Explained

### Seed Round
- **Who invests?** Friends, family, angel investors, and sometimes early-stage venture capital funds.
- **What do they get?** Shares or convertible notes (which can turn into shares later).
- **Upside:** If the company succeeds, early investors can see huge returns (sometimes 100x or more).
- **Risk:** Most startups fail, so seed investors can lose all their money.
- **Dilution:** As the company raises more money, seed investors' ownership percentage can shrink unless they invest more.

### Moving to Series A
- **When?** After the startup shows some traction (users, revenue, product-market fit).
- **Who invests?** Venture capital firms.
- **What happens?** The company raises a larger amount (e.g., $2 million) to grow faster.
- **Upside:** Series A investors get shares at a lower price than later rounds, so they have good upside if the company grows.
- **Risk:** Still high risk, but the company is less likely to fail than at seed stage.
- **Seed Investors:** Their shares are diluted, but they still own a piece of the company. If the company succeeds, their shares can be very valuable.

### Series B and Beyond
- **Who invests?** Larger venture capital firms, sometimes growth equity funds.
- **What happens?** The company raises even more money (e.g., $10 million) to scale up.
- **Upside:** Series B investors get shares at a higher price, so their upside is lower than earlier investors, but still significant.
- **Risk:** The company is more established, so risk is lower, but not zero.
- **Seed and Series A Investors:** Their ownership is diluted further, but their shares are worth more if the company is growing.`,
          type: 'content'
        },
        {
          id: 'dilution-exits',
          title: 'Dilution and Exits',
          content: `## Dilution and Exits

### Dilution
Every time new shares are issued in a funding round, existing investors own a smaller percentage of the company. However, if the company grows, their smaller piece can be worth much more.

### Can Early Investors Exit?
- Usually, early investors cannot sell their shares until an exit event (acquisition or IPO).
- Sometimes, in later rounds, the company allows some early investors to sell a portion of their shares in a "secondary sale."

**Key Takeaway:** While dilution reduces your ownership percentage, a smaller slice of a much bigger pie can be worth significantly more than a larger slice of a smaller pie.`,
          type: 'content'
        },
        {
          id: 'quiz',
          title: 'Knowledge Check',
          content: '',
          type: 'quiz'
        }
      ];
      
    default:
      // For lessons not yet implemented, show coming soon message
      return [
        {
          id: 'overview',
          title: 'Coming Soon',
          content: `# This Lesson is Coming Soon!

We're working hard to bring you this content. This lesson will cover important concepts about investing and equity.

## What to do next:
- Complete the available lessons first
- Check back soon for updates
- The lessons are being built in order, so earlier stages will be available first

## Available Lessons:
- ✅ **Stage 1.1: What is Investing?** - Learn the basics of investing and compounding
- ✅ **Stage 1.2: Public vs. Private Companies** - Understand different types of companies

More lessons coming soon!`,
          type: 'content'
        }
      ];
  }
};