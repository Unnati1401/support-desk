# SupportDesk

A helpdesk / ticket management system built with React. Supports three roles (Requester, Agent, Manager) with ticket creation, assignment, triage, and conversation threads.

## Prerequisites

- **Node.js** >= 16
- **npm** >= 8

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd support-desk

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm start`       | Run the dev server with hot reload               |
| `npm test`        | Launch the test runner in watch mode              |
| `npm run build`   | Create an optimized production build in `build/`  |

## Project Structure

```
src/
  App.js                  # Root component (standalone version with all views)
  App.jsx                 # Modular entry point using extracted components
  components/
    layout/
      Sidebar.jsx         # Navigation sidebar
    tickets/
      ActivityTimeline.jsx
      MessageThread.jsx
      TicketBadges.jsx
      TicketFilters.jsx
      TicketInfoPanel.jsx
      TicketRow.jsx
      TicketTable.jsx
    ui/                   # Reusable UI primitives (Badge, Divider, NavItem, etc.)
  context/
    AppContext.jsx         # Global state (React Context + useReducer)
  data/
    constants.js          # Teams, categories, agents, seed tickets
  hooks/
    useTickets.js          # Ticket filtering, counting, and triage hooks
  pages/
    CreateTicketPage.jsx
    DashboardPage.jsx
    LoginPage.jsx
    TicketDetailPage.jsx
    TriagePage.jsx
  utils/
    helpers.js             # Date formatting, dropdown helpers
```

## Tech Stack

- **React** 19
- **noplin-uis** - UI component library (cards, tables, timelines, dropdowns)
- **react-icons** - Heroicons 2 outline icon set
- **react-router-dom** - Routing
- **Create React App** - Build tooling

## Roles

| Role        | Capabilities                                                 |
| ----------- | ------------------------------------------------------------ |
| Requester   | Create tickets, view own tickets, reply to threads           |
| Agent       | View all tickets, change status, assign tickets, triage queue|
| Manager     | Full access including triage queue and team management        |

## License

Private
