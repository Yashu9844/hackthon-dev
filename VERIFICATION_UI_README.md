# Document Verification UI (Frontend Only)

This is a **UI-only demonstration** of a document verification feature. No backend API is required - all data is mocked in the frontend.

## What Was Created

### 📁 New Files

**UI Components:**
- `apps/web/components/ui/badge.tsx` - Status badges (pending/approved/rejected)
- `apps/web/components/ui/textarea.tsx` - Text area for notes
- `apps/web/components/ui/select.tsx` - Dropdown selects
- `apps/web/components/organization/VerificationRequestCard.tsx` - Verification request display card

**Pages:**
- `apps/web/app/organization/verifications/page.tsx` - Organization verification dashboard

**Updated:**
- `apps/web/app/wallet/upload/page.tsx` - Added verification request checkbox and form fields

## Features

### 1. Upload Page (`/wallet/upload`)
- Upload documents with drag & drop
- **NEW:** Optional "Send verification request" checkbox
- Dynamic form fields for issuer information:
  - Issuer Name
  - Issuer Organization
  - Issuer Email (optional)
- When submitted, logs verification request details to console

### 2. Organization Dashboard (`/organization/verifications`)
- View mock verification requests (3 sample requests)
- Filter by status (pending/approved/rejected)
- Search by document name, issuer name, or type
- Filter by organization
- Statistics cards showing counts
- Approve/reject requests with notes
- Updates work locally (state management only)

## How to Use

### Start the Frontend

```bash
cd C:\Users\swaroop\hackthon-dev\apps\web
npm run dev
```

### Test the Features

#### Upload Flow
1. Visit: http://localhost:3000/wallet/upload
2. Login with Privy
3. Upload any file
4. Fill in document details
5. ✓ Check "Send verification request to issuing organization"
6. Fill in issuer details:
   - Name: "MIT Registrar"
   - Organization: "Massachusetts Institute of Technology"
   - Email: registrar@mit.edu
7. Click "Upload Document"
8. See success message
9. Check browser console (F12) to see logged verification request

#### Organization Dashboard
1. Visit: http://localhost:3000/organization/verifications
2. See 3 mock verification requests:
   - 1 pending (Bachelor of Science Degree)
   - 1 approved (Professional Certificate)
   - 1 rejected (Government ID)
3. Use filters to search/filter requests
4. Click "Review Request" on pending request
5. Add optional notes
6. Click "Approve" or "Reject"
7. See status update instantly

## Design Features

✅ **Theme-Aware Colors** - No hardcoded colors, uses Tailwind CSS theme colors
- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-muted`, `text-muted-foreground`
- Status colors adapt to dark/light mode

✅ **Responsive Design** - Works on mobile, tablet, and desktop

✅ **shadcn Components** - Consistent, accessible UI components

✅ **Status Badges** - Visual indicators with icons:
- 🟡 Pending
- 🟢 Approved
- 🔴 Rejected

## Mock Data

The organization dashboard displays 3 sample verification requests:

1. **Bachelor of Science Degree** (Pending)
   - From: MIT
   - Submitted by: student@example.com

2. **Professional Certificate** (Approved)
   - From: Amazon Web Services
   - Verified with notes

3. **Government ID** (Rejected)
   - From: US Government
   - Rejected: "Document expired"

## Adding Backend Integration (Future)

When you're ready to connect to a real backend:

### Upload Page
Replace the `handleSubmit` function's setTimeout with:
```typescript
const response = await fetch('/api/verification-requests', {
  method: 'POST',
  body: JSON.stringify({ documentName, issuerName, ... })
});
```

### Organization Dashboard
Replace `fetchRequests` mock data with:
```typescript
const response = await fetch('/api/verification-requests');
const data = await response.json();
setRequests(data);
```

Replace `handleApprove` and `handleReject` with:
```typescript
await fetch(`/api/verification-requests/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ status: 'approved', notes })
});
```

## File Structure

```
apps/web/
├── app/
│   ├── wallet/upload/
│   │   └── page.tsx                   ✅ UPDATED
│   └── organization/verifications/
│       └── page.tsx                   ✅ NEW
└── components/
    ├── ui/
    │   ├── badge.tsx                  ✅ NEW
    │   ├── textarea.tsx               ✅ NEW
    │   └── select.tsx                 ✅ NEW
    └── organization/
        └── VerificationRequestCard.tsx ✅ NEW
```

## Notes

- **No backend required** - This is purely a UI demonstration
- All data is stored in React state
- Changes don't persist across page reloads
- Console logs show what would be sent to backend
- Ready to integrate with any backend API

## Screenshots

### Upload Page
![Upload with verification request checkbox]

### Organization Dashboard
![Dashboard with filters and statistics]

### Verification Request Card
![Card showing approve/reject actions]

---

**Ready to use!** Just start your frontend server and navigate to the pages.
