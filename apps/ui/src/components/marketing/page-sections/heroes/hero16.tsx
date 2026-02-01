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
export const Hero16 = () => {
  return (
    <div
      className={cn(
        "bg-background w-full overflow-hidden",
      )}
    >
      <section className="w-full min-h-screen flex flex-col overflow-hidden">
        <div
          className="fixed -top-20 sm:top-0 right-0 left-0
      w-full h-full overflow-hidden"
        >
          <img
            src="/static/images/illustrations/5.jpg"
            alt="Blue light ray"
            className=" w-full h-full"
          />
        </div>

        <section className="w-full flex-1 flex flex-col justify-start relative overflow-hidden">
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
          </div>

          <div className="w-full px-4 md:px-10 mt-10 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full  mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              {/* Card 1 */}
              <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 hover:bg-white/10 ">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Map Flows
                  </h3>
                  <div className="text-foreground/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Visualize workflows step by step, making processes easier to
                  understand and share.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 hover:bg-white/10 ">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Analyze Patterns
                  </h3>
                  <div className="text-foreground/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="20" x2="12" y2="10"></line>
                      <line x1="18" y1="20" x2="18" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="16"></line>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reveal bottlenecks and inefficiencies with clear insights into
                  how work truly flows.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 hover:bg-white/10 ">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Refine Processes
                  </h3>
                  <div className="text-foreground/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Continuously improve workflows by applying focused changes
                  that create smoother, more efficient processes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
