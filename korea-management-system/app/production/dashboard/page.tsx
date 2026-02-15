'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { 
  Package, 
  Truck, 
  Factory, 
  Ship, 
  Wrench, 
  AlertTriangle, 
  Settings, 
  FlaskConical, 
  ClipboardCheck 
} from 'lucide-react';

export default function ProductionDashboardPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  // Sample data
  const stats = {
    totalOrders: 156,
    inProduction: 42,
    readyToShip: 28,
    shipped: 86
  };

  const menuCards = [
    {
      icon: Package,
      title: t.pendingProductionOrdersByBranch,
      description: locale === 'ko' ? '각 지점별 생산 대기 중인 주문 목록' : 'Production orders pending for each branch',
      href: '/production/pending-orders',
      color: 'bg-blue-500',
      count: stats.inProduction
    },
    {
      icon: Truck,
      title: t.pendingShipmentOrdersByBranch,
      description: locale === 'ko' ? '각 지점별 배송 대기 중인 주문 목록' : 'Shipment orders pending for each branch',
      href: '/production/pending-shipments',
      color: 'bg-green-500',
      count: stats.readyToShip
    },
    {
      icon: Factory,
      title: t.productionUpdates,
      description: locale === 'ko' ? '생산 진행 상황 업데이트' : 'Update production progress',
      href: '/production/production-updates',
      color: 'bg-orange-500',
      count: null
    },
    {
      icon: Ship,
      title: t.shipmentUpdates,
      description: locale === 'ko' ? '배송 상태 업데이트' : 'Update shipment status',
      href: '/production/shipment-updates',
      color: 'bg-teal-500',
      count: null
    },
    {
      icon: Wrench,
      title: t.materialsAwaitingPurchase,
      description: locale === 'ko' ? '구매 대기 중인 필수 자재 목록' : 'Essential materials awaiting purchase',
      href: '/production/materials-list',
      color: 'bg-purple-500',
      count: 12
    },
    {
      icon: AlertTriangle,
      title: t.dailyIssuesReport,
      description: locale === 'ko' ? '매일 발견된 문제점 업데이트' : 'Daily discovered issues update',
      href: '/production/daily-issues',
      color: 'bg-red-500',
      count: 3
    },
    {
      icon: Settings,
      title: t.dailyDevelopmentFixes,
      description: locale === 'ko' ? '매일 개발 및 문제 해결 업데이트' : 'Daily development and fixes update',
      href: '/production/development-fixes',
      color: 'bg-indigo-500',
      count: null
    },
    {
      icon: FlaskConical,
      title: t.postProductionTestResults,
      description: locale === 'ko' ? '생산 후 기기 테스트 결과 업데이트' : 'Post-production device test results',
      href: '/production/test-results',
      color: 'bg-cyan-500',
      count: 15
    },
    {
      icon: ClipboardCheck,
      title: t.qualityControlReports,
      description: locale === 'ko' ? 'QA/QC 품질 검사 보고서' : 'QA/QC quality inspection reports',
      href: '/production/qa-reports',
      color: 'bg-emerald-500',
      count: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-orange-600 hover:text-orange-800"
              >
                ← {t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏭</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {t.productionLogisticsDashboard}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {t.productionDepartmentDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalOrders}</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.inProduction}</p>
                <p className="text-3xl font-bold text-orange-600">{stats.inProduction}</p>
              </div>
              <Factory className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.readyToShip}</p>
                <p className="text-3xl font-bold text-green-600">{stats.readyToShip}</p>
              </div>
              <Truck className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.shipped}</p>
                <p className="text-3xl font-bold text-gray-800">{stats.shipped}</p>
              </div>
              <Ship className="w-12 h-12 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => router.push(card.href)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${card.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {card.title}
                      </h3>
                      {card.count !== null && (
                        <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                          {card.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {card.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
