import { Outlet } from '@tanstack/react-router';
import { Wrapper } from '../components/atoms/Wrapper';
import { Footer } from '../components/atoms/Footer';
import { Container } from '../components/atoms/Container';
import { Navigation } from '../components/molecules/Navigation';

export const RootLayout = () => {
  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </Wrapper>
  );
};
