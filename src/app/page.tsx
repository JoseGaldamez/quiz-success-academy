import { MenuBar } from "@/common/MenuBar";
import { TopBar } from "@/common/TopBar";
import { PrimaryHome } from "@/components/home/PrimaryHome";

export default function Home() {
  return (
    <>
      <TopBar />
      <MenuBar />
      <main>
        <PrimaryHome />
      </main>
    </>
  );
}
