import { createColumnHelper } from "@tanstack/react-table";
import { render, screen } from "@/testing/utils";
import { Table } from "./table";

const columnHelper = createColumnHelper<{
  id: number;
  name: string;
  color: string;
}>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("color", {
    cell: (info) => info.getValue(),
  }),
];

describe("<Table />", () => {
  it("should render table with correct column headers", async () => {
    await render(
      <Table
        data={[{ id: 1, name: "apple", color: "red" }]}
        columns={columns}
      />,
    );

    for (const name of ["name", "color"]) {
      expect(screen.getByRole("columnheader", { name })).toBeInTheDocument();
    }
  });

  it("should expose unsorted state on sortable column headers", async () => {
    await render(
      <Table
        data={[{ id: 1, name: "apple", color: "red" }]}
        columns={columns}
      />,
    );

    expect(screen.getByRole("columnheader", { name: "name" })).toHaveAttribute(
      "aria-sort",
      "none",
    );
  });

  it("should not render a global filter input", async () => {
    await render(
      <Table
        data={[{ id: 1, name: "apple", color: "red" }]}
        columns={columns}
      />,
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should render an empty state when there are no rows", async () => {
    await render(
      <Table
        data={[] as { id: number; name: string; color: string }[]}
        columns={columns}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("No results.");
  });
});
