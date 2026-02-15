'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

export default function RevenueReportsPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

  const formatCurrency = (v: number) => '₩' + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);

  const dailyData = [
    { date: '2026-02-15', sales: 45000000, returns: 2000000, net: 43000000 },
    { date: '2026-02-14', sales: 38000000, returns: 1500000, net: 36500000 },
    { date: '2026-02-13', sales: 52000000, returns: 3000000, net: 49000000 },
    { date: '2026-02-12', sales: 41000000, returns: 500000, net: 40500000 },
    { date: '2026-02-11', sales: 67000000, returns: 4000000, net: 63000000 },
    { date: '2026-02-10', sales: 33000000, returns: 1000000, net: 32000000 },
    { date: '2026-02-09', sales: 28000000, returns: 800000, net: 27200000 },
    { date: '2026-02-08', sales: 55000000, returns: 2500000, net: 52500000 },
    { date: '2026-02-07', sales: 48000000, returns: 1200000, net: 46800000 },
    { date: '2026-02-06', sales: 62000000, returns: 3500000, net: 58500000 },
    { date: '2026-02-05', sales: 39000000, returns: 900000, net: 38100000 },
    { date: '2026-02-04', sales: 44000000, returns: 1600000, net: 42400000 },
    { date: '2026-02-03', sales: 51000000, returns: 2200000, net: 48800000 },
    { date: '2026-02-02', sales: 36000000, returns: 1300000, net: 34700000 },
    { date: '2026-02-01', sales: 57000000, returns: 2800000, net: 54200000 },
  ];

  const monthlyData = [
    { month: locale === 'ko' ? '2026년 2월' : 'Feb 2026', sales: 696000000, returns: 28800000, net: 667200000 },
    { month: locale === 'ko' ? '2026년 1월' : 'Jan 2026', sales: 845000000, returns: 42000000, net: 803000000 },
    { month: locale === 'ko' ? '2025년 12월' : 'Dec 2025', sales: 920000000, returns: 38000000, net: 882000000 },
    { month: locale === 'ko' ? '2025년 11월' : 'Nov 2025', sales: 780000000, returns: 35000000, net: 745000000 },
    { month: locale === 'ko' ? '2025년 10월' : 'Oct 2025', sales: 710000000, returns: 31000000, net: 679000000 },
    { month: locale === 'ko' ? '2025년 9월' : 'Sep 2025', sales: 650000000, returns: 28000000, net: 622000000 },
    { month: locale === 'ko' ? '2025년 8월' : 'Aug 2025', sales: 590000000, returns: 25000000, net: 565000000 },
    { month: locale === 'ko' ? '2025년 7월' : 'Jul 2025', sales: 620000000, returns: 27000000, net: 593000000 },
    { month: locale === 'ko' ? '2025년 6월' : 'Jun 2025', sales: 680000000, returns: 30000000, net: 650000000 },
    { month: locale === 'ko' ? '2025년 5월' : 'May 2025', sales: 750000000, returns: 33000000, net: 717000000 },
    { month: locale === 'ko' ? '2025년 4월' : 'Apr 2025', sales: 820000000, returns: 36000000, net: 784000000 },
    { month: locale === 'ko' ? '2025년 3월' : 'Mar 2025', sales: 890000000, returns: 39000000, net: 851000000 },
  ];

  const yearlyData = [
    { year: '2026', sales: 1541000000, returns: 70800000, net: 1470200000 },
    { year: '2025', sales: 8910000000, returns: 372000000, net: 8538000000 },
    { year: '2024', sales: 7650000000, returns: 340000000, net: 7310000000 },
    { year: '2023', sales: 6200000000, returns: 290000000, net: 5910000000 },
    { year: '2022', sales: 5100000000, returns: 250000000, net: 4850000000 },
  ];

  const currentData = viewMode === 'daily' ? dailyData : viewMode === 'monthly' ? monthlyData : yearlyData;
  const totalSales = currentData.reduce((sum, d) => sum + d.sales, 0);
  const totalReturns = currentData.reduce((sum, d) => sum + d.returns, 0);
  const totalNet = currentData.reduce((sum, d) => sum + d.net, 0);
  const maxSales = Math.max(...currentData.map(d => d.sales));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/hr/dashboard')} className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{t.revenueReports}</h1>
                  <p className="text-sm text-gray-600">{t.revenueReportsDesc}</p>
                </div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '총 판매액' : 'Total Sales'}</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalSales)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '총 반품/환불' : 'Total Returns/Refunds'}</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalReturns)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600">{locale === 'ko' ? '순 매출' : 'Net Revenue'}</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalNet)}</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{locale === 'ko' ? '보기 모드:' : 'View Mode:'}</span>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button onClick={() => setViewMode('daily')} className={`px-4 py-2 text-sm font-medium ${viewMode === 'daily' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>{t.daily}</button>
            <button onClick={() => setViewMode('monthly')} className={`px-4 py-2 text-sm font-medium border-x border-gray-300 ${viewMode === 'monthly' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>{t.monthly}</button>
            <button onClick={() => setViewMode('yearly')} className={`px-4 py-2 text-sm font-medium ${viewMode === 'yearly' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>{t.yearly}</button>
          </div>
        </div>

        {/* Chart-like visualization */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            {locale === 'ko' ? '매출 추이' : 'Revenue Trend'}
          </h3>
          <div className="space-y-3">
            {currentData.map((d, i) => {
              const label = 'date' in d ? d.date : 'month' in d ? (d as any).month : (d as any).year;
              const barWidth = (d.sales / maxSales) * 100;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-28 text-sm text-gray-600 font-medium shrink-0">{label}</div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg transition-all duration-500" style={{ width: `${barWidth}%` }} />
                    </div>
                  </div>
                  <div className="w-36 text-right text-sm font-semibold text-gray-700 shrink-0">{formatCurrency(d.sales)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-4">
            <h2 className="text-white font-bold text-lg">
              {viewMode === 'daily' ? (locale === 'ko' ? '일별 매출 상세' : 'Daily Revenue Details')
                : viewMode === 'monthly' ? (locale === 'ko' ? '월별 매출 상세' : 'Monthly Revenue Details')
                : (locale === 'ko' ? '연도별 매출 상세' : 'Yearly Revenue Details')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    {viewMode === 'daily' ? t.date : viewMode === 'monthly' ? (locale === 'ko' ? '월' : 'Month') : (locale === 'ko' ? '연도' : 'Year')}
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '판매액' : 'Sales'}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '반품/환불' : 'Returns'}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '순 매출' : 'Net Revenue'}</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">{locale === 'ko' ? '이익률' : 'Margin'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((d, i) => {
                  const label = 'date' in d ? d.date : 'month' in d ? (d as any).month : (d as any).year;
                  const margin = ((d.net / d.sales) * 100).toFixed(1);
                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{i + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{label}</td>
                      <td className="px-6 py-4 text-sm text-emerald-600 text-right font-medium">{formatCurrency(d.sales)}</td>
                      <td className="px-6 py-4 text-sm text-red-600 text-right">{formatCurrency(d.returns)}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 text-right font-semibold">{formatCurrency(d.net)}</td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{margin}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="px-6 py-4 text-sm" colSpan={2}>{locale === 'ko' ? '합계' : 'Total'}</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 text-right">{formatCurrency(totalSales)}</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-right">{formatCurrency(totalReturns)}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 text-right">{formatCurrency(totalNet)}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{((totalNet / totalSales) * 100).toFixed(1)}%</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
