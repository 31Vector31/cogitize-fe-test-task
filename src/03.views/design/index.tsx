import {
  LandingBenefits,
  LandingCover,
  LandingMission,
  LandingSteps,
} from "@/04.widgets";
import { Geist } from "next/font/google";

const GEIST = Geist({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const DesignView = () => {
  return (
    <main className={`${GEIST.className} bg-[#fefefe]`}>
      <LandingCover />
      <LandingMission />
      <LandingSteps />
      <LandingBenefits />
    </main>
  );
};

export default DesignView;
