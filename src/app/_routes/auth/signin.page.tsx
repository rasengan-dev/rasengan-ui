import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, PageComponent } from "rasengan";
import Image from "@rasenganjs/image";
import { Input } from "@/components/ui/input";
import { authProvider } from "@/provider/data/auth";
import { OAuthProvider } from "appwrite";

const Page: PageComponent = () => {
	const handleLoginWithMagicLink = async () => {
		const { data } = await authProvider.loginWithMagicLink(
			"komboudilane125@gmail.com"
		);
	};

	const handleLoginWithOAuth = async (
		provider: OAuthProvider.Github | OAuthProvider.Google
	) => {
		const { data } = await authProvider.loginWithOAuth(provider);
	};

	return (
		<section
			className={cn(
				"w-full min-h-screen h-auto flex flex-col p-4 bg-background"
			)}
		>
			<header className='w-full h-auto flex justify-between items-center'>
				<Link to='/' className='size-8'>
					<Button size={"icon"} variant={"ghost"} className='size-8'>
						<AppLogo size='sm' />
					</Button>
				</Link>

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
							className='w-full mt-4 h-12 text-foreground rounded-xl'
						>
							<Image
								src='/static/images/icons/google.png'
								alt='google'
								width={24}
								height={24}
							/>
							<span>Continue with Google</span>
						</Button>
						<Button
							variant='outline'
							className='w-full mt-4 h-12 text-foreground rounded-xl'
							onClick={() => handleLoginWithOAuth(OAuthProvider.Github)}
						>
							<div className='rounded-full p-[1px] bg-transparent dark:bg-white'>
								<Image
									src='/static/images/icons/github.svg'
									alt='github'
									width={24}
									height={24}
								/>
							</div>
							<span>Continue with Github</span>
						</Button>
					</div>

					{/* Add or separator */}
					<div className='w-full mt-4 flex items-center gap-2'>
						<div className='w-full h-[1px] bg-border'></div>
						<p className='text-muted-foreground text-center'>or</p>
						<div className='w-full h-[1px] bg-border'></div>
					</div>

					<div className='w-full mt-4'>
						<div>
							<Input
								placeholder='Enter your email'
								className='h-12 text-foreground rounded-xl'
							/>
						</div>

						<Button
							className='w-full mt-4 h-12 rounded-xl'
							onClick={handleLoginWithMagicLink}
						>
							Continue
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

Page.metadata = {
	title: "Sign In",
	description: "Sign in to your account",
};

export default Page;
