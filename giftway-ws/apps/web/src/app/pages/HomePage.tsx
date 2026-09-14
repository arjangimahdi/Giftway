import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
} from '@giftway-ws/ui';

export function HomePage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">
          Giftway
        </h1>
        <p className="text-sm leading-normal text-muted">
          Design system preview driven by shared tokens.
        </p>
      </header>

      <Card>
        <CardTitle>Buttons</CardTitle>
        <CardBody>Variants and sizes resolved from the token theme.</CardBody>
        <CardFooter>
          <Button>Find their perfect gift</Button>
          <Button variant="secondary">Back</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="danger" size="sm">
            Start over
          </Button>
          <Button disabled>Disabled</Button>
        </CardFooter>
      </Card>

      <Card elevated padding="sm">
        <CardTitle>Badges</CardTitle>
        <CardBody>Semantic tones for result and partner states.</CardBody>
        <CardFooter>
          <Badge>Digikala</Badge>
          <Badge tone="primary">92% match</Badge>
          <Badge tone="success">In budget</Badge>
          <Badge tone="danger" size="md">
            Partner unavailable
          </Badge>
        </CardFooter>
      </Card>
    </section>
  );
}

export default HomePage;
