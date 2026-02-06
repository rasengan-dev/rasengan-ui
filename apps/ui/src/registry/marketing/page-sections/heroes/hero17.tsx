import { Button } from "@/components/ui/button";
import AppLogo from "@/components/common/atoms/app-logo";
import { Link } from "rasengan";
import Image from "@rasenganjs/image";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import ThemeButton from "@/components/common/atoms/theme-button";
import { FloatingNavbar2 } from "@/registry/marketing/elements/headers/navbar5";

export const Hero17 = () => {
  const { isDark } = useTheme();

  const Card = ({
    name,
    tvf,
    earning,
    value,
    followers,
    className,
  }: {
    name: string;
    tvf: string;
    followers: string;
    earning: string;
    value: string;
    className?: string;
  }) => (
    <div
      className={cn(
        "bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 w-[320px] text-dark shadow-xl flex flex-col gap-3",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/static/images/avatars/5.jpeg"
            alt="Avatar"
            className="bg-dark w-[48px] h-[48px] rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-dark">{name}</span>
            <span className="text-[11px] text-muted-foreground truncate max-w-[140px]">
              0x7fb1...e2d6
            </span>
          </div>
        </div>
        <span className="text-base sm:text-lg font-semibold text-dark">
          {value}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground pt-3 mt-1">
        <div className="flex flex-col">
          <span className="font-medium text-[11px] text-dark">TVF</span>
          <span>{tvf}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-medium text-[11px] text-dark">Followers</span>
          <span>{followers}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-medium text-[11px] text-dark">Earnings</span>
          <span>{earning}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("bg-background", isDark ? "dark" : "light")}>
      <section className="w-full h-screen overflow-x-hidden ">
        <div
          className="fixed -top-20 sm:top-0 right-0 left-0
      w-full h-full overflow-hidden"
        >
          <img
            src="/static/images/bg/13.svg"
            alt="stars"
            className=" w-full h-full"
          />
        </div>
        <section className="w-full min-h-screen max-h-[1000px] flex flex-col justify-start relative overflow-hidden ">
          <div className="flex justify-center mx-autol items-center gap-5 mt-4  ">
            <FloatingNavbar2 enableTheme={false} />

            {/* <ThemeButton /> */}
          </div>
          <div className="z-5 w-full flex flex-col items-center justify-end text-center mt-[50px] md:mt-[50px] px-4 md:px-10 pb-20 relative">
            {/* Nombres à gauche */}
            <div className="hidden md:flex flex-col gap-15 text-white text-sm absolute left-6 top-30 -translate-y-1/2">
              <div>
                <p className="text-2xl font-semibold">100k+</p>
                <p className="text-xs text-white">Total users</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">2.3B</p>
                <p className="text-xs text-white">Market size</p>
              </div>
            </div>

            {/* Nombres à droite */}
            <div className="hidden md:flex flex-col gap-15 text-white text-sm absolute right-6 top-30 -translate-y-1/2 items-end">
              <div>
                <p className="text-2xl font-semibold">$753.2M</p>
                <p className="text-xs text-white">Volume</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">12</p>
                <p className="text-xs text-white">Support chain</p>
              </div>
            </div>
            <p className="relative z-20 text-sm text-center text-white max-w-[400px] mt-4 text-pretty">
              Join 100,000+ investors
            </p>
            <h1 className="mt-8 relative z-1 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[600px] font-bold text-center text-white text-pretty">
              <p>The Smart Way to</p> Invest in Crypto.
            </h1>
            <p className="relative z-20 text-sm text-center text-white/80 max-w-[400px] mt-4 text-pretty">
              Follow proven portfolios. Copy their moves. Grow your wealth.
            </p>

            <div className="relative z-20 mt-10 flex gap-4">
              <Button className="bg-white hover:bg-white/80 text-card  hover:text-black rounded-30">
                <span>Start Copying</span>
              </Button>

            </div>
            {/* Cartes alignées sans superposition */}
            <div className="relative w-full max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-center gap-20">
              <Card
                name="justme"
                tvf="$936.1M"
                followers="14.1k"
                earning="2,195.8"
                value="$210,873"
                className="md:self-start"
              />

              <Card
                name="phafa"
                tvf="$1.5B"
                followers="40.2k"
                earning="4,905.34"
                value="$99,652,075"
                className="md:mt-10"
              />

              <Card
                name="an0n"
                tvf="$2.28B"
                followers="70.3k"
                earning="1,864.4"
                value="$10,389,759"
                className="md:self-start"
              />
            </div>
          </div>


        </section>
      </section>
    </div>
  );
};
