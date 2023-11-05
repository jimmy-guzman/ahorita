import { CheckSquareIcon, TrashIcon } from 'lucide-react';

export const TasksTableActions = ({
  onComplete,
  onDelete,
}: {
  onComplete: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className='daisy-join'>
      <button className='daisy-btn daisy-btn-ghost daisy-join-item daisy-btn-sm'>
        <CheckSquareIcon
          className='align-baseline'
          onClick={() => {
            onComplete();
          }}
        />
      </button>
      <button className='daisy-btn daisy-btn-ghost daisy-join-item daisy-btn-sm'>
        <TrashIcon
          className='align-baseline'
          onClick={() => {
            onDelete();
          }}
        />
      </button>
    </div>
  );
};
