# PixelGenesis - Verification UI Design Guide

Complete visual design documentation for all verification-related UI components.

---

## 📋 Table of Contents
1. [Upload Page with Verification Request](#1-upload-page-with-verification-request)
2. [Organization Verification Dashboard](#2-organization-verification-dashboard)
3. [Shadcn Components](#3-shadcn-components)
4. [VerificationRequestCard Component](#4-verificationrequestcard-component)
5. [Color Palette & Theme](#5-color-palette--theme)
6. [Responsive Behavior](#6-responsive-behavior)

---

## 1. Upload Page with Verification Request

**Route:** `/wallet/upload`

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                      NAVBAR                              │
│  PixelGenesis | Dashboard | Wallet | Verify | Profile  │
└─────────────────────────────────────────────────────────┘
│                                                          │
│  ← Back to Wallet                                       │
│                                                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │  📄 Upload Document                                │ │
│  │  Add a new credential to your decentralized vault │ │
│  │                                                    │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  📤  Drop your document here               │ │ │
│  │  │       or click to browse                   │ │ │
│  │  │                                            │ │ │
│  │  │      [Select File]                        │ │ │
│  │  │                                            │ │ │
│  │  │  Supported: PDF, JPG, PNG (Max 10MB)      │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │  Document Type *                                   │ │
│  │  [ Academic (Degrees, Certificates) ▼ ]           │ │
│  │                                                    │ │
│  │  Document Name *                                   │ │
│  │  [e.g., Bachelor's Degree Certificate____]        │ │
│  │                                                    │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │ ☑ Send verification request to issuing     │ │ │
│  │  │   organization                              │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │  Issuer Name *                                     │ │
│  │  [e.g., MIT Registrar__________________]          │ │
│  │                                                    │ │
│  │  Issuer Organization *                             │ │
│  │  [e.g., Massachusetts Institute of Technology]    │ │
│  │                                                    │ │
│  │  Issuer Email (Optional)                           │ │
│  │  [e.g., registrar@mit.edu______________]          │ │
│  │                                                    │ │
│  │  Issue Date (Optional)                             │ │
│  │  [DD/MM/YYYY]                                      │ │
│  │                                                    │ │
│  │  Description (Optional)                            │ │
│  │  ┌───────────────────────────────────────────┐   │ │
│  │  │ Add any additional notes...               │   │ │
│  │  │                                           │   │ │
│  │  └───────────────────────────────────────────┘   │ │
│  │                                                    │ │
│  │  [Cancel]              [📤 Upload Document]       │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ℹ️ How it works                                   │ │
│  │  🔒 Your document will be encrypted before upload │ │
│  │  📦 Stored on IPFS                                │ │
│  │  🔗 Unique CID generated                          │ │
│  │  ✅ Verifiable Credential created                 │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Visual Design Elements

#### File Upload Zone
```css
Default State:
- Border: 2px dashed, muted-foreground/25
- Background: transparent
- Hover: border-muted-foreground/50
- Padding: 2rem (32px)

Drag Active State:
- Border: 2px dashed, primary color
- Background: primary/5
- Animated pulse effect

File Selected State:
- Background: muted
- Display file name, size
- Show remove (X) button
```

#### Verification Request Checkbox Section
```css
Container:
- Background: muted/50
- Border: 1px solid border
- Border-radius: 0.5rem (8px)
- Padding: 1rem (16px)

Checkbox:
- Size: 16px × 16px
- Accent color from theme

Label:
- Cursor: pointer
- Font-weight: medium
```

#### Dynamic Form Fields
- **Conditional Display:** Fields only appear when checkbox is checked
- **Animation:** Smooth height transition (200ms)
- **Layout:** Full width, stacked vertically

---

## 2. Organization Verification Dashboard

**Route:** `/organization/verifications`

### Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│                         NAVBAR                              │
│  PixelGenesis | Dashboard | Wallet | Verify | Verifications│
└────────────────────────────────────────────────────────────┘
│                                                             │
│  📋 Document Verifications                                  │
│  Review and verify document authenticity requests           │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ ⏱️ Pending    │ │ ✅ Approved   │ │ ❌ Rejected   │      │
│  │     5        │ │     12       │ │     3        │      │
│  │ Awaiting     │ │ Verified     │ │ Invalid      │      │
│  └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐│
│  │  🔍 Filters                            [🔄 Refresh]   ││
│  │                                                        ││
│  │  🔎 Search              Status              Org       ││
│  │  [Search docs...] [All Statuses ▼] [Filter by org]  ││
│  └───────────────────────────────────────────────────────┘│
│                                                             │
│  ┌───────────────────────────────────────────────────────┐│
│  │ 📄 Bachelor of Science Degree    [Academic] [⏱️Pending]││
│  │                                                        ││
│  │ Computer Science degree certificate                    ││
│  │                                                        ││
│  │ 👤 Issuer: MIT Registrar                              ││
│  │ 🏢 Org: Massachusetts Institute of Technology         ││
│  │ 📧 Email: registrar@mit.edu                           ││
│  │ 📅 Submitted: Jan 10, 2025 at 10:00 AM               ││
│  │                                                        ││
│  │ 📨 Submitted by: student@example.com                  ││
│  │                                                        ││
│  │                      [Review Request]                  ││
│  │                                                        ││
│  │  ▼ Verification Notes (Optional)                      ││
│  │  ┌────────────────────────────────────────────────┐  ││
│  │  │ Add notes...                                   │  ││
│  │  └────────────────────────────────────────────────┘  ││
│  │  [✅ Approve]  [❌ Reject]  [Cancel]                 ││
│  └───────────────────────────────────────────────────────┘│
│                                                             │
│  ┌───────────────────────────────────────────────────────┐│
│  │ 🎓 Professional Certificate   [Prof] [✅ Approved]    ││
│  │                                                        ││
│  │ ✅ Verification Notes:                                ││
│  │ "Verified successfully"                               ││
│  │ Verified on Jan 11, 2025 at 2:30 PM                  ││
│  └───────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────┘
```

### Statistics Cards Design

```
┌─────────────────────┐
│  ⏱️ Pending          │
│                     │
│      5              │  ← Large number, bold
│                     │
│  Awaiting review    │  ← Small muted text
└─────────────────────┘

Colors:
- Pending: Yellow/Orange theme (text-yellow-600 dark:text-yellow-400)
- Approved: Green theme (text-green-600 dark:text-green-400)
- Rejected: Red theme (text-red-600 dark:text-red-400)

Layout:
- Card padding: 1.5rem (24px)
- Icon size: 3rem (48px)
- Number size: 3xl (30px)
- Border: 1px solid border
- Shadow: sm
```

### Filters Section Design

```css
Container:
- Background: card
- Border: 1px solid border
- Border-radius: 0.75rem (12px)
- Padding: 1.5rem (24px)

Layout: 3-column grid (md), 1-column (mobile)
- Gap: 1rem (16px)

Search Input:
- Icon: magnifying glass (absolute left)
- Padding-left: 2.5rem (40px) for icon
- Placeholder: "Search documents..."

Select Dropdown:
- Native select with custom styling
- Options: All Statuses, Pending, Approved, Rejected

Filter Input:
- Placeholder: "Filter by organization..."
- Real-time filtering
```

---

## 3. Shadcn Components

### Badge Component

```typescript
Variants:
┌─────────────────────────────────────────┐
│ [Default Badge]     - Primary color     │
│ [Secondary Badge]   - Secondary color   │
│ [Destructive Badge] - Red/Danger        │
│ [Outline Badge]     - Border only       │
│ [Success Badge]     - Green             │
│ [Warning Badge]     - Yellow/Orange     │
└─────────────────────────────────────────┘

Design Specs:
- Border-radius: 9999px (fully rounded)
- Padding: 0.125rem 0.625rem (2px 10px)
- Font-size: 0.75rem (12px)
- Font-weight: 600 (semibold)
- Display: inline-flex
- Align-items: center
```

**Status Badge Examples:**

```
✅ Verified     - bg-green-100 text-green-800 dark:bg-green-900/30
⏱️ Pending      - bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30
❌ Rejected     - bg-red-100 text-red-800 dark:bg-red-900/30
📄 Academic     - border only, outline variant
```

### Textarea Component

```typescript
Design Specs:
- Min-height: 80px
- Border: 1px solid input
- Border-radius: 0.375rem (6px)
- Padding: 0.5rem 0.75rem (8px 12px)
- Font-size: 0.875rem (14px)
- Background: background
- Resize: vertical

Focus State:
- Outline: none
- Ring: 2px offset-2 ring color
- Ring-color: ring (from theme)

Disabled State:
- Cursor: not-allowed
- Opacity: 50%
```

**Usage Example:**
```jsx
<Textarea 
  placeholder="Add verification notes..."
  rows={3}
  className="w-full"
/>
```

### Select Component

```typescript
Design Specs:
- Height: 40px (h-10)
- Border: 1px solid input
- Border-radius: 0.375rem (6px)
- Padding: 0.5rem 0.75rem (8px 12px)
- Font-size: 0.875rem (14px)
- Background: background

Focus State:
- Outline: none
- Ring: 2px offset-2
- Ring-color: ring (from theme)

Disabled State:
- Cursor: not-allowed
- Opacity: 50%
```

**Usage Example:**
```jsx
<Select value={status} onChange={handleChange}>
  <option value="all">All Statuses</option>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="rejected">Rejected</option>
</Select>
```

---

## 4. VerificationRequestCard Component

### Card Structure

```
┌────────────────────────────────────────────────────────┐
│ 📄 Bachelor of Science Degree                          │
│ [Academic Badge] [⏱️ Pending Badge]                     │
│                                                         │
│ Computer Science degree certificate                     │
│                                                         │
│ ┌──────────────────┐ ┌──────────────────┐            │
│ │ 👤 Issuer Name   │ │ 🏢 Organization  │            │
│ │ MIT Registrar    │ │ MIT              │            │
│ └──────────────────┘ └──────────────────┘            │
│                                                         │
│ ┌──────────────────┐ ┌──────────────────┐            │
│ │ 📧 Issuer Email  │ │ 📅 Submitted     │            │
│ │ registrar@mit    │ │ Jan 10, 2025     │            │
│ └──────────────────┘ └──────────────────┘            │
│                                                         │
│ 📨 Submitted by: student@example.com                   │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│                   [Review Request]                      │
│                                                         │
│ ▼ Expanded Actions:                                    │
│   Verification Notes (Optional)                        │
│   ┌───────────────────────────────────────────────┐   │
│   │ Add notes about this verification...         │   │
│   │                                               │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   [✅ Approve]   [❌ Reject]   [Cancel]                │
└────────────────────────────────────────────────────────┘
```

### Component Design Specs

```css
Container (Card):
- Background: card
- Border: 1px solid border
- Border-radius: 0.75rem (12px)
- Shadow: sm
- Transition: shadow 200ms
- Hover: shadow-md

Header Section:
- Display: flex
- Justify: space-between
- Align: start
- Gap: 0.5rem (8px)
- Margin-bottom: 1rem (16px)

Title (Document Name):
- Font-size: 1.25rem (20px)
- Font-weight: 600 (semibold)
- Display: flex
- Align: center
- Gap: 0.5rem

Icon (FileText):
- Size: 1.25rem (20px)
- Color: primary

Badge Group:
- Display: flex
- Gap: 0.5rem
- Margin-top: 0.25rem (4px)

Description:
- Color: muted-foreground
- Font-size: 0.875rem (14px)
- Margin-bottom: 1rem

Details Grid:
- Grid: 1 column on mobile, 2 columns on md+
- Gap: 1rem (16px)

Detail Item:
- Display: flex
- Align: start
- Gap: 0.5rem (8px)

Detail Icon:
- Size: 1rem (16px)
- Color: muted-foreground
- Margin-top: 2px

Detail Label:
- Font-weight: 500 (medium)
- Font-size: 0.875rem
- Margin-bottom: 0.25rem

Detail Value:
- Color: muted-foreground
- Font-size: 0.875rem

Submitter Section:
- Background: muted
- Border-radius: 0.5rem (8px)
- Padding: 0.75rem (12px)
- Margin: 1rem 0

Verification Notes Display:
- Background: muted
- Border-radius: 0.5rem
- Padding: 0.75rem
- Font-size: 0.875rem

Actions Section:
- Border-top: 1px solid border
- Padding-top: 1rem
- Margin-top: 1rem

Review Button:
- Variant: outline
- Width: 100%
- Justify: center

Expanded Actions:
- Animation: height 200ms ease-in-out
- Gap: 0.75rem (12px)

Action Buttons:
- Flex: 1 (equal width)
- Gap: 0.5rem

Approve Button:
- Variant: default
- Icon: CheckCircle
- Color: from theme

Reject Button:
- Variant: destructive
- Icon: XCircle

Cancel Button:
- Variant: outline
```

### Status-Based Styling

```typescript
Pending:
  Badge: warning variant (yellow)
  Icon: Clock
  Border-left: none (or subtle)

Approved:
  Badge: success variant (green)
  Icon: CheckCircle
  Notes section: visible
  Actions: hidden

Rejected:
  Badge: destructive variant (red)
  Icon: XCircle
  Notes section: visible
  Actions: hidden
```

---

## 5. Color Palette & Theme

### Primary Colors
```css
Light Mode:
- Background: white (#ffffff)
- Foreground: slate-950 (#020617)
- Card: white (#ffffff)
- Card-foreground: slate-950
- Border: slate-200 (#e2e8f0)
- Muted: slate-100 (#f1f5f9)
- Muted-foreground: slate-500 (#64748b)
- Primary: blue-600 (#2563eb)
- Primary-foreground: white

Dark Mode:
- Background: slate-950 (#020617)
- Foreground: slate-50 (#f8fafc)
- Card: slate-900 (#0f172a)
- Card-foreground: slate-50
- Border: slate-800 (#1e293b)
- Muted: slate-800 (#1e293b)
- Muted-foreground: slate-400 (#94a3b8)
- Primary: blue-500 (#3b82f6)
- Primary-foreground: white
```

### Status Colors
```css
Success (Approved/Verified):
- Light: green-100 bg, green-800 text
- Dark: green-900/30 bg, green-400 text

Warning (Pending):
- Light: yellow-100 bg, yellow-800 text
- Dark: yellow-900/30 bg, yellow-400 text

Error (Rejected):
- Light: red-100 bg, red-800 text
- Dark: red-900/30 bg, red-400 text
```

### Feature Card Accent Colors
```css
Blue (Recruitment): border-l-blue-500
Orange (Traffic): border-l-orange-500
Red (Health): border-l-red-500
Cyan (Travel): border-l-cyan-500
```

---

## 6. Responsive Behavior

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile (< 768px)
```
- Single column layout
- Stats cards: stack vertically
- Filter inputs: full width, stacked
- Verification cards: full width
- Buttons: full width
- Font sizes: slightly smaller
- Padding: reduced (16px instead of 24px)
```

### Tablet (768px - 1024px)
```
- Stats grid: 2 columns
- Filter inputs: 2 columns
- Feature cards: 2 columns
- Verification cards: full width
- Side-by-side buttons: 50% each
```

### Desktop (> 1024px)
```
- Stats grid: 4 columns
- Filter inputs: 3 columns
- Feature cards: 2 columns
- Verification cards: full width
- Action buttons: inline, auto width
- Max width: 1280px (7xl container)
```

---

## 7. Animations & Transitions

### Hover Effects
```css
Cards:
- transition: shadow 200ms ease
- hover: shadow-lg

Buttons:
- transition: all 150ms ease
- hover: opacity 90%

Links:
- transition: color 150ms ease
```

### Loading States
```css
Button Loading:
- Icon: Loader2 spinning
- Animation: spin 1s linear infinite
- Disabled: true
- Opacity: 50%

Page Loading:
- Skeleton screens with shimmer
- Animation: pulse 2s infinite
```

### Interactive States
```css
File Drop Zone:
- Active: scale(1.02), border-color change
- Transition: 200ms ease

Form Fields:
- Focus: ring-2 ring-offset-2
- Transition: border-color 150ms

Expandable Sections:
- Height transition: 200ms ease-in-out
- Overflow: hidden during animation
```

---

## 8. Accessibility Features

### Keyboard Navigation
- ✅ All interactive elements focusable
- ✅ Tab order: logical flow
- ✅ Enter/Space: activate buttons
- ✅ Escape: close modals/dropdowns

### Screen Readers
- ✅ Semantic HTML (nav, main, section)
- ✅ ARIA labels on icons
- ✅ Alt text on images
- ✅ Descriptive button text

### Color Contrast
- ✅ WCAG AA compliant (4.5:1 minimum)
- ✅ Dark mode: adjusted for readability
- ✅ Status colors: sufficient contrast

---

## 9. Component Props & API

### VerificationRequestCard Props

```typescript
interface VerificationRequestCardProps {
  request: {
    id: string;
    documentName: string;
    documentType: string;
    description?: string;
    issuerName: string;
    issuerEmail?: string;
    issuerOrganization: string;
    documentCID?: string;
    documentUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
    verificationNotes?: string;
    submittedBy?: string;
    submitterEmail?: string;
    verifiedBy?: string;
    verifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  onApprove?: (id: string, notes: string) => void;
  onReject?: (id: string, notes: string) => void;
  isLoading?: boolean;
}
```

### Badge Props

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
}
```

### Textarea Props

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
```

### Select Props

```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}
```

---

## 10. File Structure

```
apps/web/
├── app/
│   ├── wallet/upload/
│   │   └── page.tsx                   # Upload page with verification
│   └── organization/verifications/
│       └── page.tsx                   # Organization dashboard
├── components/
│   ├── ui/
│   │   ├── badge.tsx                  # Status badges
│   │   ├── textarea.tsx               # Multi-line input
│   │   ├── select.tsx                 # Dropdown select
│   │   ├── button.tsx                 # Buttons
│   │   ├── card.tsx                   # Card container
│   │   ├── input.tsx                  # Text inputs
│   │   └── label.tsx                  # Form labels
│   └── organization/
│       └── VerificationRequestCard.tsx # Request card component
└── lib/
    └── utils.ts                        # cn() utility for classes
```

---

## 11. Usage Examples

### Creating a Verification Request Card

```tsx
<VerificationRequestCard
  request={{
    id: '1',
    documentName: "Bachelor's Degree",
    documentType: 'academic',
    description: 'Computer Science degree',
    issuerName: 'MIT Registrar',
    issuerEmail: 'registrar@mit.edu',
    issuerOrganization: 'MIT',
    status: 'pending',
    submitterEmail: 'student@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }}
  onApprove={(id, notes) => console.log('Approved:', id, notes)}
  onReject={(id, notes) => console.log('Rejected:', id, notes)}
  isLoading={false}
/>
```

### Using Badges

```tsx
{/* Status badges */}
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>

{/* Type badges */}
<Badge variant="outline">Academic</Badge>
<Badge variant="outline">Government</Badge>
```

### Form with Textarea

```tsx
<div className="space-y-2">
  <Label htmlFor="notes">Verification Notes</Label>
  <Textarea
    id="notes"
    placeholder="Add notes about this verification..."
    rows={3}
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />
</div>
```

### Filter with Select

```tsx
<div className="space-y-2">
  <Label htmlFor="status">Status Filter</Label>
  <Select
    id="status"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Statuses</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </Select>
</div>
```

---

## 12. Best Practices

### Do's ✅
- Use semantic color variables (bg-card, text-foreground)
- Maintain consistent spacing (4px grid system)
- Provide loading states for async actions
- Show clear error messages
- Use icons to enhance readability
- Test in both light and dark modes
- Ensure keyboard accessibility
- Add hover states to interactive elements

### Don'ts ❌
- Don't use hardcoded color values (#fff, #000)
- Don't skip loading states
- Don't use vague error messages
- Don't ignore mobile responsiveness
- Don't forget focus states
- Don't mix inconsistent spacing
- Don't use tiny click targets (min 44px)

---

**Last Updated:** November 13, 2025  
**Version:** 1.0.0  
**Maintained by:** PixelGenesis Team
