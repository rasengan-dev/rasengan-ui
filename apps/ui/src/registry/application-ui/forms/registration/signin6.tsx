import AppLogo from "@/registry/application-ui/granulars/logos/logo1";
import ThemeButton from "@/registry/application-ui/granulars/buttons/theme-button1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@rasenganjs/theme";
import { cn } from "@/lib/utils";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const SigninPage6 = () => {
	const { isDark } = useTheme();

	return (
		<section
			className={cn(
				"w-full min-h-screen h-auto flex flex-col bg-background",
				isDark && "dark"
			)}
		>
			<div className='fixed inset-0'>
				<img
					className='w-full h-full object-cover'
					src={`${registryUrl}/static/images/gradients/6.jpeg`}
					alt=''
				/>
			</div>

			<div className='relative z-20 w-full max-w-[600px] h-screen bg-background border-r p-4 overflow-auto'>
				<ThemeButton />

				<div className='w-full max-w-[360px] mx-auto h-auto flex flex-col mt-16'>
					<div className='w-full h-auto flex flex-col items-center'>
						<div className='w-full h-auto items-center flex flex-col'>
							<AppLogo size='sm' minimal />

							<h1 className='text-4xl font-medium text-foreground mt-16'>
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

							<Button className='w-full mt-4 h-12 rounded-full'>Login</Button>
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
								className='w-full mt-4 h-12 text-foreground rounded-full'
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
			</div>
		</section>
	);
};
