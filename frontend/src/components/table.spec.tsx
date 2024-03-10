import { render, screen } from "@/testing/utils";

import { createColumnHelper } from "@tanstack/react-table";
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
  it("should render table with correct column headers", () => {
    render(
      <Table
        data={[{ id: 1, name: "apple", color: "red" }]}
        columns={columns}
      />,
    );

    for (const name of ["name", "color"]) {
      expect(screen.getByRole("columnheader", { name })).toBeInTheDocument();
    }
  });

  it("should NOT render global filter", () => {
    render(
      <Table
        data={[{ id: 1, name: "apple", color: "red" }]}
        columns={columns}
      />,
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should be able to filter rows", async () => {
    const { user } = render(
      <Table
        data={[
          { id: 1, name: "apple", color: "red" },
          { id: 2, name: "banana", color: "yellow" },
        ]}
        columns={columns}
        enableGlobalFiltering
      />,
    );

    await user.type(screen.getByRole("textbox"), "banana");

    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("should render filter with placeholder text", async () => {
    render(
      <Table
        data={[
          { id: 1, name: "apple", color: "red" },
          { id: 2, name: "banana", color: "yellow" },
        ]}
        columns={columns}
        enableGlobalFiltering
        globalFilterPlaceholder="Search Fruits"
      />,
    );

    expect(screen.getByPlaceholderText("Search Fruits")).toBeInTheDocument();
  });
});
