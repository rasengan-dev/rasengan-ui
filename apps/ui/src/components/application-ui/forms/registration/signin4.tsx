import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "@rasenganjs/image";
import { useTheme } from "@rasenganjs/theme";
import { twMerge } from "tailwind-merge";

export const SigninPage4 = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={twMerge(
				"w-full min-h-screen h-auto flex flex-col p-4 bg-background",
				isDark && "dark"
			)}
		>
			<header className='w-full h-auto flex justify-between items-center'>
				<AppLogo size='sm' />

				<div className='w-auto h-auto flex items-center gap-2'>
					<ThemeButton />
					<Button variant='outline' className='text-foreground'>
						Sign Up
					</Button>
				</div>
			</header>

			<div className='w-full max-w-[360px] mx-auto h-auto flex flex-col mt-20'>
				<div className='w-full h-auto flex flex-col items-center'>
					<div className='w-full h-auto flex flex-col items-center'>
						<AppLogo size='md' minimal />
						<h1 className='text-4xl font-medium text-foreground'>
							Welcome back
						</h1>
					</div>

					<div className='w-full mt-4'>
						<Button
							variant='outline'
							className='w-full mt-4 h-12 text-foreground rounded-full'
						>
							<Image
								src='/static/images/icons/google.png'
								alt='google'
								width={24}
								height={24}
							/>
							<span>Continue with Google</span>
						</Button>
					</div>

					{/* Add or separator */}
					<div className='w-full mt-4 flex items-center gap-2'>
						<div className='w-full h-[1px] bg-muted'></div>
						<p className='text-muted-foreground text-center'>or</p>
						<div className='w-full h-[1px] bg-muted'></div>
					</div>

					<div className='w-full mt-4'>
						<div>
							<Input
								placeholder='Enter your email'
								className='h-12 text-foreground'
							/>
						</div>

						<Button className='w-full mt-4 h-12 rounded-full'>Continue</Button>
					</div>

					<div className='w-full mt-4 flex items-center justify-center'>
						<span className='text-muted-foreground'>
							Don't have an account?
						</span>
						<Button variant='link' className='text-foreground'>
							Sign Up
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
