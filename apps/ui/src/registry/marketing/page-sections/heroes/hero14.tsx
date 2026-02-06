import { Button } from "@/components/ui/button";
import AppLogo from "@/components/common/atoms/app-logo";
import { Link } from "rasengan";
import Image from "@rasenganjs/image";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import ThemeButton from "@/components/common/atoms/theme-button";
import { FloatingNavbar2 } from "@/registry/marketing/elements/headers/navbar5";
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
          <div className="flex justify-center mx-autol items-center gap-5 mt-4  ">
            {/* <div className="flex justify-between items-center  px-2 py-1 rounded-full bg-input w-fit   shadow-sm space-x-90">
              <div className="flex items-center gap-20">
                <AppLogo size="sm" className="text-foreground" />
              </div>

              <nav className="hidden lg:block px-4 py-2">
                <ul className="flex items-center gap-4 text-white/70 text-sm">
                  <Link to="#">
                    <li className="font-semibold text-foreground px-3 py-1  hover:bg-card hover: rounded-full ">
                      Home
                    </li>
                  </Link>
                  <Link to="#">
                    <li className="font-semibold text-foreground px-3 py-1  hover:bg-card hover: rounded-full">
                      Feature
                    </li>
                  </Link>
                  <Link to="#">
                    <li className="font-semibold text-foreground px-3 py-1 hover:bg-card hover: rounded-full">
                      Pricing
                    </li>
                  </Link>
                </ul>
              </nav>
            </div> */}
            <FloatingNavbar2 enableTheme={true} />

            {/* <ThemeButton /> */}
          </div>

          <div className="z-5 w-full flex flex-col items-center justify-end text-center mt-[60px] md:mt-[80px] px-4 md:px-10 pb-20">
            {/* <Badge
            variant="outline"
            className="h-8 px-4 gap-2 rounded-full bg-[#202020] hover:bg-[#202020]/80 text-white/70 hover:text-white border border-[#434343]"
          >
            <Star size={18} />
            <span>45K+ Users trust us</span>
          </Badge> */}
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
                <span>Try Demo {" >"}</span>
                {/* // <ArrowRight /> */}
              </Button>
            </div>
          </div>

          <div className="relative  w-full max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/static/images/hero/6.png"
              alt="Hero Image"
              width="100%"
              height="100%"
            //  className=" w-[95%]  max-w-6xl rounded-lg shadow-md blur-sm "
            ></Image>
          </div>
        </section>
      </section>
    </div>
  );
};
