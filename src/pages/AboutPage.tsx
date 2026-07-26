import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';

export function AboutPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="About" title="About AIMS Campus" description="This placeholder page will later host the institution story, mission, and values." />
      </Container>
    </section>
  );
}
