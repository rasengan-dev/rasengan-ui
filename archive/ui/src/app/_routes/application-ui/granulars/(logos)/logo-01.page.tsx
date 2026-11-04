import { PageComponent } from "rasengan";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";

const Page: PageComponent = () => {
    const { isDark } = useTheme();

    return (
        <section
            className={cn(
                "w-full h-full overflow-auto bg-background",
                isDark && "dark"
            )}
        >
            <div className='w-full h-screen flex flex-col gap-2 items-center justify-center'>
                <div className='absolute inset-x-0 top-0 max-w-[1500px] mx-auto w-full flex items-center justify-end p-4'>
                    <ThemeButton />
                </div>

                <div className='w-full flex items-center justify-center px-4 gap-4'>
                    <AppLogo minimal />
                    <AppLogo size="lg" />
                    <AppLogo size="md" />
                    <AppLogo size="sm" />
                </div>
            </div>
        </section>
    );
};

Page.metadata = {
    title: "App Logos",
    description: "Granulars Logos",
};

export default Page;
