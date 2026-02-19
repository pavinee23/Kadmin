import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id') || searchParams.get('receiptID')
    const invNo = searchParams.get('invNo')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const baseSelect = `
      SELECT
        r.receiptID,
        r.receiptNo,
        r.receiptDate,
        r.invID,
        r.cusID,
        r.amount,
        r.amount_out,
        r.payment_method,
        r.notes,
        r.created_by,
        r.created_at,
        COALESCE(c.fullname, '-') as customer
      FROM receipts r
      LEFT JOIN cus_detail c ON r.cusID = c.cusID
    `

    // Single receipt by ID
    if (id) {
      const [rows]: any = await pool.query(baseSelect + ` WHERE r.receiptID = ?`, [id])
      const receipt = rows?.[0] || null
      return NextResponse.json({
        success: true,
        receipt,
        receipts: rows
      })
    }

    // Receipts by invoice number
    if (invNo) {
      const [rows]: any = await pool.query(baseSelect + ` WHERE r.invID = ? OR r.receiptNo LIKE ?`, [invNo, `%${invNo}%`])
      return NextResponse.json({
        success: true,
        receipts: rows,
        rows
      })
    }

    // List all receipts
    let query = baseSelect + ` WHERE 1=1`
    const params: any[] = []

    query += ` ORDER BY r.receiptID DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const [rows] = await pool.query(query, params)

    const [countResult]: any = await pool.query(
      `SELECT COUNT(*) as total FROM receipts`
    )
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      success: true,
      rows,
      total,
      limit,
      offset
    })
  } catch (error: any) {
    console.error('Receipts API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
