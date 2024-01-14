import { Outlet } from '@tanstack/react-router';

import { Toaster } from '@/components/Toaster';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
