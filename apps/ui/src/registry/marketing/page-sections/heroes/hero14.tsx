import { Button } from "@/components/ui/button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import { FloatingNavbar2 } from "@/registry/marketing/elements/headers/navbar5";
import { ChevronRight } from "lucide-react";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

/**
 * Hero 10
 *
 * Hero with left bottom text and background image
 */
export const Hero14 = () => {
  const { isDark } = useTheme();
  return (
    <div className={cn("bg-background", isDark ? "dark" : "light")}>
      <section className="w-full h-screen overflow-x-hidden ">
        <section className="w-full h-auto background min-h-screen max-h-[1000px] flex flex-col justify-start relative overflow-hidden">
          <div className="flex justify-center mx-autol items-center gap-5 mt-4">
            <FloatingNavbar2 enableTheme={true} />
          </div>

          <div className="z-5 w-full flex flex-col items-center justify-end text-center mt-[60px] md:mt-[80px] px-4 md:px-10 pb-20">
            <h1 className="mt-8 relative z-1 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[600px] font-bold text-center text-foreground text-pretty">
              FOCUS ON THE TASK THAT MATTERS
            </h1>
            <p className="relative z-20 text-sm text-center text-foreground max-w-[400px] mt-4 text-pretty">
              Manage priorities, track progress, and keep deadlines under
              control with the help of AI
            </p>

            <div className="relative z-20 mt-10 flex gap-4">
              <Button className="bg-foreground hover:bg-white/80 text-card  hover:text-black rounded-full">
                <span>Get Started</span>
              </Button>

              <Button
                variant="outline"
                className="rounded-full bg-card hover:bg-[#202020]/80 text-foreground hover:text-white border border-[#434343]"
              >
                <span>Try Demo</span>
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-6xl mx-auto mt-10 px-4 lg:px-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${registryUrl}/static/images/hero/6.png`}
              alt="Hero Image"
              width="100%"
              height="100%"
            />
          </div>
        </section>
      </section>
    </div>
  );
};
