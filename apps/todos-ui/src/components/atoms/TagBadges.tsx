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
        <span key={name} className='daisy-badge daisy-badge-outline'>
          {name}
        </span>
      ))}
    </div>
  );
};
