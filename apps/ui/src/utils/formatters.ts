const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export const formatDate = (date: Date | string) => {
  return dateFormatter.format(new Date(date));
};
