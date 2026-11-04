import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const Contact2 = () => {
	return (
		<section className='w-full min-h-[500px] md:max-w-[700px] lg:max-w-[1300px] mx-auto mt-20 px-4 lg:px-20'>
			<div className='w-full flex flex-col items-center gap-2'>
				<h2 className='max-w-[600px] text-5xl font-bold text-foreground text-center text-pretty'>
					Get in touch, Let us know how we can help
				</h2>
			</div>
			<div className='mt-16 flex flex-col lg:flex-row lg:justify-between gap-8'>
				<div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start'>
					<iframe
						className='w-full min-h-[400px] h-full rounded-xl'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.612606522662!2d10.156666666666666!3d3.866666666666666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10275c0c0c0c0c0c%3A0x10275c0c0c0c0c0c!2sYaoundé%2C%20Cameroon!5e0!3m2!1sen!2scm!4v1722566666666!5m2!1sen!2scm'
					></iframe>
				</div>

				<div className='mt-10 lg:mt-0 w-full h-full lg:w-1/2 gap-4 rounded-xl lg:pb-0'>
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
										className='w-full min-h-[150px] max-h-[250px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
									></div>
								</div>
							</div>
							<Button type='submit'>Send</Button>
						</div>
					</form>
				</div>
			</div>

			<div className='w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-10'>
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
		</section>
	);
};
