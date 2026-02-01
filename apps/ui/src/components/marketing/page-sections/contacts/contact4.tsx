import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const Contact4 = () => {
	return (
		<section className='w-full flex items-center justify-center px-4'>
			<div className='w-full max-w-[600px] lg:max-w-[1200px] min-h-[250px] mt-16 flex flex-col-reverse lg:flex-row md:items-center border md:justify-between gap-4 rounded-4xl px-8 md:px-10 py-10'>
				<form
					action=''
					className='w-full h-full lg:w-1/2 bg-background dark:bg-input/40 p-6 rounded-xl border'
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
									className='w-full min-h-[200px] max-h-[250px] h-auto empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:absolute empty:before:pointer-events-none empty:before:inset-4 outline-0 text-foreground py-4 px-4 pb-4 overflow-auto rounded-2xl'
								></div>
							</div>
						</div>
						<Button type='submit'>Send</Button>
					</div>
				</form>

				<div className='w-full lg:w-1/2 lg:max-w-[500px]'>
					<img
						src='/static/images/cta/1.jpeg'
						alt='cta4'
						className='w-full aspect-square object-cover rounded-xl'
					/>
				</div>
			</div>
		</section>
	);
};
