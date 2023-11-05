export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full min-h-screen flex-col justify-between'>
      {children}
    </div>
  );
};
