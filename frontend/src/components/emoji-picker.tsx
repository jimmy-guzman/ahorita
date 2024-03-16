import EmojiPickerReact, { EmojiStyle, Theme } from "emoji-picker-react";
import { MinusIcon } from "lucide-react";
import { useState } from "react";

interface EmojiPickerProps {
  onChange: (emoji: string | null) => void;
  value: string | null;
}

export const EmojiPicker = ({ onChange, value }: EmojiPickerProps) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  return (
    <div className="dsy-join">
      <div className="dsy-dropdown">
        <button
          type="button"
          className="dsy-btn dsy-join-item rounded-md"
          onClick={() => setIsEmojiOpen(true)}
        >
          {value ?? "Add Icon"}
        </button>
        {isEmojiOpen && (
          <EmojiPickerReact
            lazyLoadEmojis
            className="dsy-dropdown-content"
            theme={Theme.AUTO}
            emojiStyle={EmojiStyle.NATIVE}
            previewConfig={{
              defaultCaption: "Choose your icon",
            }}
            onEmojiClick={(event) => {
              onChange(event.emoji);
              setIsEmojiOpen(false);
            }}
          />
        )}
      </div>
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
  );
};
