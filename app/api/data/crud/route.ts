import { createLink, deleteLink, updateLink } from '@/server/controllers'
import { linkCreateType } from '@/server/schema'
import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const data = await request.json() as linkCreateType
  const res = await createLink(data) 
  return NextResponse.json(res)
}
export async function PUT(request: Request) {
  const data = await request.json() as linkCreateType
  const res = await updateLink(data) 
  return NextResponse.json(res)
}
export async function DELETE(request: Request) {
  const data = await request.json() as { id: number }
  const res = await deleteLink(data.id) 
  return NextResponse.json(res)
}