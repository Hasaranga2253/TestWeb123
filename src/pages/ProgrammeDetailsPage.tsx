import { useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';

export function ProgrammeDetailsPage() {
  const { programmeSlug } = useParams<{ programmeSlug: string }>();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Programme"
          title={programmeSlug ? `Programme: ${programmeSlug}` : 'Programme details'}
          description="This detail placeholder will later show the selected programme content."
        />
      </Container>
    </section>
  );
}
