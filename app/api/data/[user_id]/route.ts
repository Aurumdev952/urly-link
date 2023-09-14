import { getLinkData } from "@/server/controllers";
import { getServerSideSession } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user_id: number } }
) {
  const session = await getServerSideSession();
  if (!session) return NextResponse.error();
  const { user_id } = params;
  const data = await getLinkData(user_id);
  return NextResponse.json({ data });
}
