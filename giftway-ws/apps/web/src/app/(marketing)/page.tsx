import {
  Closing,
  ComingSoon,
  Footer,
  Hero,
  HowItWorks,
  Results,
  Vendors,
  WaitingRoom,
} from '../../components/home';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Vendors />
      <HowItWorks />
      <WaitingRoom />
      <Results />
      <ComingSoon />
      <Closing />
      <Footer />
    </div>
  );
}
