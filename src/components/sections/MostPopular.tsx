
import Cards from "../Cards";

function MostPopular({data}:{data:any}) {
  

  return (
    <div className="popular m-6 mx-5 text-white ">
      <h1 className="text-xl font-semibold my-4">Most Popular</h1>
      <div className="overflow-y-scroll no-scrollbar flex gap-6 ">
    

        {data?.map((popular: any) => (
       
            <Cards
              key={popular.id}
              id={popular.id}
              name={popular.name}
              poster_path={popular.poster_path}
              title={popular.title}
              release_date={popular.release_date}
              first_air_date={popular.first_air_date}
              vote_average={popular.vote_average}
              mediaType="movie"
            />

        ))}
      </div>
    </div>
  );
}

export default MostPopular;
