
import axios from "axios";
import MovieDetails from "./MovieDetails";
import { options } from "@/helper/apiConfig";

async function page({ params }: any) {
  const { data } = await axios.get(
    ` ${process.env.NEXT_PUBLIC_REQUEST_API}/movie/${params.id}?append_to_response=language=en-US,videos,credits,images,external_ids,content_ratings&include_image_language=en`,
    options
  );

  return (
 
    <MovieDetails data={data} paramsid={params.id}/>
  );
}

export default page;
