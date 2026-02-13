# Customer Dashboard

A modern, responsive customer portal built with Next.js 14 for managing orders, products, and customer support.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and recent activity
- **Order Management**: Track and manage all your orders
- **Product Catalog**: Browse and search products
- **Profile Management**: Update personal information and preferences
- **Support Center**: Submit tickets and get help
- **Notifications**: Stay updated with order and account notifications
- **Settings**: Customize your experience

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (optional)

## 📦 Installation

```bash
# Navigate to project directory
cd /home/pavinee/Kadmin/customer-dashboard

# Install dependencies
npm install

# Run development server (port 3003)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Port Configuration

This application runs on **port 3003** by default.

- Development: http://localhost:3003
- K Energy Save Dashboard: port 3001
- Korea Management System: port 3002

## 📁 Project Structure

```
customer-dashboard/
├── app/
│   ├── page.tsx              # Dashboard home
│   ├── orders/               # Order management
│   ├── products/             # Product catalog
│   ├── profile/              # User profile
│   ├── support/              # Support center
│   ├── notifications/        # Notifications
│   ├── settings/             # Settings
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   └── Header.tsx            # Top header
├── lib/                      # Utilities
├── public/                   # Static assets
└── package.json
```

## 🎨 Theme Colors

- **Primary**: #10B981 (Emerald Green)
- **Secondary**: #F59E0B (Amber)
- **Accent**: #8B5CF6 (Purple)

## 🔑 Key Features Details

### Dashboard
- Order statistics overview
- Recent orders list
- Quick actions
- Real-time notifications

### Orders
- Complete order history
- Order tracking
- Status filtering
- Download invoices

### Profile
- Personal information management
- Email/SMS preferences
- Account settings
- Profile completion indicator

### Support
- Submit support tickets
- View ticket history
- Quick help links
- Contact information

## 📝 Available Pages

- `/` - Dashboard home
- `/orders` - Order management
- `/products` - Product catalog
- `/profile` - User profile
- `/support` - Support center
- `/notifications` - Notifications
- `/settings` - Settings

## 🔧 Development

```bash
# Run with specific port
npm run dev

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 📄 License

© 2026 Customer Dashboard. All rights reserved.

## 🤝 Support

For issues or questions, please contact support@example.com
