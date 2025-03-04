
import { options } from "@/helper/apiConfig";
import axios from "axios";
import TvseriesDetails from "./TvseriesDetails";



async function page({ params }: any) {
  const {data} = await axios.get(
    ` ${process.env.NEXT_PUBLIC_REQUEST_API}/tv/${params.serialId}?append_to_response=language=en-US,videos,credits,images,external_ids,recommendations,content_ratings&include_image_language=en`,
    options
  );


  
  return (
    <TvseriesDetails data={data} paramsSeriesId={params.serialId}/>
  )
}

export default page;
