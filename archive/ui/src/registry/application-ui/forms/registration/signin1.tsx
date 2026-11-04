import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLogo from "@/registry/application-ui/granulars/logos/logo1";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const SigninPage1 = () => {
	return (
		<section className='w-screen min-h-screen h-auto flex justify-between lg:items-center p-4 bg-[#02101a]'>
			<div className='flex justify-between min-h-[600px] w-full max-h-[1000px] max-w-[1500px] mx-auto dark:border-[1px] dark:border-border p-4 shadow-md bg-background rounded-4xl'>
				<div className='w-full lg:w-[45%] max-w-[600px] mx-auto lg:mx-0 h-full px-2 sm:px-4 xl:px-20'>
					<AppLogo size='sm' />

					<div className='mt-20 text-foreground'>
						<h1 className='text-4xl sm:text-5xl font-medium'>
							Keep your online business organized
						</h1>
						<p className='text-foreground mt-4'>
							Signup to start your 30 days free trial
						</p>
					</div>

					<div className='mt-10'>
						<div className='flex flex-col gap-4'>
							<Button className='w-full text-foreground' variant='outline'>
								Sign in with Google
							</Button>

							<Button className='w-full text-foreground' variant='outline'>
								Sign in with Github
							</Button>
						</div>

						<div className='flex items-center justify-center mt-4 gap-4'>
							<div className='w-full h-[1px] bg-muted'></div>
							<p className='text-muted-foreground text-center'>or</p>
							<div className='w-full h-[1px] bg-muted'></div>
						</div>

						<div className='mt-4'>
							<form action='' className='flex flex-col gap-4'>
								<div>
									<label htmlFor='Name' className='text-sm font-medium'>
										Name
									</label>
									<Input placeholder='Enter your name' />
								</div>

								<div>
									<label htmlFor='Email' className='text-sm font-medium'>
										Email
									</label>
									<Input placeholder='Enter your email' />
								</div>

								<div>
									<label htmlFor='Password' className='text-sm font-medium'>
										Password
									</label>
									<Input placeholder='Enter your password' type='password' />
								</div>

								<div className='mt-4'>
									<Button className='w-full'>Create Account</Button>
									<div className='mt-4 text-center text-sm text-muted-foreground'>
										<p>
											Already have an account?{" "}
											<span className='font-medium underline text-foreground cursor-pointer'>
												Login Here
											</span>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='hidden lg:block relative w-[55%] rounded-3xl overflow-hidden'>
					<img
						src={`${registryUrl}/static/images/auth/1.jpeg`}
						alt='signin'
						width={"100%"}
						className='w-full h-auto max-h-[800px] object-cover'
					/>

					<div className='w-full h-full absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent'></div>
				</div>
			</div>
		</section>
	);
};
