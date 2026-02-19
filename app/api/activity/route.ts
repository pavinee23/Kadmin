import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest) {
  try {
    const sql = `
      (SELECT 'order' AS type, orderNo AS title, created_at AS ts, orderID AS ref_id FROM purchase_orders ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'customer' AS type, fullname AS title, created_at AS ts, cusID AS ref_id FROM cus_detail ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'invoice' AS type, invNo AS title, created_at AS ts, invID AS ref_id FROM invoices ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'quotation' AS type, quoteNo AS title, created_at AS ts, quoteID AS ref_id FROM quotations ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'receipt' AS type, receiptNo AS title, created_at AS ts, receiptID AS ref_id FROM receipts ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'contract' AS type, contractNo AS title, created_at AS ts, contractID AS ref_id FROM contracts ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'sales' AS type, orderNo AS title, created_at AS ts, orderID AS ref_id FROM sales_orders ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'followup' AS type, CONCAT('Follow-up #', followUpID) AS title, created_at AS ts, followUpID AS ref_id FROM follow_ups ORDER BY created_at DESC LIMIT 5)
      ORDER BY ts DESC
      LIMIT 24
    `

    const [rows]: any = await pool.query(sql)

    const activities = (Array.isArray(rows) ? rows : []).map((r: any) => ({
      type: r.type,
      title: r.title || '-',
      ts: r.ts,
      ref_id: r.ref_id
    }))

    return NextResponse.json({ success: true, activities })
  } catch (error: any) {
    console.error('Activity API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
