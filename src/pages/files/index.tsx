import { TableComponent } from "@/components/Table";
import { Wrapper } from "@/components/layout/Wrapper";

const Files = () => {
  return (
    <Wrapper>
      <main
        style={{
          padding: "30px",
        }}
      >
        <TableComponent />
      </main>
    </Wrapper>
  )
}

export default Files;
