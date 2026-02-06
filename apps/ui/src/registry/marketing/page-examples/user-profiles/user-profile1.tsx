import { useTheme } from "@rasenganjs/theme";
import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Bell, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const socials = [
	{
		name: "Spotify",
		color: {
			light: "#F1FCF4",
			dark: "#418354ff"
		},
		icon: "/static/images/icons/spotify.webp",
		code: "a",
	},
	{
		name: "Instagram",
		color: {
			light: "#FDEBF1",
			dark: "#973b5aff"
		},
		icon: "/static/images/icons/instagram.png",
		code: "b",
	},
	{
		name: "X (Twitter)",
		color: {
			light: "#EEEEEE",
			dark: "#3b3b3bff"
		},
		icon: "/static/images/icons/x.jpg",
		code: "c",
	},
	{
		name: "Youtube",
		color: {
			light: "#FEF2F2",
			dark: "#a03232ff"
		},
		icon: "/static/images/icons/youtube.jpg",
		code: "d",
	},
	{
		name: "LinkedIn",
		color: {
			light: "#ECF8FE",
			dark: "#215b79ff"
		},
		icon: "/static/images/icons/linkedin.jpg",
		code: "e",
	},
	{
		name: "TikTok",
		color: {
			light: "#F5F5F5",
			dark: "#292929ff"
		},
		icon: "/static/images/icons/tiktok.png",
		code: "f",
	},
];

export const UserProfile1 = () => {
	const { isDark } = useTheme();

	return (
		<section className={isDark ? "dark" : ""}>
			<section className='w-full min-h-[800px] flex flex-col items-center bg-background relative overflow-hidden px-2'>
				<div className='w-full flex items-center justify-between p-4 max-w-[1500px] mx-auto'>
					<AppLogo size='sm' />

					<div className='flex gap-4 items-center'>
						<Button size='icon' variant={"ghost"} className='text-foreground'>
							<Bell />
						</Button>
						<Button className='rounded-full text-sm px-6'>Share</Button>

						<div>
							<img
								src='/static/images/avatars/4.jpeg'
								alt='Avatar'
								className='rounded-full size-10'
							/>
						</div>

						<span className='h-8 w-[1px] bg-border'></span>
						<ThemeButton />
					</div>
				</div>

				<section className='w-full max-w-[800px] mx-auto mt-20 pb-20'>
					<div className='w-full h-auto flex flex-col'>
						<img
							src='/static/images/avatars/4.jpeg'
							alt='Avatar'
							className='rounded-full w-[150px] h-[150px]'
						/>

						<div className='w-full h-auto flex flex-col mt-4'>
							<h1 className='text-4xl font-bold text-foreground'>
								Dilane Kombou
							</h1>
							<p className='text-muted-foreground mt-2'>@dilane3</p>
							<p className='text-muted-foreground mt-2 max-w-[600px]'>
								Dilane Kombou is a JavaScript Lover and creator of{" "}
								<a
									href='https://rasengan.dev'
									className='text-primary hover:underline'
									target='_blank'
								>
									Rasengan.js
								</a>
								{", "}
								<a
									href='https://ui.rasengan.dev'
									className='text-primary hover:underline'
									target='_blank'
								>
									Rasengan UI
								</a>
								{", "}
								<a
									href='https://hub.rasengan.dev'
									className='text-primary hover:underline'
									target='_blank'
								>
									Rasengan Hub
								</a>
								{", "}
								<a
									href='#'
									className='text-primary hover:underline'
									target='_blank'
								>
									Chunin
								</a>
								<br />
								He's passionated about building tools and frameworks to help
								developers build better UIs.
							</p>
							<div className='flex gap-2 mt-2'>
								<Badge
									variant='outline'
									className='rounded-full cursor-pointer dark:bg-input/30'
								>
									UI
								</Badge>
								<Badge
									variant='outline'
									className='rounded-full cursor-pointer dark:bg-input/30'
								>
									Framework
								</Badge>
								<Badge
									variant='outline'
									className='rounded-full cursor-pointer dark:bg-input/30'
								>
									Tools
								</Badge>
							</div>

							<div className='flex justify-between gap-2 mt-10'>
								<div className='flex gap-2'>
									<Button className='rounded-full cursor-pointer'>
										Let's Chat
									</Button>
									<Button
										variant='outline'
										className='rounded-full cursor-pointer text-foreground'
									>
										<Coffee />
										<span>Buy me a coffee</span>
									</Button>
								</div>

								<div className='flex flex-col '>
									<span className='text-[12px] text-muted-foreground leading-4'>
										Followers
									</span>
									<span className='text-lg font-bold text-foreground leading-4'>
										19k
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='social-card-grid w-full mt-20'>
						{socials.map((social) => (
							<SocialCard
								key={social.name}
								item={social}
								className={social.code}
							/>
						))}
					</div>
				</section>
			</section>
		</section>
	);
};

const SocialCard = ({
	className,
	item,
}: {
	className?: string;
	item: (typeof socials)[0];
}) => {
	const { isDark } = useTheme();

	return (
		<article
			className={cn(
				"w-full min-h-[200px] flex flex-col justify-between border rounded-lg p-4 hover:scale-105 transition-all cursor-pointer duration-300",
				className,
				`bg-[${item.color}]`
			)}
			style={{
				background: isDark ? item.color.dark : item.color.light,
			}}
		>
			<div className='w-full justify-between flex gap-2'>
				<img
					src={item.icon}
					alt={item.name}
					className='size-8 aspect-square rounded-lg object-cover'
				/>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full size-8 cursor-pointer bg-white text-black'
				>
					<ArrowUpRight />
				</Button>
			</div>
			<div className='text-foreground'>
				<h1 className='text-md font-medium'>{item.name}</h1>
			</div>
		</article>
	);
};
