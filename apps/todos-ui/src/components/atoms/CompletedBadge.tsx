export const CompletedBadge = ({ completed }: { completed: boolean }) => {
  return completed ? (
    <span className='daisy-badge daisy-badge-success'>yes</span>
  ) : (
    <span className='daisy-badge daisy-badge-warning'>no</span>
  );
};
