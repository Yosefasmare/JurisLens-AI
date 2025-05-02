import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";

export default function Home() {
  return (
   <div>
    <Navbar />
     <Hero/>
     <HowItWorks/>
     <LiveDemo />
     <TrustIndicators />
     <Testimonials />
     <Pricing />
     <Footer />
   </div>
  );
}
