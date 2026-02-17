'use client';

import { useState } from 'react';
import GeminiChat from '@/components/GeminiChat';
import CodeAnalyzer from '@/components/CodeAnalyzer';
import CodeGenerator from '@/components/CodeGenerator';

type Tab = 'chat' | 'analyze' | 'generate';

export default function GeminiAIPage() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🤖 Gemini AI Assistant</h1>
          <p className="text-gray-600">
            AI assistance system powered by Google Gemini / Google Gemini로 구동되는 AI 지원 시스템
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              💬 แชท
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'analyze'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔍 วิเคราะห์โค้ด
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'generate'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ✨ สร้างโค้ด
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'chat' && (
              <div>
                <GeminiChat />
              </div>
            )}
            {activeTab === 'analyze' && (
              <div>
                <CodeAnalyzer />
              </div>
            )}
            {activeTab === 'generate' && (
              <div>
                <CodeGenerator />
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-semibold mb-2">แชทอัจฉริยะ</h3>
            <p className="text-gray-600">
              สนทนากับ AI เพื่อขอคำแนะนำ แก้ปัญหา หรือถามคำถามต่างๆ
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold mb-2">วิเคราะห์โค้ด</h3>
            <p className="text-gray-600">
              วิเคราะห์โค้ดของคุณ ตรวจสอบคุณภาพ และรับคำแนะนำการปรับปรุง
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-xl font-semibold mb-2">สร้างโค้ด</h3>
            <p className="text-gray-600">
              สร้างโค้ดจากคำอธิบาย รองรับหลายภาษาโปรแกรม
            </p>
          </div>
        </div>

        {/* API Endpoints Info */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">📚 API Endpoints</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">POST /api/gemini/chat</p>
              <p className="text-gray-600">แชทกับ Gemini AI</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">POST /api/gemini/analyze</p>
              <p className="text-gray-600">วิเคราะห์โค้ด</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold">POST /api/gemini/generate</p>
              <p className="text-gray-600">สร้างโค้ดจากคำอธิบาย</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">POST /api/gemini/fix</p>
              <p className="text-gray-600">แก้ไขโค้ดที่มีบั๊ก</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-semibold">POST /api/gemini/translate</p>
              <p className="text-gray-600">แปลข้อความ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
