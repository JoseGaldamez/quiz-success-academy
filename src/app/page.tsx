import { MenuBar } from "@/common/MenuBar";
import { TopBar } from "@/common/TopBar";
import { Prices } from "@/components/home/Prices";
import { PrimaryHome } from "@/components/home/PrimaryHome";
import { TestContent } from "@/components/home/TestContent";

export default function Home() {
  return (
    <>
      <TopBar />
      <MenuBar />
      <main>
        <PrimaryHome />
        <TestContent />
        <Prices />
      </main>
    </>
  );
}
