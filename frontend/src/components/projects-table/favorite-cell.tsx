import { StarIcon } from "lucide-react";

import { ICON_CLASS } from "@/utils/cell-classes";

export const ProjectFavoriteCell = ({
  isFavorite,
}: {
  isFavorite: boolean;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      <StarIcon
        className={`${ICON_CLASS} ${
          isFavorite ? "fill-warning text-warning" : "text-base-content/30"
        }`}
      />
      <span className="sr-only">
        {isFavorite ? "Favorite" : "Not favorite"}
      </span>
    </span>
  );
};
