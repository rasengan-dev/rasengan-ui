import { NavLink } from "rasengan"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { useComponentStore } from "@/store/components";
import { Badge } from "@/components/ui/badge";

export type NavigationLink = {
  label: string;
  to: string;
  level: number;
  data?: Record<string, any>
};

export type NavigationSection = {
  title: string;
  items: (NavigationLink)[];
};

export type Navigation = NavigationSection[];

export default function Sidebar({ onClose = () => { } }: { onClose?: () => void }) {
  const { getNavigation } = useComponentStore();

  return (
    <aside className="absolute top-0 w-[276px] h-full pl-6 pr-4 py-16 pb-[100px] bg-background text-sm overflow-auto hide-scrollbar">
      {getNavigation().map((section, index) => (
        <div key={section.title} className={`flex flex-col text-foreground ${index > 0 ? 'mt-10' : ''}`}>
          <span className="text-foreground/60 text-xs font-semibold px-2">{section.title}</span>
          <nav className="mt-2 flex flex-col gap-1 w-auto">
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                end={item.to === '/docs'}
                to={item.to || "#"}
                onClick={onClose}
                caseSensitive
                className={"flex justify-between pr-4"}
              >
                {
                  ({ isActive }) => (
                    <>
                      <span className={cn("inline-block text-xs font-semibold px-2 py-[6px] hover:bg-muted/70 dark:hover:bg-input/70 rounded-md cursor-pointer",
                        isActive ? "bg-primary text-primary-foreground hover:bg-primary dark:hover:bg-primary" : ""
                      )}>
                        {item.label}
                      </span>

                      {
                        item.data && item.data["count"] && (
                          <Badge className="px-2 py-0 size-6 rounded-full text-[10px]" variant={"outline"}>{item.data.count}</Badge>
                        )
                      }
                    </>
                  )
                }
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  )
}


export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="max-w-lg"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight
          shipping. Free shipping on international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns accepted within 30 days. Items must be unused and in original
          packaging. Refunds processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          Reach us via email, live chat, or phone. We respond within 24 hours
          during business days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
