import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, object, string } from "valibot";

import { render, screen } from "@/testing/utils";
import { Select } from "./select";

const schema = object({
  fruits: string(),
});

const Component = () => {
  const { control } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      fruits: "",
    },
  });

  return (
    <Select control={control} label="Fruits" name="fruits">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </Select>
  );
};

describe("<Select />", () => {
  it("should render", async () => {
    await render(<Component />);

    const textbox = screen.getByRole("combobox", { name: "Fruits" });

    expect(textbox).toBeInTheDocument();
  });
});
