Here’s your updated and cleaner `README.md` with all the requested customizations and guidelines:

---

```md
# Intelligent Advisor for Personal Finance & Investment

This is a Next.js project designed for Group 40 – **Financial Risk & Compliance Monitoring**, part of the AI-based Investment Assistant.

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
└── group-40/
    ├── page.tsx
    ├── _components/
    ├── _utils/
    ├── _services/
    └── _types/
```

---

### 🧩 UI & Tooling Guidelines

- **Use [Shadcn/ui](https://ui.shadcn.com)** components as much as possible for consistent and modern UI.
- **⚠️ Note:** Avoid using Shadcn dropdowns inside Dialogs (both AlertDialog and Dialog) – they currently have a bug. Use a custom or alternative dropdown in those cases.
- Use **[Lucide Icons](https://lucide.dev/icons)** for all icons (`lucide-react`). Only fallback to `react-icons` if a specific icon is unavailable.
- Use **[Recharts](https://recharts.org/en-US)** for visualizations.
- Use **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)** for toast notifications.

---

## Editing the Sidebar

The sidebar is located at:

```
src/components/app-sidebar.tsx
```

To add a new page for a group:

1. Edit the `data.navMain` array.
2. Include a `title`, `url`, and `icon` for each group.
3. Add sub-sections using the `items` array under each page.

Example:

```ts
{
  title: "Group 40 - Risk & Compliance",
  url: "/group-40",
  icon: Scale,
  items: [
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

Let’s build something smart and explainable! 🚀
```