'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { translations } from '@/translations';

export default function HomePage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('cd_auth');
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);

  const stats = [
    { label: t.totalOrders, value: '24', icon: ShoppingBag, color: 'bg-blue-500', change: '+12%' },
    { label: t.pendingOrders, value: '3', icon: Clock, color: 'bg-yellow-500', change: '-5%' },
    { label: t.completedOrders, value: '18', icon: CheckCircle, color: 'bg-green-500', change: '+8%' },
    { label: t.cancelledOrders, value: '3', icon: XCircle, color: 'bg-red-500', change: '0%' },
  ];

  const recentOrders = [
    { id: 'ORD-2024-001', product: 'Wireless Headphones', status: t.delivered, date: '2026-02-10', amount: '$129.99' },
    { id: 'ORD-2024-002', product: 'Smart Watch', status: t.inTransit, date: '2026-02-12', amount: '$299.99' },
    { id: 'ORD-2024-003', product: 'Laptop Stand', status: t.processing, date: '2026-02-13', amount: '$49.99' },
    { id: 'ORD-2024-004', product: 'USB-C Cable', status: t.delivered, date: '2026-02-14', amount: '$19.99' },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.welcomeBack}</h1>
        <p className="text-gray-600">{t.accountToday}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 
                stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t.recentOrders}</h2>
            <Link href="/orders" className="text-primary hover:text-primary/80 text-sm font-medium">
              {t.viewAll}
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{order.product}</div>
                    <div className="text-sm text-gray-500">{order.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{order.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                    order.status === t.delivered ? 'bg-green-100 text-green-700' :
                    order.status === t.inTransit ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
            <div className="space-y-3">
              <Link href="/orders" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t.viewOrders}</span>
              </Link>
              <Link href="/support" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t.getSupport}</span>
              </Link>
              <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t.updateProfile}</span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentNotifications}</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="text-sm font-medium text-blue-900">{t.orderShipped}</div>
                <div className="text-xs text-blue-700 mt-1">Your order #ORD-2024-002 is on the way!</div>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="text-sm font-medium text-green-900">{t.deliveryComplete}</div>
                <div className="text-xs text-green-700 mt-1">Order #ORD-2024-001 has been delivered.</div>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <div className="text-sm font-medium text-yellow-900">{t.paymentConfirmed}</div>
                <div className="text-xs text-yellow-700 mt-1">Invoice #INV-2024-012 is due soon.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
