# Equity Education App

An interactive web application for learning equity, investing, and startup compensation concepts through bite-sized lessons and engaging minigames.

## 🚀 Features

- **Progressive Learning**: 5 stages from basic investing concepts to advanced equity compensation
- **Interactive Lessons**: Markdown-based content with dynamic loading
- **Jargon Sidepanel**: Clickable terms with explanations and lesson references
- **Wealthfront-inspired Design**: Clean, professional UI with modern animations
- **Debug Tools**: Development panel for monitoring app state and content loading

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Content**: Static markdown files
- **State**: React hooks + localStorage

## 🏗️ Architecture

The app follows a modular component architecture:

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components  
├── types/         # TypeScript definitions
└── docs/          # Architecture documentation
```

## 🎯 Learning Stages

1. **Foundations of Investing** - Assets, risk/reward, public vs private companies
2. **Startup Investing** - Lifecycle, shares, dilution, options, exits
3. **Public Company Compensation** - RSUs, capital gains, advanced concepts
4. **Real-World Scenarios** - Case studies and portfolio building
5. **Review & Mastery** - Challenge mode and resources

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/plusmasa/equity-education-app.git
cd equity-education-app

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000
```

## 📱 Development

- **Debug Panel**: Click the floating button (bottom-right) to inspect app state
- **Content Updates**: Edit markdown files in `public/curriculum/` 
- **Hot Reload**: Changes reflect immediately in development

## 🎨 Design System

Inspired by Wealthfront's clean, professional aesthetic:
- **Colors**: Blue primary palette with green accents
- **Typography**: Inter font family
- **Components**: Consistent spacing and soft shadows

## 📖 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md) - Detailed technical documentation
- [Milestones](../Milestones.md) - Project progress tracking

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment

The app is configured for deployment on Vercel:

```bash
npm run build
```

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is an educational project. See [Milestones](../Milestones.md) for current development status.

---

Built with ❤️ for financial education