import { Metadata } from "next";
import AboutHero from "../../../components/about/AboutHero";
import StatsStrip from "../../../components/about/StatsStrip";
import WhyChooseUs from "../../../components/about/WhyChooseUs";
import TeamSection from "../../../components/about/TeamSection";
import CTASection from "../../../components/about/CTASection";
import MissionSection from "@/components/about/MissionSection";

export const metadata: Metadata = {
  title: "About | UsITech",
  description: "Empowering businesses through automation. Learn about our mission, team, and commitment to democratizing enterprise-grade automation tools.",
  keywords: "about us, automation, business process, team, mission, UsITech",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero 
        videoUrl={process.env.NEXT_PUBLIC_ABOUT_VIDEO_URL}
        posterUrl={process.env.NEXT_PUBLIC_ABOUT_VIDEO_POSTER}
      />
      <StatsStrip />
      <WhyChooseUs />
      <MissionSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}