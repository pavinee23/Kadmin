'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/lib/LocaleContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  FlaskConical,
  Lightbulb,
  TestTube2,
  ScrollText,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  Clock,
  TrendingUp,
  Workflow,
} from 'lucide-react';

export default function ResearchDevelopmentDashboardPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = translations[locale];

  const stats = {
    ongoingProjects: 14,
    completedProjects: 38,
    pendingPatents: 5,
    budgetUtilization: 72.3,
  };

  const menuCards = [
    {
      icon: Lightbulb,
      title: t.activeProjects,
      description: t.activeProjectsDesc,
      href: '/research-development/active-projects',
      color: 'bg-blue-500',
      count: stats.ongoingProjects,
    },
    {
      icon: TestTube2,
      title: t.prototypeTesting,
      description: t.prototypeTestingDesc,
      href: '/research-development/prototype-testing',
      color: 'bg-green-500',
      count: 6,
    },
    {
      icon: ScrollText,
      title: t.patentManagement,
      description: t.patentManagementDesc,
      href: '/research-development/patents',
      color: 'bg-purple-500',
      count: stats.pendingPatents,
    },
    {
      icon: DollarSign,
      title: t.researchBudget,
      description: t.researchBudgetDesc,
      href: '/research-development/budget',
      color: 'bg-orange-500',
      count: null,
    },
    {
      icon: Workflow,
      title: t.flowSystem,
      description: t.flowSystemDesc,
      href: 'https://flow.team/signin.act',
      color: 'bg-cyan-600',
      count: null,
      external: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/')} className="text-cyan-600 hover:text-cyan-800 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />{t.back}
              </button>
              <div className="border-l-2 border-gray-300 pl-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t.rdDashboard}</h1>
                    <p className="text-sm text-gray-600">{t.rdDashboardDesc}</p>
                  </div>
                </div>
              </div>
            </div>
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
                <p className="text-sm text-gray-600">{t.ongoingProjects}</p>
                <p className="text-3xl font-bold text-blue-600">{stats.ongoingProjects}</p>
              </div>
              <Lightbulb className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.completedProjects}</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedProjects}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.pendingPatents}</p>
                <p className="text-3xl font-bold text-purple-600">{stats.pendingPatents}</p>
              </div>
              <Clock className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.budgetUtilization}</p>
                <p className="text-3xl font-bold text-cyan-600">{stats.budgetUtilization}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-cyan-500" />
            </div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {menuCards.map((card, index) => {
            const Icon = card.icon;
            const isExternal = card.external;
            
            if (isExternal) {
              return (
                <a
                  key={index}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${card.color} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors">{card.title}</h3>
                        {card.count !== null && (
                          <span className="bg-cyan-100 text-cyan-600 text-xs font-bold px-2 py-1 rounded-full">{card.count}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                  </div>
                </a>
              );
            }
            
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
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors">{card.title}</h3>
                      {card.count !== null && (
                        <span className="bg-cyan-100 text-cyan-600 text-xs font-bold px-2 py-1 rounded-full">{card.count}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{card.description}</p>
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
