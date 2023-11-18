import { getTodos } from '../lib/api';

export async function loader() {
  const data = await getTodos();

  return data;
}
