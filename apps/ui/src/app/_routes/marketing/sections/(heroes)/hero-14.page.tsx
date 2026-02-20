import { Hero14 } from "@/registry/marketing/page-sections/heroes";
import { PageComponent } from "rasengan";

const Page: PageComponent = () => {
  return (
    <section className="w-full h-full overflow-auto">
      <Hero14 />
    </section>
  );
};

Page.metadata = {
  title: "Heroes",
  description: "Heroes page",
};

export default Page;
