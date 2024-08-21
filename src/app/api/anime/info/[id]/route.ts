import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/info?id=${params.id}`
    );
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: error }, { status: 200 });
  }
}
