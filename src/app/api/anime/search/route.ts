import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const value = searchParam.get("search");

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIME_API}/search/${value}`
    );

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 400 }
    );
  }
}
