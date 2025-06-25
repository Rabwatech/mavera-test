# قاعة مافيرا - Mavera Hall

A premium event venue website built with Next.js, following **Rabwa's Enhanced Clean Code Standards** for maintainable, scalable, and human-readable code.

## 🏗️ Architecture Overview

This project implements a comprehensive clean code architecture with the following key principles:

### Core Clean Code Philosophy
- **Readable, understandable, and modifiable code**
- **Single responsibility components** (max 50 lines)
- **Descriptive naming conventions** with clear business context
- **Strategic documentation** with JSDoc comments
- **DRY principles** with smart abstraction

### File Organization
```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom hooks with Greek prefixes
├── lib/                   # Core utilities and constants
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
    ├── styling/           # CSS composition utilities
    └── validation/        # Form validation utilities
```

## 🎯 Key Features

### 1. Custom Hooks with Greek Prefixes
Following Rabwa's signature style, we use Greek letter prefixes for custom hooks:

- `useΦApplicationInitialization` - Application lifecycle management
- `useΨNavigationAnalytics` - Navigation and user interaction tracking

### 2. DRY Validation System
Comprehensive validation utilities that eliminate repetition:

```typescript
// Predefined validators
const validateEmail = createCompositeValidator(
  createRequiredValidator<string>('Email address is required'),
  createPatternValidator(VALIDATION_PATTERNS.email, 'Please enter a valid email address')
)

// Custom validators
const validatePassword = createPasswordValidator(PASSWORD_REQUIREMENTS)
```

### 3. Tailwind CSS Composition
Smart CSS class composition to avoid repetition:

```typescript
// Responsive class composers
const buttonClasses = createStateComposer(
  'inline-flex items-center justify-center rounded-md...',
  {
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:ring-2 focus:ring-primary-500',
    active: 'active:scale-95'
  }
)

// Usage
className={buttonClasses({ isHovered: true, isFocused: false })}
```

### 4. Comprehensive Logging System
Structured logging with different levels and contexts:

```typescript
// Detailed logging with context
logger.info('Navigation event completed', {
  component: 'useΨNavigationAnalytics',
  eventType: 'page_view',
  context: navigationContext,
  timestamp: new Date().toISOString()
}, 'user_action')
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 📁 Project Structure

### Components
- **Layout Components**: `Navbar`, `Footer`, `Sidebar`
- **Section Components**: `HeroSection`, `AboutSection`, `ServicesSection`
- **UI Components**: Reusable components with consistent styling

### Hooks
- **Application Hooks**: Lifecycle management and initialization
- **Analytics Hooks**: User interaction and navigation tracking
- **Feature Hooks**: Domain-specific functionality

### Utilities
- **Styling**: Tailwind CSS composition and responsive design
- **Validation**: Form validation with comprehensive error handling
- **Logging**: Structured logging with performance monitoring

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main branding
- **Secondary**: Complementary colors for accents
- **Neutral**: Grays for text and backgrounds

### Typography
- **Arabic**: Primary language with RTL support
- **English**: Secondary language for international users
- **Responsive**: Scalable typography across devices

### Components
- **Consistent Styling**: Unified design language
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design approach

## 📊 Analytics & Performance

### User Analytics
- **Navigation Tracking**: Page views and user journeys
- **Interaction Analytics**: Button clicks and form submissions
- **Performance Monitoring**: Load times and resource usage

### Performance Optimization
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Caching**: Strategic caching for better performance

## 🔧 Development Guidelines

### Code Quality Standards
1. **Descriptive Naming**: Variables and functions explain purpose
2. **Single Responsibility**: Each function/component has one purpose
3. **Documentation**: JSDoc comments for all public interfaces
4. **Error Handling**: Comprehensive try-catch blocks
5. **Type Safety**: Full TypeScript implementation

### File Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Hooks**: Greek prefix + PascalCase (e.g., `useΦApplicationInitialization.ts`)
- **Utilities**: camelCase (e.g., `createValidator.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `VALIDATION_PATTERNS`)

### Component Structure
```typescript
/**
 * Component description with clear purpose
 * Provides specific functionality and usage context
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Custom hooks for business logic
  const { data, loading } = useCustomHook()
  
  // Event handlers with descriptive names
  const handleUserInteraction = useCallback(async () => {
    // Implementation with clear business logic
  }, [])
  
  return (
    // JSX with semantic HTML and accessibility
  )
}
```

## 🧪 Testing Strategy

### Unit Testing
- **Component Testing**: React Testing Library
- **Hook Testing**: Custom hook testing utilities
- **Utility Testing**: Jest for utility functions

### Integration Testing
- **Page Testing**: Full page rendering tests
- **Navigation Testing**: User journey validation
- **Form Testing**: Complete form submission flows

## 📈 Performance Metrics

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Analysis
- **JavaScript Bundle**: Optimized with code splitting
- **CSS Bundle**: Purged unused styles
- **Image Assets**: Optimized and responsive

## 🔒 Security Considerations

### Input Validation
- **Client-side**: Real-time validation feedback
- **Server-side**: Comprehensive validation rules
- **Sanitization**: XSS prevention and data cleaning

### Authentication
- **Session Management**: Secure session handling
- **Authorization**: Role-based access control
- **Data Protection**: Encryption for sensitive data

## 🌐 Internationalization

### Language Support
- **Arabic**: Primary language with RTL layout
- **English**: Secondary language support
- **Localization**: Date, number, and currency formatting

### RTL Support
- **Layout Direction**: Automatic RTL detection
- **Text Alignment**: Proper Arabic text rendering
- **Navigation**: RTL-aware navigation patterns

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- **Touch Targets**: Minimum 44px touch areas
- **Navigation**: Mobile-optimized navigation
- **Performance**: Optimized for mobile networks

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
DATABASE_URL=your-database-url
```

## 🤝 Contributing

### Development Workflow
1. **Feature Branch**: Create feature branch from main
2. **Code Review**: Submit pull request for review
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update documentation as needed

### Code Review Checklist
- [ ] Follows clean code principles
- [ ] Includes proper documentation
- [ ] Passes all tests
- [ ] Meets performance requirements
- [ ] Includes accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rabwa AI Editor**: For the comprehensive clean code standards
- **Next.js Team**: For the excellent framework
- **Tailwind CSS**: For the utility-first CSS framework
- **TypeScript**: For type safety and developer experience

---

**Built with ❤️ following Rabwa's Enhanced Clean Code Standards** 