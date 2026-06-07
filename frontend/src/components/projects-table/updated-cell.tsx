export const ProjectUpdatedCell = ({ updatedAt }: { updatedAt: string }) => {
  return (
    <span className="text-base-content/40 text-xs">
      {new Date(updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })}
    </span>
  );
};
