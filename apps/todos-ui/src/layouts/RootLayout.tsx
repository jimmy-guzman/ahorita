import { Outlet } from '@tanstack/react-router';

import { Container } from '../components/atoms/Container';
import { Wrapper } from '../components/atoms/Wrapper';
import { Navigation } from '../components/molecules/Navigation';
import { Toaster } from '../components/molecules/Toaster';

export const RootLayout = () => {
  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
      <Toaster />
    </Wrapper>
  );
};
