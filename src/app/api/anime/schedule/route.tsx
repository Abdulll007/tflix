import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {state} = await req.json();

    const data = await fetchData(state) 
    return NextResponse.json(data,{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error},{status:400})
  }
}




async function fetchData(date:string) {
    try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API3}/hianime/schedule?date=${date}`)

        const data = await res.json()
        
        return data.data
        
      } catch (error) {
        console.log(error)
      }
}