export const ProjectProgressCell = ({
  total,
  completed,
}: {
  total: number;
  completed: number;
}) => {
  const ratio = total === 0 ? 0 : completed / total;
  const isComplete = total > 0 && completed === total;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`text-xs tabular-nums ${
          total === 0 ? "text-base-content/30" : "text-base-content/60"
        }`}
      >
        {completed}/{total}
      </span>
      <span className="h-1 w-10 overflow-hidden rounded-full bg-base-300">
        <span
          className={`block h-full rounded-full ${
            isComplete ? "bg-success" : "bg-base-content/40"
          }`}
          style={{ width: `${ratio * 100}%` }}
        />
      </span>
    </span>
  );
};
