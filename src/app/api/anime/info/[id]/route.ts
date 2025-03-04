import axios from 'axios';
import { NextRequest, } from 'next/server';
export async function GET (
    req: NextRequest,
  { params }: { params: { id: string } }
) {
    
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_ANIME_API3}/hianime/anime/${params.id}`)
        return Response.json({data,success:true},{status:200})

    } catch (error) {
        console.log(error)
        return Response.json({error,success:true},{status:200})

    }

}