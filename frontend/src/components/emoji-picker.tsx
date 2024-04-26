import { MinusIcon } from "lucide-react";
import { Suspense, lazy, useState } from "react";

const LazyEmojiPicker = lazy(() => import("emoji-picker-react"));

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
          <Suspense fallback={null}>
            <LazyEmojiPicker
              lazyLoadEmojis
              className="dsy-dropdown-content"
              // @ts-expect-error emoji-picker-react is not tree shaking correctly
              theme="auto"
              // @ts-expect-error emoji-picker-react is not tree shaking correctly
              emojiStyle="native"
              previewConfig={{
                defaultCaption: "Choose your icon",
              }}
              onEmojiClick={(event) => {
                onChange(event.emoji);
                setIsEmojiOpen(false);
              }}
            />
          </Suspense>
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
