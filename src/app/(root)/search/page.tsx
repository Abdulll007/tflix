import SearchResult from "@/components/SearchResult";
import { options } from "@/helper/apiConfig";
import axios from "axios";

const searchResultFunction = async (searchValue: string, page?: string) => {
  "use server";
  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_SEARCH
    }${searchValue}&include_adult=false&language=en-US${
      page ? `&page=${page}` : ""
    }`,
    options
  );

  return data;
};

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) => {
    const data = await searchResultFunction(searchParams.search,searchParams?.page);


  return (
    <div className="">
      <SearchResult
        searchQuery={searchParams.search}
        totalPages={data.total_pages}
        results={data.results}
        page={searchParams?.page}
      />
    </div>
  );
};

export default SearchResultPage;

