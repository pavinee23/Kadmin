'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, Printer, FileDown } from 'lucide-react';

interface BranchReport {
  branchKey: string;
  quarterly: {
    q1: { sales: number; expenses: number; profit: number };
    q2: { sales: number; expenses: number; profit: number };
    q3: { sales: number; expenses: number; profit: number };
    q4: { sales: number; expenses: number; profit: number };
  };
  monthly: { month: string; sales: number; expenses: number; profit: number }[];
}

export default function SalesExpenseReportsPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];
  const [branchFilter, setBranchFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'quarterly' | 'monthly'>('quarterly');

  const branches = [
    { key: 'korea', name: t.korea, currency: '₩', flag: '🇰🇷' },
    { key: 'brunei', name: t.brunei, currency: 'B$', flag: '🇧🇳' },
    { key: 'thailand', name: t.thailand, currency: '฿', flag: '🇹🇭' },
    { key: 'vietnam', name: t.vietnam, currency: '₫', flag: '🇻🇳' },
  ];

  const monthNames = locale === 'ko'
    ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const branchReports: Record<string, BranchReport> = {
    korea: {
      branchKey: 'korea',
      quarterly: {
        q1: { sales: 8500000000, expenses: 5200000000, profit: 3300000000 },
        q2: { sales: 9200000000, expenses: 5800000000, profit: 3400000000 },
        q3: { sales: 10100000000, expenses: 6100000000, profit: 4000000000 },
        q4: { sales: 11500000000, expenses: 6500000000, profit: 5000000000 },
      },
      monthly: monthNames.map((m, i) => ({
        month: m,
        sales: 2800000000 + Math.floor(Math.random() * 1200000000),
        expenses: 1700000000 + Math.floor(Math.random() * 600000000),
        profit: 0,
      })).map(d => ({ ...d, profit: d.sales - d.expenses })),
    },
    brunei: {
      branchKey: 'brunei',
      quarterly: {
        q1: { sales: 450000, expenses: 280000, profit: 170000 },
        q2: { sales: 520000, expenses: 310000, profit: 210000 },
        q3: { sales: 580000, expenses: 340000, profit: 240000 },
        q4: { sales: 620000, expenses: 360000, profit: 260000 },
      },
      monthly: monthNames.map((m, i) => ({
        month: m,
        sales: 140000 + Math.floor(Math.random() * 80000),
        expenses: 85000 + Math.floor(Math.random() * 40000),
        profit: 0,
      })).map(d => ({ ...d, profit: d.sales - d.expenses })),
    },
    thailand: {
      branchKey: 'thailand',
      quarterly: {
        q1: { sales: 42000000, expenses: 25000000, profit: 17000000 },
        q2: { sales: 48000000, expenses: 28000000, profit: 20000000 },
        q3: { sales: 53000000, expenses: 31000000, profit: 22000000 },
        q4: { sales: 58000000, expenses: 33000000, profit: 25000000 },
      },
      monthly: monthNames.map((m, i) => ({
        month: m,
        sales: 14000000 + Math.floor(Math.random() * 6000000),
        expenses: 8000000 + Math.floor(Math.random() * 3000000),
        profit: 0,
      })).map(d => ({ ...d, profit: d.sales - d.expenses })),
    },
    vietnam: {
      branchKey: 'vietnam',
      quarterly: {
        q1: { sales: 35000000000, expenses: 22000000000, profit: 13000000000 },
        q2: { sales: 40000000000, expenses: 25000000000, profit: 15000000000 },
        q3: { sales: 45000000000, expenses: 27000000000, profit: 18000000000 },
        q4: { sales: 50000000000, expenses: 29000000000, profit: 21000000000 },
      },
      monthly: monthNames.map((m, i) => ({
        month: m,
        sales: 12000000000 + Math.floor(Math.random() * 5000000000),
        expenses: 7000000000 + Math.floor(Math.random() * 3000000000),
        profit: 0,
      })).map(d => ({ ...d, profit: d.sales - d.expenses })),
    },
  };

  const formatCurrency = (v: number, branch: string) => {
    const symbols: Record<string, string> = { korea: '₩', brunei: 'B$', thailand: '฿', vietnam: '₫' };
    return (symbols[branch] || '₩') + new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(v);
  };

  const formatCompact = (v: number, branch: string) => {
    const symbols: Record<string, string> = { korea: '₩', brunei: 'B$', thailand: '฿', vietnam: '₫' };
    const prefix = symbols[branch] || '₩';
    if (v >= 1000000000000) return prefix + (v / 1000000000000).toFixed(1) + 'T';
    if (v >= 1000000000) return prefix + (v / 1000000000).toFixed(1) + 'B';
    if (v >= 1000000) return prefix + (v / 1000000).toFixed(1) + 'M';
    if (v >= 1000) return prefix + (v / 1000).toFixed(1) + 'K';
    return prefix + v.toString();
  };

  const visibleBranches = branchFilter === 'all' ? branches : branches.filter(b => b.key === branchFilter);

  const getGrowthRate = (report: BranchReport) => {
    const q1Total = report.quarterly.q1.sales;
    const q4Total = report.quarterly.q4.sales;
    return ((q4Total - q1Total) / q1Total * 100).toFixed(1);
  };

  const getMaxBarValue = (data: { sales: number; expenses: number }[]) => {
    return Math.max(...data.map(d => Math.max(d.sales, d.expenses)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/international-market/dashboard')} className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">{t.salesExpenseReports}</h1>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="all">{t.allBranches}</option>
              {branches.map(b => <option key={b.key} value={b.key}>{b.flag} {b.name}</option>)}
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setViewMode('quarterly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'quarterly' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                {t.quarterlyReport}
              </button>
              <button onClick={() => setViewMode('monthly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'monthly' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                {t.monthly}
              </button>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"><Printer className="w-4 h-4" />{t.printDocument}</button>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"><FileDown className="w-4 h-4" />{t.exportPDF}</button>
            </div>
          </div>
        </div>

        {/* Branch Reports */}
        {visibleBranches.map(branch => {
          const report = branchReports[branch.key];
          const growth = getGrowthRate(report);
          const totalSales = Object.values(report.quarterly).reduce((sum, q) => sum + q.sales, 0);
          const totalExpenses = Object.values(report.quarterly).reduce((sum, q) => sum + q.expenses, 0);
          const totalProfit = totalSales - totalExpenses;
          const profitMargin = ((totalProfit / totalSales) * 100).toFixed(1);

          return (
            <div key={branch.key} className="mb-8">
              {/* Branch Header */}
              <div className="bg-white rounded-t-lg shadow-md p-4 border-b-2 border-emerald-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{branch.flag}</span>
                    <h2 className="text-xl font-bold text-gray-800">{branch.name}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${Number(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(growth) >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                      {' '}{growth}% {t.growthRate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 mb-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-sm text-gray-600">{t.totalSales}</p>
                  <p className="text-lg font-bold text-green-600">{formatCompact(totalSales, branch.key)}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-sm text-gray-600">{t.expenses}</p>
                  <p className="text-lg font-bold text-red-600">{formatCompact(totalExpenses, branch.key)}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-sm text-gray-600">{t.totalProfit}</p>
                  <p className="text-lg font-bold text-blue-600">{formatCompact(totalProfit, branch.key)}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-sm text-gray-600">{t.profitMargin}</p>
                  <p className="text-lg font-bold text-purple-600">{profitMargin}%</p>
                </div>
              </div>

              {viewMode === 'quarterly' ? (
                <>
                  {/* Quarterly Bar Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">{t.quarterlyReport} - 2026</h3>
                    <div className="flex items-end gap-4 h-48">
                      {(['q1', 'q2', 'q3', 'q4'] as const).map(q => {
                        const data = report.quarterly[q];
                        const maxVal = Math.max(...Object.values(report.quarterly).map(v => Math.max(v.sales, v.expenses)));
                        const salesHeight = (data.sales / maxVal) * 100;
                        const expensesHeight = (data.expenses / maxVal) * 100;
                        const qLabel = { q1: t.q1, q2: t.q2, q3: t.q3, q4: t.q4 }[q];
                        return (
                          <div key={q} className="flex-1 flex flex-col items-center">
                            <div className="flex items-end gap-1 h-40 w-full justify-center">
                              <div className="w-1/3 bg-green-400 rounded-t-sm transition-all" style={{ height: `${salesHeight}%` }} title={formatCurrency(data.sales, branch.key)} />
                              <div className="w-1/3 bg-red-400 rounded-t-sm transition-all" style={{ height: `${expensesHeight}%` }} title={formatCurrency(data.expenses, branch.key)} />
                            </div>
                            <span className="text-xs text-gray-600 mt-2 font-medium">{qLabel}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 rounded-sm" />{t.salesAmount}</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm" />{t.expenseAmount}</div>
                    </div>
                  </div>

                  {/* Quarterly Table */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-emerald-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.reportPeriod}</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.salesAmount}</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.expenseAmount}</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.totalProfit}</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.profitMargin}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {(['q1', 'q2', 'q3', 'q4'] as const).map(q => {
                          const data = report.quarterly[q];
                          const margin = ((data.profit / data.sales) * 100).toFixed(1);
                          const qLabel = { q1: t.q1, q2: t.q2, q3: t.q3, q4: t.q4 }[q];
                          return (
                            <tr key={q} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium">{qLabel} 2026</td>
                              <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">{formatCurrency(data.sales, branch.key)}</td>
                              <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{formatCurrency(data.expenses, branch.key)}</td>
                              <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">{formatCurrency(data.profit, branch.key)}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${Number(margin) >= 30 ? 'bg-green-100 text-green-700' : Number(margin) >= 20 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                  {margin}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="bg-emerald-50 font-bold">
                          <td className="px-4 py-3 text-sm">{locale === 'ko' ? '합계' : 'Total'}</td>
                          <td className="px-4 py-3 text-sm text-right text-green-700">{formatCurrency(totalSales, branch.key)}</td>
                          <td className="px-4 py-3 text-sm text-right text-red-700">{formatCurrency(totalExpenses, branch.key)}</td>
                          <td className="px-4 py-3 text-sm text-right text-blue-700">{formatCurrency(totalProfit, branch.key)}</td>
                          <td className="px-4 py-3 text-sm text-right"><span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">{profitMargin}%</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  {/* Monthly Bar Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">{t.monthly} - 2026</h3>
                    <div className="flex items-end gap-1 h-48">
                      {report.monthly.map((m, i) => {
                        const maxVal = getMaxBarValue(report.monthly);
                        const salesHeight = (m.sales / maxVal) * 100;
                        const expensesHeight = (m.expenses / maxVal) * 100;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="flex items-end gap-px h-40 w-full justify-center">
                              <div className="w-2/5 bg-green-400 rounded-t-sm transition-all" style={{ height: `${salesHeight}%` }} title={formatCurrency(m.sales, branch.key)} />
                              <div className="w-2/5 bg-red-400 rounded-t-sm transition-all" style={{ height: `${expensesHeight}%` }} title={formatCurrency(m.expenses, branch.key)} />
                            </div>
                            <span className="text-[10px] text-gray-500 mt-1">{m.month}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 rounded-sm" />{t.salesAmount}</div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm" />{t.expenseAmount}</div>
                    </div>
                  </div>

                  {/* Monthly Table */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-emerald-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.reportPeriod}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.salesAmount}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.expenseAmount}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.totalProfit}</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t.profitMargin}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {report.monthly.map((m, idx) => {
                            const margin = ((m.profit / m.sales) * 100).toFixed(1);
                            return (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium">{m.month} 2026</td>
                                <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">{formatCurrency(m.sales, branch.key)}</td>
                                <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{formatCurrency(m.expenses, branch.key)}</td>
                                <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">{formatCurrency(m.profit, branch.key)}</td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${Number(margin) >= 30 ? 'bg-green-100 text-green-700' : Number(margin) >= 20 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {margin}%
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
