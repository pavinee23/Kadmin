'use client';

import { Bell, Package, CreditCard, TrendingUp, AlertCircle, CheckCircle, Info, Trash2 } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { translations } from '@/translations';

export default function NotificationsPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  
  const notifications = [
    {
      id: 1,
      type: 'order',
      icon: Package,
      color: 'bg-blue-500',
      title: 'Order Shipped',
      message: 'Your order #ORD-2024-002 has been shipped and is on the way!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'delivery',
      icon: CheckCircle,
      color: 'bg-green-500',
      title: 'Delivery Complete',
      message: 'Order #ORD-2024-001 has been successfully delivered.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'payment',
      icon: CreditCard,
      color: 'bg-purple-500',
      title: 'Payment Confirmed',
      message: 'Your payment of $129.99 has been processed successfully.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      color: 'bg-yellow-500',
      title: 'Price Drop Alert',
      message: 'Smart Watch Pro is now on sale! Save 20% today.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'promotion',
      icon: TrendingUp,
      color: 'bg-orange-500',
      title: 'Special Offer',
      message: 'Get free shipping on orders over $50 this week!',
      time: '2 days ago',
      read: true,
    },
    {
      id: 6,
      type: 'info',
      icon: Info,
      color: 'bg-gray-500',
      title: 'Account Update',
      message: 'Your profile has been successfully updated.',
      time: '3 days ago',
      read: true,
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.notifications}</h1>
        <p className="text-gray-600">{t.notificationDescription}</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-primary hover:text-primary/80 text-sm font-medium">
              {t.markAllRead}
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              {t.clearAll}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {notifications.filter(n => !n.read).length} {t.unread}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all ${
              !notification.read ? 'border-l-4 border-primary' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 ${notification.color} rounded-lg flex items-center justify-center`}>
                <notification.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{notification.time}</span>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <button className="text-xs text-primary hover:text-primary/80 font-medium">
                        Mark as read
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (commented out - shown when no notifications) */}
      {/* 
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
        <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
      </div>
      */}

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Notifications
        </button>
      </div>
    </div>
  );
}
