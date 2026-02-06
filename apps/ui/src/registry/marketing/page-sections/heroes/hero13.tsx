import Image from "@rasenganjs/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, User } from "lucide-react";
import AppLogo from "@/components/common/atoms/app-logo";
import { Link } from "rasengan";
import { Badge } from "@/components/ui/badge";
import { Brands2 } from "@/components/common/molecules/brands";

/**
 * Hero 10
 *
 * Hero with left bottom text and background image
 */
export const Hero13 = () => {
	return (
		<section className='w-full h-screen overflow-x-hidden'>
			<section className='w-full h-auto bg-[#080808] min-h-screen max-h-[1000px] flex flex-col justify-start relative overflow-hidden'>
				<div className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 lg:px-10 py-4 max-w-[1500px] mx-auto'>
					<div className='flex items-center gap-4'>
						<AppLogo size='sm' className='text-white' />
					</div>

					<nav className='hidden lg:block px-4 py-2'>
						<ul className='flex items-center gap-4 text-white/70 text-sm'>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Home</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									About
								</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>
									Contact
								</li>
							</Link>
							<Link to='#'>
								<li className='font-medium px-3 py-1 hover:text-white'>Blog</li>
							</Link>
						</ul>
					</nav>

					<div className='flex gap-4'>
						<Button className='bg-transparent text-white rounded-full'>
							Login
						</Button>
						<Button className='rounded-full bg-[#202020] hover:bg-[#202020]/80 text-white hover:text-white border border-[#434343]'>
							<User />
							<span>Create Account</span>
						</Button>
					</div>
				</div>

				{/* Floating blured circles */}
				<div className='absolute -top-20 -left-20 size-[400px] bg-[#202020] blur-[150px]'></div>
				<div className='absolute -bottom-20 -right-20 size-[400px] bg-[#202020] blur-[150px]'></div>

				{/* Floating stars */}
				<div className='absolute top-[80px] lg:top-[160px] left-[10px] lg:left-[90px] animate-pulse'>
					<Image
						src='/static/images/illustrations/2.png'
						alt='Background Image'
						className='object-cover w-full h-full'
					/>
				</div>

				<div className='absolute top-[180px] lg:top-[320px] left-[10px] lg:left-[250px] animate-pulse'>
					<Image
						src='/static/images/illustrations/2.png'
						alt='Background Image'
						className='object-cover w-full h-full'
					/>
				</div>

				<div className='absolute top-[80px] lg:top-[160px] right-[10px] lg:right-[90px] animate-pulse'>
					<Image
						src='/static/images/illustrations/2.png'
						alt='Background Image'
						className='object-cover w-full h-full'
					/>
				</div>

				<div className='absolute top-[180px] lg:top-[320px] right-[10px] lg:right-[250px] animate-pulse'>
					<Image
						src='/static/images/illustrations/2.png'
						alt='Background Image'
						className='object-cover w-full h-full'
					/>
				</div>

				<div className='z-10 w-full flex flex-col items-center justify-end text-center mt-[100px] md:mt-[130px] px-4 md:px-10 pb-20'>
					<Badge
						variant='outline'
						className='h-8 px-4 gap-2 rounded-full bg-[#202020] hover:bg-[#202020]/80 text-white/70 hover:text-white border border-[#434343]'
					>
						<Star size={18} />
						<span>45K+ Users trust us</span>
					</Badge>
					<h1 className='mt-8 relative z-20 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[600px] font-medium text-center text-white text-pretty'>
						On-Chain Credit Scores That Matter
					</h1>
					<p className='relative z-20 text-sm text-center text-white/60 max-w-[400px] mt-4 text-pretty'>
						Track and grow your on-chain credit score based on real transaction
						history
					</p>

					<div className='relative z-20 mt-10 flex gap-4'>
						<Button className='bg-white hover:bg-white/80 text-black rounded-full'>
							<span>Check My Score</span>
						</Button>

						<Button
							variant='outline'
							className='rounded-full bg-[#202020] hover:bg-[#202020]/80 text-white hover:text-white border border-[#434343]'
						>
							<span>How It Works</span>
							<ArrowRight />
						</Button>
					</div>
				</div>

				<div className='relative z-20 w-full flex flex-col items-center gap-4 mt-auto pb-10 px-4'>
					<p className='text-white/70 text-center'>
						Tracking data from{" "}
						<span className='text-white font-medium'>1000+ most popular</span>{" "}
						stores worldwide
					</p>
					<Brands2 className='border border-[#434343] hover:border-white/40 transition-all h-[80px] bg-[#202020]' />
				</div>

				<div className='absolute top-0 left-0 right-0 bottom-0 w-full'>
					<Image
						src='/static/images/illustrations/1.png'
						alt='Background Image'
						className='object-contain w-full'
						width={"100%"}
						height={"100%"}
					/>
				</div>

				<div className='absolute top-[calc(100vh-300px)] left-1/2 -translate-x-1/2 size-[2000px] rounded-full bg-[#202020] blur-[80px]d'></div>
				<div className='absolute top-[calc(100vh-260px)] left-1/2 -translate-x-1/2 size-[1850px] rounded-full bg-radial from-transparent to-[#080808] blur-[20px]'></div>
			</section>
		</section>
	);
};
