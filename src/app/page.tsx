import { CompanyDetails } from "@/components/hero/CompanyDetails";
import Contact from "@/components/hero/Contact";
import LatestWork from "@/components/hero/FeaturedProperties";
import FeaturedResidence from "@/components/hero/FeaturedResidence";
import Footer from "@/components/hero/Footer";



import { Hero } from "@/components/hero/Hero";
import OurApproach from "@/components/hero/OurApproach";
import Philosophy from "@/components/hero/Philosophy";


export default function Home() {
  return (
    <main className="bg-[#171717]">
      <Hero />

      <CompanyDetails />

      <LatestWork/>

      <OurApproach/>
      <FeaturedResidence/>
      <Philosophy/>
      <Contact/>
      <Footer/>

    </main>
  );
}
