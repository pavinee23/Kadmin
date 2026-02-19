"use client"

import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import styles from '../admin-theme.module.css'

type Customer = {
  cusID: number,
  fullname: string,
  email?: string | null,
  phone?: string | null,
  company?: string | null,
  address?: string | null,
  subject?: string | null,
  message?: string | null,
  created_by?: string | null,
  created_at?: string | null
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [locale, setLocale] = useState<'en'|'th'>(() => {
    try {
      const l = localStorage.getItem('locale') || localStorage.getItem('k_system_lang')
      return l === 'th' ? 'th' : 'en'
    } catch { return 'th' }
  })

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as any).detail
      const v = typeof d === 'string' ? d : d?.locale
      if (v === 'en' || v === 'th') setLocale(v)
    }
    window.addEventListener('k-system-lang', handler)
    window.addEventListener('locale-changed', handler)
    return () => {
      window.removeEventListener('k-system-lang', handler)
      window.removeEventListener('locale-changed', handler)
    }
  }, [])

  const L = (en: string, th: string) => locale === 'th' ? th : en

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/customers')
      const j = await res.json()
      if (j && Array.isArray(j.customers)) setCustomers(j.customers)
    } catch (err) {
      console.error('Failed to load customers', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Customers" titleTh="รายละเอียดลูกค้า">
      <div className={styles.contentCard}>
        <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className={styles.cardTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {L('Customer List', 'รายการลูกค้า')}
            </h2>
            <p className={styles.cardSubtitle}>
              {L(`${customers.length} customers`, `${customers.length} รายการ`)}
            </p>
          </div>

          <a href="/Thailand/Admin-Login/customer-add" className={styles.btnPrimary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            {L('Add Customer', 'เพิ่มลูกค้า')}
          </a>
        </div>

        <div className={styles.cardBody} style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              {L('Loading...', 'กำลังโหลด...')}
            </div>
          ) : customers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              {L('No customers yet', 'ยังไม่มีลูกค้า')}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>{L('ID', 'รหัส')}</th>
                    <th>{L('Name', 'ชื่อ-นามสกุล')}</th>
                    <th>{L('Email', 'อีเมล')}</th>
                    <th>{L('Phone', 'โทรศัพท์')}</th>
                    <th>{L('Company', 'บริษัท')}</th>
                    <th style={{ maxWidth: '200px' }}>{L('Address', 'ที่อยู่')}</th>
                    <th>{L('Created By', 'สร้างโดย')}</th>
                    <th>{L('Created At', 'วันที่สร้าง')}</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.cusID}>
                      <td>#{c.cusID}</td>
                      <td style={{ fontWeight: 600 }}>{c.fullname}</td>
                      <td>{c.email || '-'}</td>
                      <td>{c.phone || '-'}</td>
                      <td>{c.company || '-'}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.address || '-'}
                      </td>
                      <td>{c.created_by || '-'}</td>
                      <td>
                        {c.created_at
                          ? new Date(c.created_at).toLocaleDateString('th-TH')
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
