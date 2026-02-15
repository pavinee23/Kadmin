'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  ClipboardCheck,
  Zap,
  Search,
  FileSignature,
  TestTube2,
  BarChart3,
  ArrowLeft,
  Package,
  TrendingUp,
  DollarSign,
  FileText,
} from 'lucide-react';

export default function DomesticMarketDashboardPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  const stats = {
    totalSales: 39300000000,
    pendingApprovals: 8,
    activeContracts: 21,
    completedTests: 15,
  };

  const menuCards = [
    {
      icon: ClipboardCheck,
      title: t.salesApprovals,
      description: t.domesticSalesApprovalsDesc,
      href: '/domestic-market/sales-approvals',
      color: 'bg-blue-500',
      count: 28,
    },
    {
      icon: Zap,
      title: t.electricityCostCalc,
      description: t.domesticElectricityCostCalcDesc,
      href: '/domestic-market/electricity-calc',
      color: 'bg-yellow-500',
      count: 18,
    },
    {
      icon: Search,
      title: t.siteInspection,
      description: t.domesticSiteInspectionDesc,
      href: '/domestic-market/site-inspection',
      color: 'bg-green-500',
      count: 22,
    },
    {
      icon: FileSignature,
      title: t.salesContracts,
      description: t.domesticSalesContractsDesc,
      href: '/domestic-market/sales-contracts',
      color: 'bg-purple-500',
      count: 21,
    },
    {
      icon: TestTube2,
      title: t.equipmentTestReport,
      description: t.domesticEquipmentTestDesc,
      href: '/domestic-market/equipment-test',
      color: 'bg-red-500',
      count: 15,
    },
    {
      icon: BarChart3,
      title: t.salesUpdateReports,
      description: t.domesticSalesReportsDesc,
      href: '/domestic-market/sales-reports',
      color: 'bg-emerald-500',
      count: null,
    },
  ];

  const formatCurrency = (value: number) => {
    return '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-orange-600 hover:text-orange-800 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {t.domesticMarketDashboard}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {t.domesticMarketDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇰🇷</span>
              <LanguageSwitcher />
            </div>
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
                <p className="text-sm text-gray-600">{t.totalSales}</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalSales)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.pending}</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingApprovals}</p>
              </div>
              <FileText className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.salesContracts}</p>
                <p className="text-3xl font-bold text-blue-600">{stats.activeContracts}</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.equipmentTestReport}</p>
                <p className="text-3xl font-bold text-purple-600">{stats.completedTests}</p>
              </div>
              <TestTube2 className="w-12 h-12 text-purple-500" />
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
