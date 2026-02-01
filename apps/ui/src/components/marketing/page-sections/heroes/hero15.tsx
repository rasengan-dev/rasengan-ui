import { Button } from "@/components/ui/button";
import Image from "@rasenganjs/image";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { Brands2 } from "@/components/common/molecules/brands/index";
import { Navbar1 } from "@/components/marketing/elements/headers/navbar1";
/**
 * Hero 15
 *
 * Hero with left bottom text and background image
 */
export const Hero15 = () => {
  const { isDark } = useTheme();
  return (
    <div className={cn("bg-background", isDark ? "dark" : "light")}>
      <section className="w-full h-screen overflow-x-hiddenl ">
        <div
          className="fixed -top-20 sm:top-0 right-0
      w-[100%] h-[100%] min-w-[500px] "
        >
          <img src="/static/images/illustrations/4.svg" alt="Blue light ray" 
          className=" w-full h-full"
          />
        </div>

        <section className="w-full min-h-screen max-h-[500px] flex flex-col justify-start relative overflow-hidden">
          <div className="flex justify-center mx-autol items-center gap-5   ">
            <Navbar1 enableTheme={false} className="bg-transparent border-0" />
          </div>

          <div className="z-5 w-full flex flex-col items-start justify-start text-start mt-[60px] md:mt-[80px] px-4 md:px-10 pb-20">
            <h1 className="mt-8 relative z-1 text-[30px] lg:text-[40px] leading-[40px] lg:leading-[50px] max-w-[500px] font-bold text-start text-foreground text-pretty">
              The Layer That Brings Clarity to Every Project
            </h1>
            <p className="relative z-20 text-sm text-start text-foreground max-w-[400px] mt-4 text-pretty">
              Organize teams, tasks, and priorities in one intelligent layer
              that keeps projects on track and decisions clear.
            </p>

            <div className="relative z-20 mt-10 flex gap-4">
              <Button className="bg-card hover:bg-gray/70  text-foreground   rounded-full border border-[#434343]">
                <span>Start Managing</span>
              </Button>

              <Button className="bg-foreground   text-card   rounded-full border border-[#434343]">
                <span>Try Demo {" >"}</span>
              </Button>
            </div>

            <div
            className="mt-24"
              style={{
                  WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 20%, black 90%, transparent)",
                  maskImage:
                  "linear-gradient(to right, transparent, black 20%, black 90%, transparent)",
                }}
            >
                <p className="text-sm text-start text-foreground  text-pretty">
                  Backed by world-leading teams
                </p>
              <Brands2 />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
