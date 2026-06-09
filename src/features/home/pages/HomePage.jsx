import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FoundationsSection from "../components/FoundationsSection";
import UpcomingEvents from "../components/UpcomingEvents";
import MajorEventSection from "../components/MajorEventSection";
import WorshipSection from "../components/WorshipSection";
import TeachingsSection from "../components/TeachingsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import DonationSection from "../components/DonationSection";
import CommunitySection from "../components/CommunitySection";
import WelcomeSection from "../components/WelcomeSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FoundationsSection />
      <WorshipSection />
      <MajorEventSection />
      <UpcomingEvents />
      <WelcomeSection />
      <TeachingsSection />
      <TestimonialsSection />
      <DonationSection />
      <CommunitySection />
    </>
  );
}