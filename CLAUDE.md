# CLAUDE.md - Tax Chamber Hub Codebase Guide

## Project Overview

**Project Name**: Tax Chamber Hub
**Description**: A professional website for the Israeli Tax Advisors Chamber (לשכת יועצי המס בישראל)
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Firebase, Genkit AI
**Language**: Hebrew (RTL layout)
**Development Port**: 9002

This is a dual-area website featuring:
- **Public area**: Information, events, member directory
- **Private member portal**: Content library, profile management, inquiries

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Key Conventions](#key-conventions)
4. [Development Workflow](#development-workflow)
5. [Component Architecture](#component-architecture)
6. [Styling Guidelines](#styling-guidelines)
7. [Common Patterns](#common-patterns)
8. [Important Notes](#important-notes)
9. [Git Workflow](#git-workflow)

---

## Tech Stack

### Core Framework
- **Next.js 15.3.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **CSS Variables** - For theming support
- **RTL Support** - Right-to-left layout for Hebrew

### UI Components
- **shadcn/ui** - Composable component library built on Radix UI
- **Radix UI** - Headless UI components (Dialog, Dropdown, Select, etc.)
- **Lucide React** - Icon library
- **class-variance-authority** - Type-safe component variants
- **clsx + tailwind-merge** - Conditional class utilities

### Forms & Validation
- **React Hook Form 7.54.2** - Form state management
- **Zod 3.24.2** - Schema validation
- **@hookform/resolvers** - Form resolver integration

### AI Integration
- **Genkit 1.8.0** - Firebase AI toolkit
- **@genkit-ai/googleai** - Google AI plugin
- **@genkit-ai/next** - Next.js integration
- Model: **gemini-2.0-flash**

### Backend & Hosting
- **Firebase** - App hosting platform
- **Firebase App Hosting** - Deployment configuration

### Other Libraries
- **date-fns** - Date manipulation
- **recharts** - Chart library
- **react-day-picker** - Calendar component

---

## Project Structure

```
studio/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with RTL config
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles & CSS variables
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── content-library/     # Member content (restricted)
│   │   ├── events/              # Events listing
│   │   │   └── [eventId]/       # Dynamic event details
│   │   ├── faq/                 # FAQ section
│   │   ├── forgot-password/     # Password recovery
│   │   ├── inquiries/           # Member inquiries (restricted)
│   │   ├── login/               # Login page
│   │   ├── member-benefits/     # Member benefits
│   │   ├── member-directory/    # Member search directory
│   │   ├── member-registration/ # New member signup
│   │   ├── membership-renewal/  # Renewal process
│   │   └── profile/             # User profile (restricted)
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...              # 30+ UI primitives
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── SiteLayout.tsx   # Main layout wrapper
│   │   │   ├── AppHeader.tsx    # Top navigation
│   │   │   ├── AppSidebar.tsx   # Side navigation
│   │   │   └── AppFooter.tsx    # Footer
│   │   │
│   │   └── shared/              # Shared custom components
│   │       ├── SectionTitle.tsx
│   │       └── PlaceholderCard.tsx
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn helper)
│   │
│   └── ai/
│       ├── genkit.ts            # Genkit AI configuration
│       └── dev.ts               # AI development server
│
├── docs/
│   └── blueprint.md             # Project requirements & design
│
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── components.json              # shadcn/ui configuration
├── apphosting.yaml              # Firebase hosting config
└── package.json                 # Dependencies & scripts
```

---

## Key Conventions

### 1. Import Aliases

Use TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SiteLayout from '@/components/layout/SiteLayout';
```

**Available Aliases**:
- `@/*` → `./src/*`
- `@/components` → `./src/components`
- `@/ui` → `./src/components/ui`
- `@/lib` → `./src/lib`
- `@/hooks` → `./src/hooks`

### 2. File Naming

- **Components**: PascalCase (e.g., `SiteLayout.tsx`, `AppSidebar.tsx`)
- **Pages**: lowercase (Next.js convention: `page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Config files**: kebab-case with extensions (e.g., `next.config.ts`, `tailwind.config.ts`)

### 3. Component Structure

Follow this pattern for new components:

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props with TypeScript types
  className?: string;
  children?: React.ReactNode;
}

export default function ComponentName({
  className,
  children
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

### 4. RTL (Right-to-Left) Support

**CRITICAL**: This is a Hebrew website with RTL layout.

- Root layout sets: `<html lang="he" dir="rtl">`
- Use logical properties instead of directional:
  - ✅ `ms-4` (margin-inline-start) instead of `ml-4`
  - ✅ `me-4` (margin-inline-end) instead of `mr-4`
  - ✅ `start-0` instead of `left-0`
  - ✅ `end-0` instead of `right-0`
- Sidebar is positioned on the **right side**: `side="right"`
- Icons should align appropriately with RTL text flow

### 5. Radix UI `asChild` Pattern

**IMPORTANT**: The `asChild` prop is a Radix UI pattern but must be used carefully.

✅ **CORRECT** - Use `asChild` on Radix components:
```typescript
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

❌ **INCORRECT** - Never use `asChild` on regular HTML elements:
```typescript
// This causes errors!
<div asChild>content</div>
<a asChild href="#">link</a>
```

**Recent Fixes**: Multiple commits addressed `asChild` errors on DOM elements. Always check this when using shadcn/ui components.

### 6. TypeScript Configuration

- **Strict mode enabled**: All code must pass strict type checking
- **Build errors currently ignored**: `next.config.ts` has `ignoreBuildErrors: true`
- **ESLint ignored during builds**: `ignoreDuringBuilds: true`

**TODO for production**: Remove these ignores and fix all type/lint errors.

### 7. Styling with `cn()` Utility

Always use the `cn()` helper for conditional classes:

```typescript
import { cn } from '@/lib/utils';

className={cn(
  "base-class always-applied",
  condition && "conditional-class",
  anotherCondition ? "true-class" : "false-class",
  props.className // Allow external overrides
)}
```

---

## Development Workflow

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
# Runs on http://localhost:9002 with Turbopack
```

### Build & Type Checking

```bash
npm run build      # Next.js production build
npm run typecheck  # TypeScript validation (no emit)
npm run lint       # ESLint validation
```

### AI Development

```bash
npm run genkit:dev   # Start Genkit AI development server
npm run genkit:watch # Start with auto-reload
```

### Production

```bash
npm run start  # Start production server (after build)
```

---

## Component Architecture

### Layout System

**Three-Layer Layout Structure**:

1. **Root Layout** (`src/app/layout.tsx`)
   - Sets HTML lang/dir for RTL
   - Loads Google Fonts (Inter, Alegreya)
   - Wraps app in `SidebarProvider`
   - Includes global `Toaster` for notifications

2. **Site Layout** (`src/components/layout/SiteLayout.tsx`)
   - Contains `AppHeader` (top nav)
   - Logo section (centered)
   - Main content area with `Sidebar` + `SidebarInset`
   - `AppFooter`

3. **Page Content**
   - Each route's `page.tsx` renders inside `SiteLayout`

### Navigation

**AppSidebar** (`src/components/layout/AppSidebar.tsx`):
- Collapsible icon variant
- Right-side positioning (RTL)
- Conditional rendering based on authentication
- Two navigation groups:
  - **Public**: All users can see
  - **Member-only**: Requires authentication

**Current Routes**:

| Route | Public | Description |
|-------|--------|-------------|
| `/` | ✅ | Homepage |
| `/about` | ✅ | About the chamber |
| `/content-library` | ❌ | Professional content (members only) |
| `/events` | ✅ | Events listing |
| `/events/[eventId]` | ✅ | Event details |
| `/member-directory` | ✅ | Member search |
| `/member-benefits` | ✅ | Benefits overview |
| `/faq` | ✅ | FAQ section |
| `/contact` | ✅ | Contact form |
| `/login` | ✅ | Login page |
| `/member-registration` | ✅ | New member signup |
| `/membership-renewal` | ❌ | Renewal (members) |
| `/profile` | ❌ | Profile management (members) |
| `/inquiries` | ❌ | Personal inquiries (members) |

### shadcn/ui Components

**Installed Components** (30+):
- Layout: `card`, `separator`, `tabs`, `accordion`, `scroll-area`
- Forms: `button`, `input`, `select`, `checkbox`, `radio-group`, `slider`, `switch`, `form`, `label`
- Overlays: `dialog`, `popover`, `tooltip`, `alert-dialog`, `toast`
- Data: `table`, `badge`, `avatar`, `calendar`, `progress`, `chart`
- Navigation: `sidebar`, `menubar`, `dropdown-menu`

**Adding New Components**:
```bash
npx shadcn@latest add <component-name>
```

This automatically:
- Downloads component to `src/components/ui/`
- Updates `components.json`
- Applies proper path aliases

---

## Styling Guidelines

### Design Tokens

**From blueprint.md**:

```typescript
// tailwind.config.ts theme colors
Primary: Deep blue (#1E3A8A) - professionalism & trust
Background: Light gray (#F0F0F0) - clean & modern
Accent: Soft gold (#A89063) - highlights & CTAs, Judaica-inspired
```

**Custom Fonts**:
- **Body**: `Inter` (sans-serif) - Clean readability
- **Headline**: `Alegreya` (serif) - Elegant, intellectual

Use in components:
```typescript
className="font-body"     // Inter
className="font-headline" // Alegreya
```

### CSS Variables Theme

All colors use HSL CSS variables defined in `globals.css`:

```css
--background: ...
--foreground: ...
--primary: ...
--primary-foreground: ...
--accent: ...
--border: ...
--ring: ...
```

Access via Tailwind:
```typescript
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="border-border ring-ring"
```

### Dark Mode Support

Theme configured for dark mode:
```typescript
// tailwind.config.ts
darkMode: ['class']
```

Add dark mode variants:
```typescript
className="bg-white dark:bg-gray-900"
```

### Animations

Custom keyframes defined for:
- `accordion-down` / `accordion-up`

Use with:
```typescript
className="animate-accordion-down"
```

---

## Common Patterns

### 1. Creating a New Page

```typescript
// src/app/my-page/page.tsx
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SomeIcon } from 'lucide-react';

export default function MyPage() {
  return (
    <div className="space-y-12">
      <SectionTitle>
        <SomeIcon className="inline-block me-3 w-7 h-7" />
        כותרת הדף
      </SectionTitle>

      {/* Page content */}
    </div>
  );
}
```

### 2. Using Forms with Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email('כתובת אימייל לא תקינה'),
  name: z.string().min(2, 'שם חייב להכיל לפחות 2 תווים'),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', name: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">שלח</Button>
      </form>
    </Form>
  );
}
```

### 3. Image Optimization

Next.js Image component with approved remote patterns:

```typescript
import Image from 'next/image';

<Image
  src="https://placehold.co/600x400.png"
  alt="Description in Hebrew"
  width={600}
  height={400}
  priority // For LCP images
  data-ai-hint="context for AI image generation"
/>
```

**Allowed Remote Patterns**:
- `https://placehold.co/**`
- `http://www.ymas.org.il/**`

### 4. Authentication Check Pattern

```typescript
// In components/layout/AppSidebar.tsx
const isAuthenticated = false; // Placeholder

// Conditional rendering
{!item.public && !isAuthenticated ? null : (
  <MenuItem />
)}
```

**TODO**: Implement actual authentication logic (likely Firebase Auth).

### 5. Reusable Card Component

```typescript
import PlaceholderCard from '@/components/shared/PlaceholderCard';

<PlaceholderCard
  title="כותרת"
  description="תיאור"
  linkUrl="/path"
  category="קטגוריה"
  date="15.07.2024"
  imageUrl="https://placehold.co/400x250.png"
  imageHint="AI hint for image"
/>
```

### 6. Using Genkit AI

```typescript
// src/ai/genkit.ts
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

Use in API routes or server components as needed.

---

## Important Notes

### 1. Build Configuration Warnings

**Current State**:
```typescript
// next.config.ts
typescript: {
  ignoreBuildErrors: true, // ⚠️ TEMPORARY
},
eslint: {
  ignoreDuringBuilds: true, // ⚠️ TEMPORARY
},
```

**Action Required**: Before production deployment:
- [ ] Fix all TypeScript errors
- [ ] Fix all ESLint errors
- [ ] Remove these ignore flags

### 2. Authentication Not Implemented

Current authentication is mocked:
```typescript
const isAuthenticated = false; // Placeholder
```

**Action Required**:
- [ ] Implement Firebase Authentication
- [ ] Add session management
- [ ] Protect member-only routes
- [ ] Add role-based permissions (public, member, admin)

### 3. Payment Integration Pending

Blueprint mentions:
- Israeli payment gateways
- Credit cards & bank transfers
- Membership payments & renewals

**Action Required**:
- [ ] Research Israeli payment providers
- [ ] Integrate payment gateway
- [ ] Implement payment history
- [ ] Generate invoices

### 4. External Integrations Needed

**From blueprint.md**:
- [ ] Facebook feed integration (Latest Updates)
- [ ] Green Book link
- [ ] Email system for contact forms
- [ ] Welcome emails for new members
- [ ] Calendar integration for events

### 5. Content Management

All content is currently hardcoded in components. Consider:
- [ ] CMS integration (Sanity, Contentful, or Firestore)
- [ ] Admin interface for content editing
- [ ] Member directory database
- [ ] Event management system

### 6. Accessibility

Ensure RTL accessibility:
- [ ] Test with screen readers in Hebrew
- [ ] Keyboard navigation in RTL context
- [ ] ARIA labels in Hebrew
- [ ] Proper heading hierarchy

### 7. Performance Optimization

- [ ] Image optimization (all images currently placeholders)
- [ ] Lazy loading for member directory
- [ ] Code splitting for member-only sections
- [ ] Optimize bundle size (currently ~376KB package-lock)

---

## Git Workflow

### Branch Strategy

**Current Branch**: `claude/claude-md-mi3g6bwo00qs5hu8-01Kh1XEd2mNo61hg7fgBw7Yz`

All development should be done on feature branches starting with `claude/`.

### Commit Messages

Review recent commits for patterns:
```
git log --oneline -20
```

**Pattern Observed**: Descriptive commits focused on specific fixes:
- "error related to asChild appearing on a DOM element was not resolved"
- "Remove asChild from regular HTML elements"
- "make it larger"
- "place the logo on the top of the page in the middle"

**Best Practice**: Use conventional commits:
```
feat: add member directory search
fix: remove asChild from DOM elements
style: adjust logo size and positioning
refactor: extract reusable card component
docs: update CLAUDE.md with RTL guidelines
```

### Push Requirements

- Always use: `git push -u origin <branch-name>`
- Branch must start with `claude/` and match session ID
- Retry on network errors with exponential backoff (2s, 4s, 8s, 16s)

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev                  # Start dev server on :9002
npm run typecheck            # Check TypeScript errors
npm run lint                 # Run ESLint

# AI Development
npm run genkit:dev           # Start Genkit dev server
npm run genkit:watch         # Start with watch mode

# Build
npm run build                # Production build
npm run start                # Start production server
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, RTL config, global providers |
| `src/components/layout/SiteLayout.tsx` | Main site structure |
| `src/components/layout/AppSidebar.tsx` | Navigation menu |
| `tailwind.config.ts` | Design tokens, colors, fonts |
| `components.json` | shadcn/ui configuration |
| `docs/blueprint.md` | Project requirements |
| `next.config.ts` | Next.js configuration |

### Environment Setup

Create `.env.local` for:
```env
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# Add other Firebase config...

# Google AI (for Genkit)
GOOGLE_API_KEY=
```

(Currently no .env files in repo - add as needed)

---

## AI Assistant Guidelines

When making changes to this codebase:

1. **Always respect RTL layout** - Use logical properties (`ms-`, `me-`, `start-`, `end-`)
2. **Never add `asChild` to HTML elements** - Only use on Radix/shadcn components
3. **Use path aliases** - `@/` imports are preferred
4. **Follow Hebrew text conventions** - All UI text should be in Hebrew
5. **Maintain consistency** - Match existing component patterns
6. **Type safety** - Add proper TypeScript types for all components
7. **Accessibility** - Ensure RTL-friendly ARIA labels
8. **Test builds** - Run `npm run typecheck` before committing
9. **Document changes** - Update this CLAUDE.md if adding new patterns
10. **Check the blueprint** - Reference `docs/blueprint.md` for feature requirements

### Before Creating New Components

1. Check if shadcn/ui has a suitable component: `npx shadcn@latest add`
2. Check `src/components/shared/` for existing reusable components
3. Follow the established file structure
4. Use the `cn()` utility for className management
5. Export as default, not named export (Next.js convention)

### When Debugging

Common issues and solutions:
- **asChild errors**: Remove from HTML elements, only use on Radix components
- **Import errors**: Check path alias configuration in `tsconfig.json`
- **RTL issues**: Use logical properties instead of left/right
- **Type errors**: Check if ignoring build errors is masking real issues
- **Icon alignment**: Use `me-` (margin-end) for RTL icon spacing

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS RTL Support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [Firebase Genkit](https://firebase.google.com/docs/genkit)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

**Last Updated**: 2025-11-17
**Maintainer**: Claude AI Assistant
**Project Status**: Active Development
**Production Ready**: No (see Important Notes section)
