import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, minLength, object, pipe, string } from "valibot";

import { render, screen } from "@/testing/utils";
import { TextInput } from "./text-input";

const schema = object({
  username: pipe(string(), minLength(3, "Your username is too short.")),
});

const Component = () => {
  const { control } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  return <TextInput control={control} label="Username" name="username" />;
};

describe("<TextInput />", () => {
  it("should render", async () => {
    await render(<Component />);

    const textbox = screen.getByRole("textbox", { name: "Username" });

    expect(textbox).toBeInTheDocument();
  });

  it("should change value whn user types", async () => {
    const { user } = await render(<Component />);

    const textbox = screen.getByRole("textbox", { name: "Username" });

    await user.type(textbox, "tacho");

    expect(textbox).toHaveValue("tacho");
  });

  it("should NOT show error message when input is valid", async () => {
    const { user } = await render(<Component />);

    const textbox = screen.getByRole("textbox", { name: "Username" });

    await user.type(textbox, "tacho");

    expect(textbox).not.toHaveClass("dsy-input-error");
    expect(
      screen.queryByText("Your username is too short."),
    ).not.toBeInTheDocument();
  });

  it("should show error message when input is invalid", async () => {
    const { user } = await render(<Component />);

    const textbox = screen.getByRole("textbox", { name: "Username" });

    await user.type(textbox, "ta");

    expect(textbox).toHaveClass("dsy-input-error");
    expect(screen.getByText("Your username is too short.")).toBeInTheDocument();
  });
});
