import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export const runtime = 'nodejs'
// Prevent prerendering during build; ensure this API runs at runtime
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  let conn: any = null
  try {
    conn = await pool.getConnection()
    const queries = [
      { key: 'orders', q: 'SELECT COUNT(*) AS cnt FROM purchase_orders' },
      { key: 'customers', q: 'SELECT COUNT(*) AS cnt FROM cus_detail' },
      { key: 'products', q: 'SELECT COUNT(*) AS cnt FROM product_list' },
      { key: 'invoices', q: 'SELECT COUNT(*) AS cnt FROM invoices' },
      { key: 'quotations', q: 'SELECT COUNT(*) AS cnt FROM quotations' },
      { key: 'contracts', q: 'SELECT COUNT(*) AS cnt FROM contracts' },
      { key: 'followUps', q: "SELECT COUNT(*) AS cnt FROM follow_ups WHERE status NOT IN ('done','closed')" },
      { key: 'preInstallations', q: 'SELECT COUNT(*) AS cnt FROM pre_installation_forms WHERE orderID IS NULL OR orderID = 0' },
      { key: 'salesOrders', q: 'SELECT COUNT(*) AS cnt FROM sales_orders' },
      { key: 'receipts', q: 'SELECT COUNT(*) AS cnt FROM receipts' },
      { key: 'deliveryNotes', q: 'SELECT COUNT(*) AS cnt FROM delivery_notes' },
      { key: 'powerCalculations', q: 'SELECT COUNT(*) AS cnt FROM power_calculations' },
      { key: 'taxInvoices', q: 'SELECT COUNT(*) AS cnt FROM tax_invoices' },
      { key: 'pendingBills', q: 'SELECT COUNT(*) AS cnt FROM `Pending Bills`' },
      { key: 'customerTesting', q: 'SELECT COUNT(*) AS cnt FROM customer_testing' },
      { key: 'suppliers', q: 'SELECT COUNT(*) AS cnt FROM suppliers' },
      { key: 'koreaTracking', q: 'SELECT COUNT(*) AS cnt FROM korea_order_tracking' }
    ]

    const results = await Promise.all(queries.map(item =>
      conn.query(item.q).then((r:any)=>({ key: item.key, val: r[0][0].cnt })).catch(err=>{
        console.error('stats query error for', item.key, err && err.code)
        return { key: item.key, val: 0 }
      })
    ))

    const stats: any = {}
    for (const r of results) stats[r.key] = Number(r.val || 0)

    return NextResponse.json({ success: true, stats })
  } catch (err) {
    console.error('stats GET error:', err)
    return NextResponse.json({ success: false, stats: {} }, { status: 200 })
  } finally {
    try { if (conn) conn.release() } catch (e) {}
  }
}
