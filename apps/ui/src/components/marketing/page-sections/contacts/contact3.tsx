import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const Contact3 = () => {
	return (
		<section className='w-full min-h-[500px] md:max-w-[700px] lg:max-w-[1000px] mx-auto flex flex-col gap-8 mt-10 px-4 lg:px-20'>
			<div className='w-full flex flex-col items-center gap-2'>
				<h2 className='text-5xl font-bold mt-8 text-foreground text-center lg:text-left text-pretty'>
					Talk to our Sales Team
				</h2>
				<p className='text-center text-pretty lg:text-left text-muted-foreground mt-6 font-medium'>
					Learn about our journey, mission and the team driving innovation
				</p>
			</div>

			<div className='w-full flex flex-col items-center lg:items-start'>
				<div className='rounded-xl w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-2 bg-background dark:bg-input/40 border '>
					<div className='p-4 flex items-center gap-4'>
						<span className='size-10 shrink-0 rounded-full flex items-center justify-center bg-[#3e4bff]'>
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

					<div className='p-4 flex items-center gap-4'>
						<span className='size-10 shrink-0 rounded-full flex items-center justify-center bg-[#3e4bff]'>
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

					<div className='p-4 flex items-center gap-4'>
						<span className='size-10 shrink-0 rounded-full flex items-center justify-center bg-[#3e4bff]'>
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

			<div className='mt-10 lg:mt-0 w-full h-full gap-4 rounded-xl pb-10'>
				<form
					action=''
					className='bg-background dark:bg-input/40 p-6 rounded-xl border'
				>
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
									className='w-full min-h-[130px] max-h-[250px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
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
