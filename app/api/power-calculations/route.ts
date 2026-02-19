import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')
    const calcID = searchParams.get('calcID')
    const cusID = searchParams.get('cusID')

    let query = `
      SELECT
        calcID,
        power_calcuNo,
        title,
        parameters,
        result,
        created_by,
        created_at,
        cusID
      FROM power_calculations
      WHERE 1=1
    `

    const params: any[] = []

    if (calcID) {
      query += ` AND calcID = ?`
      params.push(calcID)
    }

    if (cusID) {
      query += ` AND cusID = ?`
      params.push(cusID)
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const [rows] = await pool.query(query, params)

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM power_calculations WHERE 1=1`
    const countParams: any[] = []

    if (calcID) {
      countQuery += ` AND calcID = ?`
      countParams.push(calcID)
    }

    if (cusID) {
      countQuery += ` AND cusID = ?`
      countParams.push(cusID)
    }

    const [countResult] = await pool.query(countQuery, countParams)
    const total = (countResult as any)[0].total

    return NextResponse.json({
      success: true,
      rows,
      total,
      limit,
      offset
    })
  } catch (error: any) {
    console.error('Power calculations API error:', error)
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
      title,
      parameters,
      result,
      created_by,
      cusID
    } = body

    // Generate power_calcuNo
    const [maxResult] = await pool.query(
      'SELECT MAX(calcID) as maxID FROM power_calculations'
    )
    const nextID = ((maxResult as any)[0].maxID || 0) + 1
    const powerCalcuNo = `PWR-${String(nextID).padStart(6, '0')}`

    const query = `
      INSERT INTO power_calculations (
        power_calcuNo, title, parameters, result, created_by, cusID
      ) VALUES (?, ?, ?, ?, ?, ?)
    `

    const [insertResult] = await pool.query(query, [
      powerCalcuNo,
      title || 'Untitled Calculation',
      JSON.stringify(parameters || {}),
      JSON.stringify(result || {}),
      created_by || 'system',
      cusID || null
    ])

    return NextResponse.json({
      success: true,
      calcID: (insertResult as any).insertId,
      powerCalcuNo
    })
  } catch (error: any) {
    console.error('Create power calculation error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      calcID,
      title,
      parameters,
      result,
      cusID
    } = body

    if (!calcID) {
      return NextResponse.json(
        { success: false, error: 'calcID is required' },
        { status: 400 }
      )
    }

    const query = `
      UPDATE power_calculations
      SET
        title = ?,
        parameters = ?,
        result = ?,
        cusID = ?
      WHERE calcID = ?
    `

    await pool.query(query, [
      title || 'Untitled Calculation',
      JSON.stringify(parameters || {}),
      JSON.stringify(result || {}),
      cusID || null,
      calcID
    ])

    return NextResponse.json({
      success: true,
      calcID
    })
  } catch (error: any) {
    console.error('Update power calculation error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const calcID = searchParams.get('calcID')

    if (!calcID) {
      return NextResponse.json(
        { success: false, error: 'calcID is required' },
        { status: 400 }
      )
    }

    const query = `DELETE FROM power_calculations WHERE calcID = ?`
    await pool.query(query, [calcID])

    return NextResponse.json({
      success: true,
      calcID
    })
  } catch (error: any) {
    console.error('Delete power calculation error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
