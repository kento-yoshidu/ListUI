import { SearchTableComponent } from "@/components/SearchTable";
import { Wrapper } from "@/components/layout/Wrapper";

const Search = () => {
  return (
    <Wrapper>
      <main
        style={{
          padding: "30px",
        }}
      >
        <SearchTableComponent />
      </main>
    </Wrapper>
  )
}

export default Search;
