import { Link, PageComponent } from "rasengan";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BetweenHorizonalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ThemeButton from "@/components/common/atoms/theme-button";
import ProfileDropdown from "@/components/common/molecules/dropdowns/profile-dropdown";
import Image from "@rasenganjs/image";
import { Card } from "@/components/ui/card";
import { Sidebar1 } from "@/registry/application-ui/layouts/sidebars/sidebar1";

const Page: PageComponent = () => {
	const { isDark } = useTheme();

	const [expanded, setExpanded] = useState(true);

	return (
		<section
			className={twMerge(
				"bg-background w-full h-full overflow-auto",
				isDark && "dark"
			)}
		>
			<section className='h-screen w-screen flex'>
				<Sidebar1 expanded={expanded} />

				<section className='w-full'>
					<header className='h-[70px] w-full border-b border-border border-dashed flex items-center justify-between px-4'>
						<div className='flex items-center gap-4'>
							<div className='text-foreground/60'>
								<Button
									variant={"outline"}
									size={"icon"}
									onClick={() => setExpanded((prev) => !prev)}
									className='size-8'
								>
									<BetweenHorizonalEnd />
								</Button>
							</div>

							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink asChild>
											<Link to='#'>Home</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>Dashboard</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>

						<div className='flex items-center gap-2'>
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

					<main className='w-full h-(--main-height) p-4 overflow-y-auto bg-muted/10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:hover:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300'>
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
