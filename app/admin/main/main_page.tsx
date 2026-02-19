"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminMainPage() {
  const router = useRouter()
  const [, setToken] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomUrl, setZoomUrl] = useState('')

  useEffect(() => {
    try {
      const t = localStorage.getItem('k_system_admin_token')
      setToken(t)
    } catch (err) {
      console.error('Failed to read token', err)
      setToken(null)
    } finally {
      setChecking(false)
    }
  }, [])

  function handleOpenZoom() {
    const defaultZoomUrl = 'https://zoom.us/j/YOUR_MEETING_ID'
    setZoomUrl(defaultZoomUrl)
    setShowZoom(true)
  }

  function handleCloseZoom() {
    setShowZoom(false)
    setZoomUrl('')
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' }}>
        <div style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>Loading admin...</div>
      </div>
    )
  }

  const systems = [
    {
      title: 'K-SAVE',
      desc: 'Monitoring & IoT System',
      href: '/',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#dbeafe',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="10" rx="2" fill="#dbeafe"/><circle cx="8" cy="12" r="1.8" fill="#2563eb"/><circle cx="16" cy="12" r="1.8" fill="#2563eb"/>
        </svg>
      )
    },
    {
      title: 'Thailand Admin',
      desc: 'Thailand Branch Management',
      href: '/Thailand/Admin-Login',
      color: '#059669',
      bg: '#ecfdf5',
      border: '#d1fae5',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="#d1fae5"/><path d="M7 10h10" strokeLinecap="round"/><path d="M7 14h6" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Korea Admin',
      desc: 'Korea HQ Management',
      href: '/Korea/Admin-Login',
      color: '#b45309',
      bg: '#fffbeb',
      border: '#fef3c7',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" fill="#fef3c7"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      title: 'System 4',
      desc: 'Reports & Analytics',
      href: '/admin/main/report',
      color: '#6366f1',
      bg: '#eef2ff',
      border: '#e0e7ff',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#e0e7ff"/><path d="M7 14h3v3H7zM11 10h3v7h-3zM15 7h3v10h-3z" fill="#6366f1"/>
        </svg>
      )
    }
  ]

  const rdSystems = [
    {
      title: 'K-SAVE R&D',
      desc: 'R&D Testing System',
      href: '/admin/rd-login',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#dbeafe',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="10" rx="2" fill="#dbeafe"/><circle cx="8" cy="12" r="1.8" fill="#2563eb"/><circle cx="16" cy="12" r="1.8" fill="#2563eb"/>
        </svg>
      )
    },
    {
      title: 'Thailand Admin R&D',
      desc: 'Thailand R&D Portal',
      href: '/admin/tokens',
      color: '#059669',
      bg: '#ecfdf5',
      border: '#d1fae5',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="#d1fae5"/><path d="M7 10h10" strokeLinecap="round"/><path d="M7 14h6" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'System 3 R&D',
      desc: 'System 3 R&D Portal',
      href: '/admin/add-machine',
      color: '#b45309',
      bg: '#fffbeb',
      border: '#fef3c7',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="12" rx="2" fill="#fef3c7"/><path d="M8 16v2" strokeLinecap="round"/><path d="M16 16v2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'System 4 R&D',
      desc: 'System 4 R&D Portal',
      href: '/admin/AdminKsave',
      color: '#6366f1',
      bg: '#eef2ff',
      border: '#e0e7ff',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#e0e7ff"/><path d="M7 14h3v3H7zM11 10h3v7h-3zM15 7h3v10h-3z" fill="#6366f1"/>
        </svg>
      )
    }
  ]

  const cardStyle = (_color: string, _bg: string, border: string): React.CSSProperties => ({
    display: 'block', padding: '20px 22px', borderRadius: 14,
    background: '#fff', border: `1px solid ${border}`,
    textDecoration: 'none', color: '#111827',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    cursor: 'pointer'
  })

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%)' }}>
      {/* Top Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', background: '#fff', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
            <img src="/k-energy-save-logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Admin System</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>K Energy Save Co., Ltd. (Group of Zera)</div>
          </div>
        </div>
        <button onClick={() => router.push('/admin/LoginMain')} style={{
          padding: '8px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.08)', color: '#e2e8f0', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.2s'
        }}
        onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
          Sign out
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #3b82f6 100%)',
          borderRadius: 18, padding: '36px 40px', marginBottom: 32, color: '#fff',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(37,99,235,0.25)'
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: 80, bottom: -50, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 12, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
              Admin Control Panel
            </div>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em' }}>K Energy Save Co., Ltd. (Group of Zera)</h1>
            <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.75, maxWidth: 600 }}>
              1114,27 Dunchon-daero 457beon-gil, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea
            </p>
          </div>
        </div>

        {/* Systems Section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2, background: 'linear-gradient(180deg, #2563eb, #3b82f6)' }} />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>Systems</h2>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Select a system to login</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {systems.map((sys, i) => (
              <Link key={i} href={sys.href} style={cardStyle(sys.color, sys.bg, sys.border)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${sys.color}18`; e.currentTarget.style.borderColor = sys.color }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = sys.border }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: sys.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {sys.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b', marginBottom: 2 }}>{sys.title}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>{sys.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Zoom */}
        <div style={{ marginBottom: 36, background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb"><path d="M22.8 4.8c-.6-.45-1.35-.3-1.95.15L16.5 8.4V6c0-1.65-1.35-3-3-3H3c-1.65 0-3 1.35-3 3v12c0 1.65 1.35 3 3 3h10.5c1.65 0 3-1.35 3-3v-2.4l4.35 3.45c.3.3.6.45 1.05.45.3 0 .45 0 .75-.15.6-.45 1.05-1.05 1.05-1.8V6.6c0-.75-.3-1.35-.9-1.8z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>Zoom Meeting</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>Join or start a meeting</div>
              </div>
            </div>
            <button onClick={handleOpenZoom} style={{
              padding: '9px 20px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600,
              background: '#2563eb', color: '#fff', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#1d4ed8')}
            onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}>
              Join Meeting
            </button>
          </div>
        </div>

        {/* R&D Portal */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2, background: 'linear-gradient(180deg, #7c3aed, #a78bfa)' }} />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>R&D Portal</h2>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Research & Development systems</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {rdSystems.map((sys, i) => (
              <Link key={i} href={sys.href} style={cardStyle(sys.color, sys.bg, sys.border)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${sys.color}18`; e.currentTarget.style.borderColor = sys.color }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = sys.border }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: sys.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {sys.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b', marginBottom: 2 }}>{sys.title}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>{sys.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px 0', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: 12 }}>
          K Energy Save Co., Ltd. (Group of Zera) Admin System
        </div>
      </div>

      {/* Zoom Meeting Modal */}
      {showZoom && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}
          onClick={e => { if (e.target === e.currentTarget) handleCloseZoom() }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: '#2D8CFF', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.8 4.8c-.6-.45-1.35-.3-1.95.15L16.5 8.4V6c0-1.65-1.35-3-3-3H3c-1.65 0-3 1.35-3 3v12c0 1.65 1.35 3 3 3h10.5c1.65 0 3-1.35 3-3v-2.4l4.35 3.45c.3.3.6.45 1.05.45.3 0 .45 0 .75-.15.6-.45 1.05-1.05 1.05-1.8V6.6c0-.75-.3-1.35-.9-1.8z"/></svg>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Zoom Meeting</h2>
            </div>
            <button onClick={handleCloseZoom} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 24, width: 40, height: 40, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✕
            </button>
          </div>
          <iframe src={zoomUrl} style={{ flex: 1, width: '100%', border: 'none', background: '#000' }} title="Zoom Meeting" allow="camera; microphone; fullscreen; speaker; display-capture" />
        </div>
      )}
    </div>
  )
}
