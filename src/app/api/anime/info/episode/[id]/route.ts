import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    try {

        const {data}=await axios.get(`${process.env.NEXT_PUBLIC_ANIME_API2}/episode/${params.id}`)

        return NextResponse.json({data,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({error,success:false},{status:400})
    }
}