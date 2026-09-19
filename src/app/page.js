import LandingHeader from "./_components/LandingHeader";
import HeroSection from "./_components/HeroSection";
import SimplicitySection from "./_components/SimplicitySection";
import FeaturesSection from "./_components/FeaturesSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import CTASection from "./_components/CTASection";
import FAQSection from "./_components/FAQSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <LandingHeader />

      <main id="main">

        <HeroSection />

        <SimplicitySection />

        <FeaturesSection />

        <HowItWorksSection />

        <CTASection />
        
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}