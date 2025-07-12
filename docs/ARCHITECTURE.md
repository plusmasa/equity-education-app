# Architecture Documentation

## Project Overview
Equity Education Web App - An interactive learning platform for equity, investing, and startup compensation concepts.

## Tech Stack
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with Wealthfront-inspired design system
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Content**: Markdown files loaded from `/public/curriculum/`
- **State Management**: React hooks (localStorage for persistence)
- **Testing**: Jest + React Testing Library (built-in)

## Architecture Decisions

### Content Strategy
- **Decision**: Store curriculum as static markdown files in `/public/curriculum/`
- **Rationale**: 
  - No backend required for MVP
  - Easy content updates
  - Works with static hosting (Vercel)
  - Simple development workflow
- **Trade-offs**: No real-time content updates, but fits project requirements

### Jargon Term Sidepanel UX
- **Decision**: Clickable jargon terms open explanatory sidepanels
- **Implementation**: 
  - Terms are hyperlinked within lesson content
  - Sidepanel shows definition + "learn more in [lesson]" message
  - Non-clickable lesson references to encourage completion of current lesson
- **Rationale**: Addresses curriculum density issues while maintaining learning flow

### State Management
- **Decision**: React hooks + localStorage for user progress
- **Rationale**: 
  - Single-user app, no authentication needed
  - Persists across browser sessions
  - Simple implementation
  - Can migrate to backend later if needed

### Design System
- **Decision**: Wealthfront-inspired clean, modern design
- **Implementation**: 
  - Custom Tailwind config with branded colors
  - Inter font family
  - Soft shadows and clean layouts
  - Professional financial services aesthetic

## File Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout with sidebar
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── JargonSidepanel.tsx  # Jargon term explanations
│   └── DebugPanel.tsx  # Development debugging tools
├── pages/              # Route components
│   ├── Dashboard.tsx   # Home/progress overview
│   └── LessonPage.tsx  # Lesson content viewer
├── hooks/              # Custom React hooks (future)
├── utils/              # Utility functions (future)
├── types/              # TypeScript type definitions
│   └── index.ts       # Core app types
└── App.tsx            # Main app component with routing

public/
└── curriculum/        # Markdown lesson files
    ├── Stage1_Section1_WhatIsInvesting.md
    └── ... (all curriculum files)
```

## Component Architecture

### Layout Component
- Provides consistent app structure
- Includes sidebar navigation
- Renders jargon sidepanel
- Uses React Router's Outlet for page content

### Jargon Sidepanel System
- **Trigger**: Clickable terms in lesson content
- **Animation**: Framer Motion slide-in from right
- **Content**: Term definition + lesson reference
- **UX Goal**: Help novices understand jargon without disrupting lesson flow

### Debug Panel
- **Purpose**: Development tool for inspecting app state
- **Features**: App state, errors, loaded content tabs
- **Access**: Floating button (bottom-right)
- **Production**: Should be disabled or protected

## Data Flow

### Content Loading
1. User navigates to lesson route
2. LessonPage component extracts lesson ID from URL
3. Maps lesson ID to markdown filename
4. Fetches content from `/public/curriculum/[filename].md`
5. Renders content using ReactMarkdown

### Progress Tracking (Future)
1. User completes lesson/quiz/minigame
2. Progress stored in localStorage
3. Dashboard reads progress for display
4. Sidebar shows completion status

## Development Workflow

### Content Updates
1. Edit markdown files in `/public/curriculum/`
2. Refresh browser to see changes
3. No build step required for content updates

### Component Development
1. Create component in appropriate `/src/` folder
2. Export from index files for clean imports
3. Use TypeScript for type safety
4. Follow Tailwind design system patterns

### Testing Strategy
- Unit tests for utility functions
- Component tests for UI logic
- Integration tests for user flows
- No E2E tests for MVP (add later if needed)

## Performance Considerations

### Content Loading
- Markdown files are small (<50KB each)
- Loaded on-demand per lesson
- Browser caching handles repeat visits
- Consider bundling if performance becomes issue

### Bundle Size
- Tree-shaking enabled by default
- Framer Motion adds ~50KB (acceptable for animations)
- React Router DOM v7 is lightweight
- Monitor with webpack-bundle-analyzer if needed

## Future Enhancements

### Phase 2 Considerations
- **Backend Migration**: Consider if user accounts/sync needed
- **Content Management**: CMS for non-technical content updates
- **Analytics**: Track learning progress and engagement
- **Mobile App**: React Native using shared components

### Scalability
- Current architecture supports 100+ lessons
- Jargon system can handle 500+ terms
- LocalStorage sufficient for single-user progress
- Component architecture supports feature expansion

## Deployment

### Vercel Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `build/`
- **Node Version**: 18+
- **Static Files**: Curriculum served from `public/`

### Environment Variables
- None required for MVP
- Future: API keys, analytics tokens

## Changelog
- **July 12, 2025**: Initial architecture established
- **July 12, 2025**: Jargon sidepanel UX system designed
- **July 12, 2025**: Wealthfront-inspired design system implemented