import Image from "@rasenganjs/image";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { useTheme } from "@rasenganjs/theme";

/**
 * Hero 8
 *
 * Hero with centered text and image
 */
export const Hero8 = () => {
	const { isDark } = useTheme();

	return (
		<section className={isDark ? "dark" : ""}>
			<section className='w-full min-h-[800px] flex flex-col items-center bg-[#F1F1F1] dark:bg-background relative overflow-hidden px-2'>
				<div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 max-w-[1500px] mx-auto'>
					<AppLogo size='sm' />

					<div className='flex gap-4 items-center'>
						<ThemeButton />
						<Button className='rounded-full bg-white hover:bg-white/80 text-foreground dark:text-primary-foreground text-sm p-6'>
							Sign In
						</Button>
					</div>
				</div>

				<div className='relative mt-28 w-full max-w-[1000px] p-2'>
					<div className='z-20 w-full flex flex-col items-center justify-center text-center px-4'>
						<h1 className='text-[50px] leading-[60px] max-w-[650px] font-bold text-center text-foreground'>
							AI-powered project briefs for designers
						</h1>
						<p className='text-md text-center text-foreground max-w-[600px] mt-4'>
							Transform your ideas into comprehensive project briefs in seconds!
							Let AI create your project brief while you focus on bringing your
							vision to life.
						</p>

						<div className='relative w-full flex items-center justify-center mt-6 py-4'>
							{/* Lines */}
							<div className='absolute top-0 -translate-x-1/2 left-1/2 h-[1px] w-[140%] bg-gradient-to-r from-0% to-100% from-transparent via-primary/10 to-transparent'></div>

							<div className='flex gap-4 mb-10'>
								<Button className='rounded-full p-6 text-sm'>
									Get Started for free
								</Button>
							</div>
						</div>
					</div>

					<div className='relative w-full flex items-center justify-center mt-6 py-2'>
						{/* Lines */}
						<div className='absolute top-0 -translate-x-1/2 left-1/2 h-[1px] w-[140%] bg-gradient-to-r from-0% to-100% from-transparent via-primary/10 to-transparent'></div>

						<div className='w-full'>
							<Image
								src='/static/images/hero/4.png'
								alt='Background Image'
								className='object-cover w-full h-full rounded-3xl '
								width={"100%"}
								height={"auto"}
							/>
						</div>
					</div>

					{/* Lines */}
					<div className='absolute top-0 -translate-x-1/2 left-1/2 h-[1px] w-[140%] bg-gradient-to-r from-0% to-100% from-transparent via-primary/20 to-transparent'></div>
					<div className='absolute bottom-0 -translate-x-1/2 left-1/2 h-[1px] w-[140%] bg-gradient-to-r from-0% to-100% from-transparent via-primary/20 to-transparent'></div>

					<div className='absolute left-0 -translate-y-1/2 top-1/2 w-[1px] h-[130%] bg-gradient-to-b from-0% to-100% from-transparent via-primary/20 to-transparent'></div>
					<div className='absolute right-0 -translate-y-1/2 top-1/2 w-[1px] h-[130%] bg-gradient-to-b from-0% to-100% from-transparent via-primary/20 to-transparent'></div>
				</div>

				<div className='my-10 mb-[60px]'>
					<p className='text-sm text-muted-foreground'>
						Join 80,000+ designers
					</p>

					<div className='relative mt-2 mb-20'>
						<div className='absolute left-0'>
							<Image
								src='/static/images/avatars/1.jpeg'
								alt='Avatar Image'
								width={40}
								height={40}
								className='rounded-full'
							/>
						</div>
						<div className='absolute left-6'>
							<Image
								src='/static/images/avatars/2.jpeg'
								alt='Avatar Image'
								width={40}
								height={40}
								className='rounded-full'
							/>
						</div>
						<div className='absolute left-12'>
							<Image
								src='/static/images/avatars/3.jpeg'
								alt='Avatar Image'
								width={40}
								height={40}
								className='rounded-full'
							/>
						</div>
						<div className='absolute left-18'>
							<Image
								src='/static/images/avatars/5.jpeg'
								alt='Avatar Image'
								width={40}
								height={40}
								className='rounded-full'
							/>
						</div>
						<div className='absolute left-24'>
							<Button
								variant={"outline"}
								className='h-10 rounded-full text-blue-400 border-blue-400 bg-blue-50'
							>
								1900+
							</Button>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};
