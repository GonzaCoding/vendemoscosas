 
# Personal E-Commerce Implementation Guide

## Overview
This guide provides a structured approach to implementing the personal e-commerce site specification. Each prompt builds on previous ones, creating a cohesive development flow.

## Implementation Phases

### Phase 1: Project Setup & Foundation
1. Project scaffolding with Next.js
2. ShadcnUI integration
3. Basic file structure
4. Core theme setup
5. Type definitions

### Phase 2: Data Layer
1. Product types and interfaces
2. Data loading utilities
3. Mock product data
4. Basic state management

### Phase 3: Core Components
1. Layout structure
2. Basic header
3. Product card
4. Product list
5. Cart functionality

### Phase 4: Features & Interactions
1. Search & filtering
2. Product drawer
3. Cart management
4. WhatsApp integration
5. Dark mode

### Phase 5: Polish & Deploy
1. Animations & transitions
2. Error handling
3. Analytics
4. Performance optimization
5. Deployment

## Implementation Prompts

### Prompt 1: Project Scaffolding
```text
Create a new Next.js 14 project with TypeScript and App Router. Include:
1. Initial project setup with recommended Next.js configuration
2. ShadcnUI installation and basic setup
3. Core folder structure following the spec
4. Basic theme configuration (light/dark)
5. Initial tailwind.config.js setup

The response should include:
- Commands to run
- Key configuration files
- Basic folder structure

```
### Prompt 2: Type Definitions

```text
Create TypeScript interfaces and types for the e-commerce project. Include:
1. Product interface matching the JSON schema from the spec
2. Cart item type
3. Category type
4. Any shared utility types

Focus on:
- Type safety
- Reusability
- Following TypeScript best practices
```

### Prompt 3: Data Loading

```text
Create utilities for loading and managing product data. Include:
1. Product data loading function
2. Category extraction/management
3. Image path validation
4. Basic error handling

The code should:
- Handle the product JSON format from the spec
- Include error types
- Support filtering sold products
```
### Prompt 4: State Management

```text
Implement basic state management using React hooks. Create:
1. useProducts hook for product data
2. useCart hook for cart management
3. useCategory hook for category filtering
4. localStorage utilities for cart persistence

Ensure hooks are:
- Well-typed
- Include loading states
- Handle errors appropriately
```
### Prompt 5: Layout & Header

```text
Create the basic layout structure including:
1. Root layout with metadata
2. Header component with logo placeholder
3. Mobile-first responsive design
4. Container component for consistent padding

Use ShadcnUI components where appropriate and follow the mobile-first approach from the spec.
```
### Prompt 6: Product Display

```text
Create the product display components:
1. ProductCard component
2. ProductList component
3. Image handling with Next.js Image
4. Loading states
5. Basic error boundaries

Ensure:
- Mobile-first responsive grid
- Proper image optimization
- Accessibility
```
### Prompt 7: Cart Basic

```text
Implement basic cart functionality:
1. Cart context provider
2. Add to cart button
3. Cart badge with count
4. Basic cart storage in localStorage
5. Cart button animation

Focus on:
- Clean state management
- Proper TypeScript usage
- Smooth animations
```
### Prompt 8: Search & Filter

```text
Implement search and filtering functionality:
1. Search input component
2. Category filter dropdown
3. Combined filter logic
4. Result handling

Include:
- Debounced search
- Combined filter state
- Empty state handling
```
### Prompt 9: Product Drawer
```text
Create the product drawer component:
1. Drawer component using ShadcnUI
2. Image carousel
3. Product details layout
4. Add to cart integration
5. Mobile-optimized viewEnsure:
- Smooth animations
- Touch-friendly interactions
- Proper image handling
```

### Prompt 10: Cart & Checkout
```text
Implement the complete cart and checkout flow:
1. Cart page component
2. Item removal
3. WhatsApp message generation
4. Checkout confirmation modal
5. Handle sold items in cart

Include:
- Price calculations
- Message formatting
- Error states
```
### Prompt 11: Theme & Polish

```text
Add final UI polish:
1. Dark mode toggle
2. Theme persistence
3. Loading states
4. Toast notifications
5. Transition animations

Focus on:
- Consistent styling
- Smooth transitions
- User feedback
```
### Prompt 12: Analytics & Optimization

```text
Implement analytics and optimization:
1. Basic analytics setup
2. Event tracking
3. Performance optimization
4. Image optimization
5. Error boundary implementation

Include:
- Loading performance
- Error handling
- Analytics events
```
### Prompt 13: Deployment

```text
Prepare for deployment:
1. Environment configuration
2. Build optimization
3. Vercel configuration
4. Final testing checklist

Focus on:
- Production readiness
- Performance metrics
- Deployment verification
```

## Notes
- Each prompt builds on previous implementations
- Test each section before moving to the next
- Maintain TypeScript types throughout
- Follow mobile-first approach consistently
- Keep accessibility in mind from the start
- Commit code after each prompt's implementation## Best Practices
1. Write clean, maintainable code
2. Include proper error handling
3. Add comments for complex logic
4. Keep components focused and single-purpose
5. Follow TypeScript best practices
6. Test thoroughly between steps
7. Optimize for performance
8. Maintain consistent code style## Testing Checklist
- Functionality works on mobile devices
- Dark mode works correctly
- Cart persistence functions properly
- Images load optimally
- Search and filters work as expected
- WhatsApp integration functions correctly
- Animations are smooth
- Error states are handled gracefully
