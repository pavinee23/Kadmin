'use client';

import { Home, Users, FileText, BarChart3, Settings, Bell, MapPin, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomePage() {
  const pathname = usePathname();

  const features = [
    { 
      icon: Users, 
      title: '사용자 관리',
      description: '직원 및 사용자 계정 관리',
      href: '/users',
      color: 'bg-blue-500'
    },
    { 
      icon: FileText, 
      title: '문서 관리',
      description: '문서 및 보고서 관리 시스템',
      href: '/documents',
      color: 'bg-green-500'
    },
    { 
      icon: BarChart3, 
      title: '통계 및 분석',
      description: '데이터 분석 및 리포팅',
      href: '/analytics',
      color: 'bg-purple-500'
    },
    { 
      icon: Package, 
      title: '재고 관리',
      description: '제품 및 재고 추적',
      href: '/inventory',
      color: 'bg-orange-500'
    },
    { 
      icon: MapPin, 
      title: '위치 관리',
      description: '지점 및 위치 정보',
      href: '/locations',
      color: 'bg-red-500'
    },
    { 
      icon: Bell, 
      title: '알림 센터',
      description: '시스템 알림 및 공지사항',
      href: '/notifications',
      color: 'bg-yellow-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Korea Management System</h1>
                <p className="text-sm text-gray-500">한국 관리 시스템</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <Link 
                href="/settings"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">관리</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">환영합니다!</h2>
          <p className="text-lg text-gray-600">
            Korea Management System에 오신 것을 환영합니다. 아래에서 원하시는 기능을 선택하세요.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">시스템 개요</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">247</div>
              <div className="text-sm text-gray-600">총 사용자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">1,453</div>
              <div className="text-sm text-gray-600">문서 수</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">89</div>
              <div className="text-sm text-gray-600">활성 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
              <div className="text-sm text-gray-600">지점</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Korea Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
