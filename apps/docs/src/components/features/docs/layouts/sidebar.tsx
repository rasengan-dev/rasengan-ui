import { NavLink } from "rasengan"
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
    <aside className="absolute top-0 w-[276px] h-full pl-6 pr-4 py-16 pb-[100px] bg-background text-sm overflow-auto hide-scrollbar border-r border-r-border">
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
                      <span className={cn("inline-block text-xs font-semibold px-2 py-[6px] hover:bg-muted/70 dark:hover:bg-input/70 rounded-md cursor-pointer transition-all",
                        isActive ? "bg-primary/5 dark:bg-primary/20 text-primary borderd border-primary hover:bg-primary/5 dark:hover:bg-primary/20" : ""
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