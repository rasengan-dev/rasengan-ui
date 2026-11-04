import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@rasenganjs/theme";
import { Moon, Sun } from "lucide-react";

type Props = {
    size?: "normal" | "small";
};

export default function ThemeButton({ size = "normal" }: Props) {
    const { setTheme, isDark } = useTheme();

    const handleThemeChange = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <Button
            size='icon'
            onClick={handleThemeChange}
            className={cn(
                "relative aspect-square rounded-md border-[1px] border-border bg-primary/5 hover:bg-muted flex shrink-0 items-center justify-center overflow-hidden hover:cursor-pointer backdrop-blur-2xl",
                size === "small" ? "size-7" : "size-8"
            )}
        >
            {isDark ? (
                <div
                    key='moon'
                    className='absolute grow-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                >
                    <Moon size={20} className='text-primary' />
                </div>
            ) : (
                <div
                    key='sun'
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                >
                    <Sun size={20} className='text-primary' />
                </div>
            )}
        </Button>
    );
}
