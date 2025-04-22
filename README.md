# Intelligent Advisor for Personal Finance & Investment

This is a Next.js project designed for Group 40 – **Financial Risk & Compliance Monitoring**, part of the AI-based
Investment Assistant.

---

## Getting Started

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure & Guidelines

### Current intended data flow

- **Frontend**: Client side (Next.js)
- **NextJs**: NextJS server using server actions
- **Backend**: API server (FastAPI) using REST API

(if you prefer direct backend calls let's discuss this in the group)

### ENV File Guidelines

Create a `.env` file in the root directory.

- **`BACKEND_BASE_URL`**: Base URL for the API (e.g., `https://api.example.com`)..
- For local development, you can use `http://localhost:8000` if your FastAPI server is running locally. If localhost not
  working try http://127.0.0.1:8000

### 🗂️ App Directory Convention

Each group (37, 38, 39, 40) should maintain their own working area inside the `app/` folder. Inside their group folder:

- Create:
    - `_components/` – for UI components
    - `_utils/` – for helper functions
    - `_services/` – for API or data fetching logic (if needed)
    - `_types/` – for custom TypeScript interfaces/types

This modular separation helps maintain code isolation and avoids merge conflicts.

Example:

```
app/
└── forecast/
    ├── page.tsx
    ├── _components/
    ├── _utils/
    ├── _services/
    └── _types/
```

---

## 🔷 Types

Common types used for the project are located in `src/lib/types/*`. This file contains:

---

### 🧩 UI & Tooling Guidelines

- **Use [Shadcn/ui](https://ui.shadcn.com)** components as much as possible for consistent and modern UI.
- **⚠️ Note:** Avoid using Shadcn dropdowns inside Dialogs (both AlertDialog and Dialog) – they currently have a bug.
  Use a custom or alternative dropdown in those cases.
- Use **[Lucide Icons](https://lucide.dev/icons)** for all icons (`lucide-react`). Only fallback to `react-icons` if a
  specific icon is unavailable.
- Use **[Recharts](https://recharts.org/en-US)** for visualizations.
- Use **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)** for toast notifications.
- Use **[Framer Motion](https://www.framer.com/docs/introduction/)** for animations.
- Use **[Date-fns](https://date-fns.org/)** for date formatting and manipulation.

---

## Editing the Sidebar

The sidebar is located at:

```
src/app/(dashboard)/_components/app-sidebar.tsx
```

To add a new page for a group:

1. Edit the `data.navMain` array.
2. Include a `title`, `url`, and `icon` for each group.
3. Add sub-sections using the `items` array under each page.

Example:

```ts
{
    title: "Group 40 - Risk & Compliance",
        url
:
    "/group-40",
        icon
:
    Scale,
        items
:
    [
        {
            title: "Risk Analysis",
            url: "/group-40/risk",
        },
        {
            title: "Fairness & Bias",
            url: "/group-40/fairness",
        },
    ],
}
```

---

# Theming and Color System Guide

Your project uses a sophisticated theming system based on Tailwind CSS with custom color variables and dark mode
support. This guide explains how to use colors effectively, modify the theme, and maintain consistency across
components.

## Color System Overview

The theme uses semantic color variables that represent purpose rather than specific hues. This makes it easier to
maintain consistency and adapt the UI for different contexts.

### Core Color Categories

| Category                    | Purpose                 | Usage Examples                                   |
|-----------------------------|-------------------------|--------------------------------------------------|
| `primary`                   | Main brand/action color | Buttons, active states, primary CTAs             |
| `secondary`                 | Supporting color        | Secondary buttons, backgrounds, highlights       |
| `muted`                     | Subdued visual elements | Backgrounds, disabled states, subtle UI elements |
| `accent`                    | Highlight/emphasis      | Highlights, notifications, badges                |
| `destructive`               | Warning/deletion        | Delete buttons, errors, critical alerts          |
| `background`                | Page background         | Main content areas                               |
| `foreground`                | Text on background      | Body text, headings                              |
| `border`                    | UI boundaries           | Dividers, input fields, cards                    |
| `ring`                      | Focus indicators        | Interactive element focus states                 |
| `chart-1` through `chart-5` | Data visualization      | Graph elements, charts, data points              |

### Sidebar-Specific Colors

The sidebar has its own color variants to allow for independent styling:

- `sidebar` - Sidebar background
- `sidebar-foreground` - Text in sidebar
- `sidebar-primary` - Active items in sidebar
- And several other sidebar-specific variables

## When to Use Each Color Type

### Primary (`primary`, `primary-foreground`)

- Use for main call-to-action buttons
- Active navigation items
- Any element you want users to focus on
- Key interactive elements

```tsx
<Button className="bg-primary text-primary-foreground">Save Changes</Button>
```

### Secondary (`secondary`, `secondary-foreground`)

- Secondary actions or buttons
- Alternative selection states
- Supporting UI elements
- Less prominent but still important elements

```tsx
<Button variant="secondary">Cancel</Button>
```

### Muted (`muted`, `muted-foreground`)

- Subdued backgrounds
- Less important text
- Disabled states
- Placeholders
- Supporting information

```tsx
<p className="text-muted-foreground text-sm">Last updated 2 days ago</p>
```

### Accent (`accent`, `accent-foreground`)

- Highlights that aren't primary actions
- Tags or badges
- Special callouts
- Visual differentiation elements

```tsx
<div className="bg-accent p-2 rounded-md">
    <p className="text-accent-foreground">Pro tip: Use keyboard shortcuts</p>
</div>
```

### Destructive (`destructive`)

- Delete/remove buttons
- Error messages
- Warning indicators
- Actions with potentially negative consequences

```tsx
<Button variant="destructive">Delete Account</Button>
```

### Background/Foreground (`background`, `foreground`)

- Page backgrounds
- Main content text
- Base layer of UI

```tsx
<main className="bg-background text-foreground">
    <h1>Welcome to the dashboard</h1>
</main>
```

### Border (`border`)

- Divider lines
- Input field borders
- Card boundaries
- Table cells

```tsx
<div className="border border-border rounded-md p-4">
    <h3>Card Title</h3>
</div>
```

### Ring (`ring`)

- Focus states for accessibility
- Selected items highlight

```tsx
<input className="focus:ring-2 focus:ring-ring"/>
```

### Chart Colors (`chart-1` through `chart-5`)

- Data visualizations
- Graph elements
- Different data series in charts

```tsx
<BarChart>
    <Bar dataKey="value" fill="var(--chart-1)"/>
    <Bar dataKey="comparison" fill="var(--chart-2)"/>
</BarChart>
```

## Modifying the Theme

The theme is defined using CSS variables with light and dark mode variants. To modify:

1. Locate the theme definitions in your CSS/SCSS files (like in the shared paste.txt)
2. Edit the desired color values in the `:root` section for light mode
3. Edit values in the `.dark` section for dark mode

Example of changing the primary color:

```css
:root {
    /* Original */
    --primary: oklch(0.547 0.246 262.866);

    /* Modified - changed to a blue tone */
    --primary: oklch(0.547 0.246 230.0);
}

.dark {
    /* Also update the dark mode variant */
    --primary: oklch(0.619 0.207 230.0);
}
```

### Using OKLCH Color Format

The theme uses OKLCH color format which offers better perceptual uniformity and a wider gamut than traditional RGB or
HSL. When modifying colors:

- First value (0-1): Lightness
- Second value: Chroma (color intensity)
- Third value (0-360): Hue angle

### Considerations When Editing

1. **Contrast Ratios**: Ensure text remains readable on backgrounds (WCAG recommends at least 4.5:1 for normal text)
2. **Color Harmony**: Keep colors visually harmonious - consider using tools like Adobe Color
3. **Dark Mode Adjustments**: Always test both light and dark modes after changes
4. **Accessibility**: Consider color blindness - avoid relying solely on color to convey information
5. **Brand Consistency**: Maintain alignment with overall brand guidelines

## Using Theme Colors in Components

Access theme colors via Tailwind classes:

```tsx
// Background and text color
<div className="bg-primary text-primary-foreground">Primary Button</div>

// Border color
<div className="border-2 border-border">Bordered Element</div>

// Hover states
<button className="bg-secondary hover:bg-secondary/80">Hover Effect</button>
```

You can also use opacity modifiers:

```tsx
// 90% opacity of primary color
<div className="bg-primary/90">Semi-transparent</div>
```

---

## 🌱Seed data

Currently when reset-database called there will be two dummy user created with the following credentials:

### User

- **Username:** `johndoe`
- **Password:** `123`

### Admin

- **Username:** `johnsmith`
- **Password:** `admin123`

---

## 🔒Authentication helper functions

The frontend includes two utility functions to help manage user authentication using cookies and backend verification.

### `getCurrentUser() - src/actions/auth.ts`

This function reads the `user` cookie and parses it to retrieve the current logged-in user's data.

**Usage:**

- Use this when you just need to access the **locally stored** user details (e.g., to conditionally render UI, get
  username, or role).
- This does **not** contact the backend, so it **doesn't verify** if the user session is valid on the server.

---

### `verifyUser() - src/actions/auth.ts`

This function:

1. Gets the current user from the cookie using `getCurrentUser()`.
2. Sends a POST request to `/auth/verify` on the backend to **validate** the user's session and data (e.g., user ID,
   username, role).
3. Returns the verified user if everything matches; otherwise, logs out the user.

**Usage:**

- Call this when you need to ensure that the user is **genuinely authenticated** and the cookie hasn't been tampered
  with.
- Useful for **protected pages**, **role validation**, and **critical operations**.

**Important:**  
As of now, the backend `/auth/verify` route is **not yet implemented**, so this function will fail until the backend
logic is ready. You can still safely use `getCurrentUser()` until then.

---

## 🛜 Data Fetching

This project uses a **unified approach** for data fetching from a FastAPI backend using `fetch` under the hood, split
between:

- `fetchFromAPI` for **server components**
- `clientFetch` for **client components**
- `useAPI` for **React hooks inside client components** (with SWR)

### 🔧 Setup

#### 📁 `lib/server-fetcher.ts` – Server Fetcher

Fetches data securely using HTTP-only cookies (set on login). Ideal for **Server Components**.

```ts
import {cookies} from 'next/headers';

const BASE_URL = process.env.BACKEND_BASE_URL!;

export async function serverFetcher<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = (await cookies()).get('token')?.value;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Fetch failed: ${res.status} - ${errorBody}`);
    }

    return res.json() as Promise<T>;
}
```

---

#### 📁 `lib/client-fetcher.ts` – Client Fetcher

Fetches from the client using `credentials: 'include'`, which allows cookies like HTTP-only `token` to be sent.

```ts
const BASE_URL = 'http://localhost:8000'; // or your backend URL

export async function clientFetcher<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Client fetch failed: ${res.status} - ${errorBody}`);
    }

    return res.json() as Promise<T>;
}
```

---

#### 📁 `hooks/useAPI.ts` – Reusable Hook (Client)

A flexible and type-safe hook for **client-side data fetching** using SWR.

```ts
'use client';

import useSWR from 'swr';
import {clientFetch} from '@/lib/client-fetcher';

export function useAPI<T = unknown>(
    endpoint: string,
    options?: RequestInit
) {
    const fetcher = async (url: string): Promise<T> => {
        return await clientFetch<T>(url, options);
    };

    const {data, error, isLoading, mutate} = useSWR<T>(endpoint, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate, // use to refresh data
    };
}
```

---

### 🔍 Testing

A sample client-side page is set up at:

```
/test
```

This page demonstrates how to:

- Fetch a message using the `useAPI` hook
- Handle loading and error states
- Access a protected route using cookie-based auth

#### Example Output

```tsx
'use client';

import {useAPI} from '@/hooks/useAPI';

export default function Page() {
    const {data: message, isLoading, error} = useAPI<string>('/');

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <div>{message}</div>;
}
```

---

### ✅ Benefits

- **Type-safe** with generics (`<T>`)
- **Modular** and consistent usage across server/client
- **Token handled automatically**
- **HTTP-only cookie support**
- **SWR** adds caching, revalidation, and `mutate()` for refetching
- Cleaner code → logic is in one place instead of every component

---

### 🧠 Tips

- Use `fetchFromAPI` in **Server Components** or Route Handlers.
- Use `useAPI` in **Client Components**.
- Make sure your backend sets the `token` cookie as `HttpOnly`, `SameSite=Strict`, and `Secure` in production.
- Avoid `localStorage` or exposing tokens to the browser for better security.

---

### 🔁 When to Use Which

| Scenario                                       | Function to Use    |
|------------------------------------------------|--------------------|
| Displaying user info (username, avatar, role)  | `getCurrentUser()` |
| Protecting a page or verifying user identity   | `verifyUser()`     |
| Ensuring cookie data hasn't been tampered with | `verifyUser()`     |

---

## 👤 Role Access Control

There is a `src/middleware.ts` file. In that file, there are three arrays:

- `publicRoutes` – contains the routes that are accessible to all users
- `userRoutes` – contains the routes that are accessible to users with the role of `user`
- `adminOnlyRoutes` – contains the routes that are only accessible to users with the role of `admin`

**Admins** can access both **user** and **admin** routes. This means they can also access features like portfolio
optimization, etc.

### 🔄 Dynamic Route Patterns

The middleware now supports dynamic route patterns using two special syntaxes:

- `:parameter` – matches a single URL segment (e.g., `/users/:id` matches `/users/123`)
- `:path*` – matches multiple nested segments (e.g., `/dashboard/:path*` matches `/dashboard/reports/quarterly/2025`)

Examples of properly formatted route patterns:

```javascript
// Single parameter routes
"/users/:id"           // Matches: /users/123
"/profile/:username"   // Matches: /profile/johndoe

// Nested/wildcard routes
"/dashboard/:path*"    // Matches: /dashboard, /dashboard/stats, /dashboard/reports/annual
"/settings/:section"   // Matches: /settings/account, /settings/privacy
```

### 🔐 Adding New Routes

When introducing a new route, add it to the appropriate array in `middleware.ts`:

1. If the route should be accessible without authentication, add it to `publicRoutes`
2. If the route should be accessible to regular users, add it to `userRoutes`
3. If the route should be accessible only to admins, add it to `adminOnlyRoutes`

Be sure to include any dynamic variations of the route using the pattern syntax above.

### 🚦 Route Access Logic

- Public routes: Accessible to everyone
- User routes: Require authentication with any role
- Admin routes: Require authentication with admin role

Remember that users with the admin role can access all routes in both `userRoutes` and `adminOnlyRoutes`.

---

## Best Practices

1. **Use semantic colors** instead of hardcoded hex values
2. **Test in both light and dark modes** when making changes
3. **Consider mobile view** when selecting colors (contrast may appear different)
4. **Use color purposefully** - maintain consistent meaning across the application
5. **Limit accent colors** to avoid visual confusion
6. **Ensure sufficient contrast** between text and backgrounds

By following these guidelines, you'll maintain a consistent, accessible, and visually appealing UI that adapts well to
both light and dark modes.

---

## ⚠️Important

- Before pull requests please make sure the app is building fine
- Make sure to run `npm run lint`, `npm run build && npm start` will run correnclt without any issues

---

Let’s build something smart and explainable! 🚀