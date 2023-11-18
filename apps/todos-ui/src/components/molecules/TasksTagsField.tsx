import { CellContext } from '@tanstack/react-table';
import { BanIcon, PencilIcon, PlusIcon, SaveIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useEditTaskTags } from '../../hooks/api/useEditTaskTags';
import { useQueryTags } from '../../hooks/api/useTags';
import { useTasksFormField } from '../../hooks/forms/useTasksForm';
import { Task } from '../../lib/api';
import { TagBadges } from '../atoms/TagBadges';

export const TasksTagsField = ({
  info,
}: {
  info: CellContext<Task & { key: string }, Task['tags']>;
}) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const { field } = useTasksFormField({ name: `tasks.${info.row.index}.tags` });

  const { data: tags = [] } = useQueryTags();

  const editMutation = useEditTaskTags();

  const values = useMemo(
    () => (Array.isArray(field.value) ? field.value : []),
    [field.value]
  );

  const options = useMemo(
    () =>
      tags.filter((tag) => !values.map((value) => value.id).includes(tag.id)),
    [tags, values]
  );

  return isEditEnabled ? (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        {values.map(({ id, name }) => (
          <div
            key={name}
            className='daisy-badge daisy-badge-outline items-center gap-1 py-3'
          >
            <span>{name}</span>
            <button
              onClick={() => {
                field.onChange(values.filter((value) => value.id !== id));
              }}
            >
              <XIcon className='inline-block h-4 w-4' />
            </button>
          </div>
        ))}
      </div>
      <div className='daisy-join'>
        <select
          className='daisy-join-item daisy-select daisy-select-sm daisy-select-bordered'
          value=''
          onChange={(event) => {
            field.onChange([
              ...values,
              tags?.find((tag) => tag.id === event.target.value),
            ]);
          }}
        >
          <option value=''>Choose tags</option>
          {options.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button
          className='daisy-join-item daisy-btn daisy-btn-sm daisy-btn-neutral'
          onClick={() => {
            setIsEditEnabled((prev) => !prev);
          }}
        >
          <BanIcon />
        </button>
        <button
          className='daisy-join-item daisy-btn daisy-btn-sm daisy-btn-secondary'
          onClick={() => {
            editMutation.mutate({
              params: { id: info.row.original.id },
              body: values,
            });
            setIsEditEnabled((prev) => !prev);
          }}
        >
          <SaveIcon />
        </button>
      </div>
    </div>
  ) : (
    <div className='flex items-center gap-2'>
      <TagBadges tags={info.getValue()} />
      <button
        className='daisy-btn daisy-btn-xs daisy-btn-neutral'
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        {values.length ? (
          <PencilIcon className='h-4 w-4' />
        ) : (
          <>
            Add Tags <PlusIcon className='h-4 w-4' />
          </>
        )}
      </button>
    </div>
  );
};
