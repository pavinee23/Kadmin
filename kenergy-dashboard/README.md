# K Energy Save Dashboard

A modern, responsive dashboard built with Next.js 14, TypeScript, and Tailwind CSS for K Energy Save Co., Ltd (Group of Zera).

## Features

- 🎨 Modern UI with Tailwind CSS
- 📊 Interactive charts with Recharts
- 🌍 Multi-site support (Thailand & Republic of Korea)
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 App Router
- 🔒 TypeScript for type safety

## Dashboard Components

- **User Profile**: Company information, registration details, and site locations
- **Package Usage**: Real-time monitoring of:
  - Devices (3/5)
  - LINE Messages (0/250)
  - Telegram Messages (Enabled)
  - API Requests (0/10,000)
  - API Keys
  - Dashboards (1/1)
- **Usage Chart**: LINE Message usage over the last 12 months
- **Package Features**: Overview of available features and limits

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd kenergy-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
kenergy-dashboard/
├── app/
│   ├── layout.tsx       # Root layout with sidebar and header
│   ├── page.tsx         # Main dashboard page
│   └── globals.css      # Global styles
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Header.tsx       # Top header bar
│   ├── UserProfile.tsx  # User profile card
│   ├── PackageUsage.tsx # Package usage statistics
│   └── UsageChart.tsx   # LINE message usage chart
├── public/              # Static assets
└── lib/                 # Utility functions
```

## Build for Production

```bash
npm run build
npm start
```

## Customization

### Colors

Edit the Tailwind config in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#2D8A3E",    // K Energy Save green
  secondary: "#FFA500",  // Orange accent
}
```

### Company Information

Update company details in `components/UserProfile.tsx`

### Sites

Modify site locations in the UserProfile component's Sites section.

## License

Copyright © 2026 K Energy Save Co., Ltd (Group of Zera). All rights reserved.

## Support

For support, please contact: info@kenergy-save.com
