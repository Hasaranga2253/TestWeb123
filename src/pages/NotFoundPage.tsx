import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';

export function NotFoundPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="404" title="Page not found" description="The requested page could not be found. Please use the navigation to continue exploring the site." />
      </Container>
    </section>
  );
}
