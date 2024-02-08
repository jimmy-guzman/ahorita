import { render, screen } from '@/test/utils';

import { TasksTableStatusCell } from './TasksTableStatusCell';

describe('<TasksTableStatusCell />', () => {
  it.each([
    { status: 'IN_PROGRESS', text: 'In Progress' },
    { status: 'TODO', text: 'Todo' },
    { status: 'DONE', text: 'Done' },
    { status: 'CANCELED', text: 'Canceled' },
    { status: 'BACKLOG', text: 'Backlog' },
  ] as const)(
    'should render $status when status is $text',
    ({ status, text }) => {
      render(<TasksTableStatusCell status={status} />);

      expect(screen.getByText(text)).toBeInTheDocument();
    }
  );
});
