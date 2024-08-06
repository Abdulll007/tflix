import axios from "axios";

export async function  GET() {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_ANIME_API}/home`)

        return Response.json({data,success:true},{status:200})
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:"some error occured"},{status:200})
    }
}


