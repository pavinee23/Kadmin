import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const [rows]: any = await pool.query('SELECT * FROM suppliers WHERE supplier_id = ?', [id])
      return NextResponse.json({ success: true, supplier: rows?.[0] || null })
    }

    const [rows] = await pool.query('SELECT * FROM suppliers ORDER BY supplier_id DESC')
    return NextResponse.json({ success: true, rows })
  } catch (error: any) {
    console.error('Suppliers API error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, address, expected_delivery, notes, created_by } = body

    if (!name) {
      return NextResponse.json({ success: false, error: 'Supplier name is required' }, { status: 400 })
    }

    const [result]: any = await pool.query(
      `INSERT INTO suppliers (name, company, email, phone, address, expected_delivery, notes, created_by, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [name, company || null, email || null, phone || null, address || null, expected_delivery || null, notes || null, created_by || null]
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (error: any) {
    console.error('Suppliers POST error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
