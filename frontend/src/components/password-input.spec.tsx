import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, object, string } from "valibot";

import { render, screen } from "@/testing/utils";
import { PasswordInput } from "./password-input";

const schema = object({
  password: string(),
});

const Component = () => {
  const { control } = useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  return <PasswordInput control={control} label="Password" name="password" />;
};

describe("<PasswordInput />", () => {
  it("should render", async () => {
    await render(<Component />);

    const textbox = screen.getByLabelText("Password");

    expect(textbox).toBeInTheDocument();
  });
});
