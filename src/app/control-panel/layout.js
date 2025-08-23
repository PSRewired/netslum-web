import { Container } from 'react-bootstrap';
import ControlPanelNavigation from '@/components/ControlPanel/ControlPanelNavigation.js';

export default async function ControlPanelLayout({ children }) {
  return (
    <Container>
      <ControlPanelNavigation />
      {children}
    </Container>
  );
}
