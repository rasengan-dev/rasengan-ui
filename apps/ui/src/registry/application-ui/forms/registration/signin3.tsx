import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";
import ThemeButton from "@/registry/application-ui/granulars/buttons/theme-button1";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";


const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const SigninPage3 = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full min-h-screen h-auto flex flex-col p-4 bg-background",
				isDark && "dark"
			)}
		>
			<header className='w-full h-auto flex justify-between items-center'>
				<AppLogo size='sm' minimal />

				<div className='w-auto h-auto flex items-center gap-2'>
					<ThemeButton />
					<Button variant='outline' className='text-foreground'>
						Sign Up
					</Button>
				</div>
			</header>

			<div className='w-full max-w-[360px] mx-auto h-auto flex flex-col mt-20'>
				<div className='w-full h-auto flex flex-col items-center'>
					<div className='w-full h-auto flex flex-col'>
						<h1 className='text-4xl font-medium text-foreground'>
							Welcome back
						</h1>
						<p className='text-muted-foreground mt-4'>
							We are proud to have you back!
						</p>
					</div>

					<div className='w-full mt-4'>
						<div>
							<label
								htmlFor='email'
								className='text-sm font-medium text-foreground'
							>
								Email
							</label>
							<Input
								placeholder='Enter your email'
								className='h-12 text-foreground'
							/>
						</div>

						<div className='mt-4'>
							<label
								htmlFor='password'
								className='text-sm font-medium text-foreground'
							>
								Password
							</label>
							<Input
								placeholder='Enter your password'
								className='h-12 text-foreground'
								type='password'
							/>
						</div>

						<div className='mt-4'>
							<Button variant='link' className='px-0 text-foreground'>
								<span>Forgot Password?</span>
							</Button>
						</div>

						<Button className='w-full mt-4 h-12'>Login</Button>
					</div>

					{/* Add or separator */}
					<div className='w-full mt-4 flex items-center gap-2'>
						<div className='w-full h-[1px] bg-muted'></div>
						<p className='text-muted-foreground text-center'>or</p>
						<div className='w-full h-[1px] bg-muted'></div>
					</div>

					<div className='w-full'>
						<Button
							variant='outline'
							className='w-full mt-4 h-12 text-foreground'
						>
							<img
								src={`${registryUrl}/static/images/icons/google.png`}
								alt='google'
								width={24}
								height={24}
							/>
							<span>Continue with Google</span>
						</Button>
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
