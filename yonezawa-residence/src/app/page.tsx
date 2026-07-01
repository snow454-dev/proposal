import dynamic from "next/dynamic";
import Concept from "@/components/sections/Concept";
import FloorGuide from "@/components/sections/FloorGuide";
import Amenities from "@/components/sections/Amenities";
import Location from "@/components/sections/Location";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingMenu from "@/components/ui/FloatingMenu";

const RoomShowcase = dynamic(
  () => import("@/components/sections/RoomShowcase"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <FloatingMenu />
      <main>
        <RoomShowcase />
        <Concept />
        <FloorGuide />
        <Amenities />
        <Location />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
