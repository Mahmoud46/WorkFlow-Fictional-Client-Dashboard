# WorkFlow Multi-Page Dashboard for a Fictional Freelance Client

**WorkFlow** is a fully responsive interface, multi-page dashboard designed for a freelance client. It consolidates essential client data—including projects, freelancers, invoices, proposals, and profile information—into an intuitive, interactive platform with reusable components and dynamic charts.

---

## 📌 Overview

The dashboard provides a comprehensive management interface through eight main pages, each with its own subpages:

- **Home Page**  
  Displays key statistics such as active projects, hired freelancers, total expenditures, and pending proposals. Includes charts for project status and monthly expenses, along with overviews of active projects, pending proposals, and pending invoices.

- **Projects Page**  
  Shows detailed project statistics, total allocated budgets, and project cards in grid or row view. Projects can be filtered by status and browsed individually.

- **Freelancers Page**  
  Lists all freelancers who have worked with or are currently assigned to client projects. Includes filtering options by project and the ability to view individual freelancer profiles.

- **Payments & Invoices Page**  
  Provides a complete overview of all invoices with filtering options by status. Each invoice can be viewed in detail.

- **Proposals Page**  
  Shows all proposals submitted for the client’s projects, with filtering options based on proposal status. Each proposal can be viewed individually.

- **Profile Page**  
  Displays client profile information, posts, reviews, and feedback. Clients can edit personal details (name, contact, bio, password) and update account settings.

- **Chat Window**  
  Allows communication with freelancers directly from the dashboard.

- **Detailed Views**  
  Each project, invoice, and freelancer profile can be viewed individually for detailed insights.

---

## 🚀 Features

- Fully responsive multi-page dashboard
- Home page with interactive charts and summary statistics
- Projects management with grid and row views, budget tracking, and status filtering
- Freelancer management with project-based filtering and profile browsing
- Invoice and payment tracking with detailed views and status filters
- Proposal tracking with detailed views and status filters
- Profile management with editable data and account settings
- Integrated chat functionality for freelancer communication
- Modular, reusable, and maintainable UI components
- Client-side routing using React Router DOM

---

## 🛠️ Tech Stack

- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Recharts** (for interactive charts)
- **Context API** (for state management)
- **React Icons**
- **Moment.js** (for date formatting)

---

## Demo

![Project Demo](workflow.gif)

---

## 📂 Project Structure

```text
src/
├── assets/
├── classes/
|   ├── Chats.class.ts
|   ├── Freelancers.class.ts
|   ├── Invoices.class.ts
|   ├── Posts.class.ts
|   ├── Profile.class.ts
|   ├── Projects.class.ts
|   ├── Proposals.class.ts
|   └── Transactions.class.ts
├── components/        # Reusable UI components
├── constants/
├── context/           # Context API for global state management
├── data/              # Mock data
├── interface/
├── pages/             # Home, Projects, Freelancers, Invoices, Proposals, Profile pages
├── utils/
├── index.css
├── App.tsx            # Root application component
└── main.tsx           # Application entry point
```

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/WorkFlow-Fictional-Client-Dashboard.git
```

2. Navigate to the project directory

```bash
cd workflow-dashboard
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```
