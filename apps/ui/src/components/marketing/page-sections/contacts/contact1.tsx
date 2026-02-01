import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const Contact1 = () => {
	return (
		<section className='w-full min-h-[500px] max-w-[1300px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-8 mt-20 px-4 lg:px-20'>
			<div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start'>
				<Badge variant={"outline"} className='rounded-full px-4 py-2 gap-2'>
					<Sparkle size={16} className='text-yellow-500' />
					<span>Contact us</span>
				</Badge>
				<h2 className='text-5xl font-bold mt-8 text-foreground text-center lg:text-left text-pretty'>
					Talk to our Sales Team
				</h2>
				<p className='text-center lg:text-left text-muted-foreground mt-6 font-medium'>
					Learn about our journey, mission and the team driving innovation
				</p>

				<div className='w-full mt-16 flex flex-col gap-2'>
					<div className='rounded-xl bg-background dark:bg-input/70 border p-4 flex items-center gap-4'>
						<span className='size-10 rounded-full flex items-center justify-center bg-[#3e4bff]'>
							<Mail className='text-white' size={18} />
						</span>
						<div className='flex flex-col'>
							<span className='text-sm text-foreground/70 font-medium'>
								Email Address
							</span>
							<span className='text-lg text-foreground font-medium'>
								contact@rasengan.dev
							</span>
						</div>
					</div>

					<div className='rounded-xl bg-background dark:bg-input/70 border p-4 flex items-center gap-4'>
						<span className='size-10 rounded-full flex items-center justify-center bg-[#3e4bff]'>
							<Phone className='text-white' size={18} />
						</span>
						<div className='flex flex-col'>
							<span className='text-sm text-foreground/70 font-medium'>
								Phone Number
							</span>
							<span className='text-lg text-foreground font-medium'>
								+237 655 555 555
							</span>
						</div>
					</div>

					<div className='rounded-xl bg-background dark:bg-input/70 border p-4 flex items-center gap-4'>
						<span className='size-10 rounded-full flex items-center justify-center bg-[#3e4bff]'>
							<MapPin className='text-white' size={18} />
						</span>
						<div className='flex flex-col'>
							<span className='text-sm text-foreground/70 font-medium'>
								Our Office
							</span>
							<span className='text-lg text-foreground font-medium'>
								Yaoundé, Cameroon
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-10 lg:mt-0 w-full h-full lg:w-1/2 gap-4 rounded-xl pb-10 lg:pb-0'>
				<form action=''>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='name' className='text-foreground'>
								Name
							</label>
							<Input
								type='text'
								name='name'
								id='name'
								placeholder='Enter your name'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='email' className='text-foreground'>
								Email
							</label>
							<Input
								type='email'
								name='email'
								id='email'
								placeholder='Enter your email'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='message' className='text-foreground'>
								Message
							</label>
							<div
								className={cn(
									"relative rounded-2xl border w-full h-auto bg-background dark:bg-input/70 mx-auto"
								)}
							>
								<div
									// ref={messageRef}
									contentEditable
									data-placeholder={"Ask us anything"}
									className='w-full min-h-[250px] max-h-[400px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
								></div>
							</div>
						</div>
						<Button type='submit'>Send</Button>
					</div>
				</form>
			</div>
		</section>
	);
};
