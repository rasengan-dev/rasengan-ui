import { PageComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";
import ThemeButton from "@/components/common/atoms/theme-button";
import ProfileDropdown from "@/components/common/molecules/dropdowns/profile-dropdown";
import Image from "@rasenganjs/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar2 } from "@/components/application-ui/layouts/sidebars/sidebar2";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"bg-background w-full h-full overflow-hidden",
				isDark && "dark"
			)}
		>
			<section className='h-screen w-screen flex bg-muted/60 dark:bg-muted/10'>
				<Sidebar2 />

				<section className='w-full m-4 border border-border border-dashed rounded-xl bg-background'>
					<header className='h-[52px] w-full border-b border-border border-dashed flex items-center justify-between px-2'>
						<div className='flex items-center gap-4'>
							<h1 className='text-2xl text-foreground font-medium'>
								Dashboard
							</h1>
							<div className='relative'>
								<Search
									size={16}
									className='absolute text-muted-foreground top-1/2 -translate-y-1/2 left-2'
								/>
								<Input
									placeholder='Make a search'
									className='rounded-lg pl-8 text-foreground w-[200px]'
								/>
							</div>
						</div>

						<div className='w-auto flex items-center gap-2'>
							<ThemeButton />
							<ProfileDropdown>
								<div className='flex items-center gap-2 hover:bg-muted rounded-md px-2 py-1 cursor-pointer transition-all duration-300'>
									<Image
										src={"/static/images/avatars/1.jpeg"}
										alt='avatar'
										className='w-[30px] h-[30px] rounded-full'
										width={30}
										height={30}
									/>
									<span className='text-foreground'>@dilane_3</span>
								</div>
							</ProfileDropdown>
						</div>
					</header>

					<main className='w-full h-(--main-height) p-4 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:rounded-b-lg [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300'>
						<section className='max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4'>
							<Card className='w-full h-[400px]' />
							<Card className='w-full h-[400px]' />
							<Card className='w-full h-[400px]' />
							<Card className='w-full h-[400px]' />
						</section>
					</main>
				</section>
			</section>
		</section>
	);
};

Page.metadata = {
	title: "Sidebars",
	description: "Sidebars page",
};

export default Page;
