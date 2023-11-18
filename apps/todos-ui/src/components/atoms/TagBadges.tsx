export const TagBadges = ({
  tags,
}: {
  tags: {
    name: string;
  }[];
}) => {
  return (
    <div className='flex gap-2'>
      {tags.map(({ name }) => (
        <span key={name} className='dsy-badge dsy-badge-outline'>
          {name}
        </span>
      ))}
    </div>
  );
};
