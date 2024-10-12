import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, object, string } from "valibot";

import { render, screen } from "@/testing/utils";
import { TextInput } from "./text-input";

const schema = object({
  username: string(),
});

const Component = () => {
  const { control } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
    },
  });

  return <TextInput control={control} label="Username" name="username" />;
};

describe("<TextInput />", () => {
  it("should render", async () => {
    await render(<Component />);

    const textbox = screen.getByRole("textbox", { name: "Username" });

    expect(textbox).toBeInTheDocument();
  });
});
