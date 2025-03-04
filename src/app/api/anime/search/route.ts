import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const search = searchParam.get("search");
    const page = searchParam.get("page");
    

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIME_API3}/hianime/search?q=${search}${page?`&page=${page}`:""}`
    );

   
   
    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 400 }
    );
  }
}

// q={query}&genres={genres}&type={type}&sort={sort}&season={season}&language={sub_or_dub}&status={status}&rated={rating}&start_date={yyyy-mm-dd}&end_date={yyyy-mm-dd}&score={score}
