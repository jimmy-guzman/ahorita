import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, minLength, object, pipe, string } from "valibot";

import { render, screen } from "@/testing/utils";
import { PasswordInput } from "./password-input";

const schema = object({
  password: pipe(string(), minLength(3, "Your password is too short.")),
});

const Component = () => {
  const { control } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });

  return <PasswordInput control={control} label="Password" name="password" />;
};

describe("<PasswordInput />", () => {
  it("should render", async () => {
    await render(<Component />);

    const password = screen.getByLabelText("Password");

    expect(password).toBeInTheDocument();
  });

  it("should change value when user types", async () => {
    const { user } = await render(<Component />);

    const password = screen.getByLabelText("Password");

    await user.type(password, "tacho");

    expect(password).toHaveValue("tacho");
  });

  it("should NOT show error message when input is valid", async () => {
    const { user } = await render(<Component />);

    const password = screen.getByLabelText("Password");

    await user.type(password, "tacho");

    expect(password).not.toHaveClass("dsy-input-error");
    expect(
      screen.queryByText("Your username is too short."),
    ).not.toBeInTheDocument();
  });

  it("should show error message when input is invalid", async () => {
    const { user } = await render(<Component />);

    const password = screen.getByLabelText("Password");

    await user.type(password, "ta");

    expect(password).toHaveClass("dsy-input-error");
    expect(screen.getByText("Your password is too short.")).toBeInTheDocument();
  });

  it("should show password when show password is clicked", async () => {
    const { user } = await render(<Component />);

    const password = screen.getByLabelText("Password");

    await user.type(password, "tacho");

    const checkbox = screen.getByRole("checkbox", { name: "Show password" });

    await user.click(checkbox);

    const textbox = screen.getByRole("textbox", { name: "Password" });

    expect(textbox).toHaveDisplayValue("tacho");
  });

  it("should NOT show password when show password is NOT clicked", async () => {
    await render(<Component />);

    const textbox = screen.queryByRole("textbox", { name: "Password" });

    expect(textbox).not.toBeInTheDocument();
  });
});
