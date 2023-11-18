export const CompletedBadge = ({ completed }: { completed: boolean }) => {
  return completed ? (
    <span className='dsy-badge dsy-badge-success'>yes</span>
  ) : (
    <span className='dsy-badge dsy-badge-warning'>no</span>
  );
};
