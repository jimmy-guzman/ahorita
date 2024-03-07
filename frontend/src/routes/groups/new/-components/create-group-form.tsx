import { createGroupOptions } from "@/api/create-group";
import { TextInput } from "@/components/text-input";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation } from "@tanstack/react-query";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import { ListPlusIcon, MinusIcon } from "lucide-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ minLength: 1 }),
  icon: Type.Union([Type.String(), Type.Null()]),
});

export const CreateGroupForm = () => {
  const { mutate, isPending } = useMutation(createGroupOptions);
  const { handleSubmit, control, reset } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      icon: null,
    },
  });
  const iconDropdownRef = useRef<HTMLDetailsElement>(null);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h1>Create New Group</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((body) => {
          mutate(body, {
            onSuccess: () => {
              reset();
              toast.success("Group has been created");
            },
          });
        })}
      >
        <div className="flex w-full items-end gap-2">
          <Controller
            control={control}
            name="icon"
            render={({ field: { onChange, value } }) => (
              <div className="dsy-join">
                <details className="dsy-dropdown" ref={iconDropdownRef}>
                  <summary className="dsy-btn dsy-join-item rounded-md">
                    {value ?? "Add Icon"}
                  </summary>
                  <EmojiPicker
                    className="dsy-dropdown-content"
                    theme={Theme.AUTO}
                    emojiStyle={EmojiStyle.NATIVE}
                    previewConfig={{ defaultCaption: "Choose your icon" }}
                    onEmojiClick={(event) => {
                      onChange(event.emoji);

                      if (iconDropdownRef.current) {
                        iconDropdownRef.current.removeAttribute("open");
                      }
                    }}
                  />
                </details>
                <div className="dsy-tooltip" data-tip="Remove Icon">
                  <button
                    type="button"
                    className="dsy-join-item dsy-btn"
                    disabled={!value}
                    onClick={() => onChange(null)}
                  >
                    <MinusIcon />
                  </button>
                </div>
              </div>
            )}
          />
          <TextInput
            control={control}
            name="name"
            label="Name"
            className="w-full"
          />
        </div>
        <TextInput control={control} name="description" label="Description" />
        <div className="flex justify-end">
          <button
            type="submit"
            className="dsy-btn dsy-btn-primary"
            disabled={isPending}
          >
            Create New Group <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
