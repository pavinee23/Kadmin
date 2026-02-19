import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const active = searchParams.get('active')
    const q = searchParams.get('q')

    let query = `
      SELECT
        productID as id,
        productID,
        sku,
        name,
        description,
        \`Capacity (kVA)\` as capacity,
        MCB as mcb,
        \`Size (WxLxH) cm.\` as size,
        Weight as weight,
        price,
        Pin_VAT as price_vat,
        unit,
        TFC_duty as tfc_duty,
        Installation as installation,
        Profit as profit,
        commission,
        category,
        Pro_Image as image,
        stock_qty,
        is_active,
        created_at,
        updated_at
      FROM product_list
      WHERE 1=1
    `

    const params: any[] = []

    if (id) {
      query += ` AND productID = ?`
      params.push(id)
    }

    if (q) {
      query += ` AND (name LIKE ? OR sku LIKE ? OR description LIKE ?)`
      params.push(`%${q}%`, `%${q}%`, `%${q}%`)
    }

    if (category) {
      query += ` AND category = ?`
      params.push(category)
    }

    if (active !== null && active !== undefined) {
      query += ` AND is_active = ?`
      params.push(active === 'true' ? 1 : 0)
    }

    query += ` ORDER BY productID DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const [rows] = await pool.query(query, params)

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM product_list WHERE 1=1`
    const countParams: any[] = []

    if (category) {
      countQuery += ` AND category = ?`
      countParams.push(category)
    }

    if (active !== null && active !== undefined) {
      countQuery += ` AND is_active = ?`
      countParams.push(active === 'true' ? 1 : 0)
    }

    const [countResult] = await pool.query(countQuery, countParams)
    const total = (countResult as any)[0].total

    return NextResponse.json({
      success: true,
      products: rows,
      rows,
      total,
      limit,
      offset
    })
  } catch (error: any) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      description,
      capacity,
      mcb,
      size,
      weight,
      price,
      unit,
      category,
      stock_qty,
      is_active
    } = body

    const query = `
      INSERT INTO product_list (
        sku, name, description, \`Capacity (kVA)\`, MCB, \`Size (WxLxH) cm.\`,
        Weight, price, unit, category, stock_qty, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const [result] = await pool.query(query, [
      sku || null,
      name,
      description || null,
      capacity || '',
      mcb || '',
      size || '',
      weight || '',
      price || 0,
      unit || 'unit',
      category || null,
      stock_qty || 0,
      is_active !== undefined ? is_active : 1
    ])

    return NextResponse.json({
      success: true,
      productId: (result as any).insertId
    })
  } catch (error: any) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, stock_qty } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const query = `UPDATE product_list SET stock_qty = ? WHERE productID = ?`
    await pool.query(query, [stock_qty ?? 0, id])

    return NextResponse.json({
      success: true,
      id
    })
  } catch (error: any) {
    console.error('Update product stock error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
