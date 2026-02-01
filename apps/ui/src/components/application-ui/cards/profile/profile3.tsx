import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "@rasenganjs/image";
import { Plus, X } from "lucide-react";
import { ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: ComponentProps<"article">["className"];
};

export const ProfileCard3 = ({ className }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [file, setFile] = useState<File | null>(null);
	const [readableFile, setReadableFile] = useState("");

	const handleOpenFileExplorer = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const readable = URL.createObjectURL(file);

			setFile(file);
			setReadableFile(readable);
		}
	};

	return (
		<article
			className={twMerge(
				"relative w-full max-w-[600px] rounded-2xl shadow-md bg-background border-[1px] border-border",
				className
			)}
		>
			<div className='h-[60px] border-b border-border flex items-center justify-between px-4'>
				<span className='font-medium text-lg text-foreground/70'>
					Update Profile
				</span>
				<Button variant={"outline"} size={"icon"} className='size-8'>
					<X size={14} className='text-foreground' />
				</Button>
			</div>

			<div className='w-full flex flex-col sm:flex-row mt-6 mb-4'>
				<div className='w-full sm:w-1/3 min-h-[100px] sm:border-r sm:border-dashed sm:border-border p-4 flex flex-col items-center'>
					<div className='relative'>
						<Image
							src={
								readableFile ? readableFile : "/static/images/avatars/3.jpeg"
							}
							alt='Avatar'
							className='rounded-full'
							width={60}
							height={60}
						/>

						<span
							onClick={handleOpenFileExplorer}
							className='absolute -right-2 top-0 size-6 bg-primary rounded-full flex items-center justify-center border-2 border-background'
						>
							<Plus size={16} className='text-primary-foreground' />
						</span>
					</div>

					<div className='mt-6'>
						<h2 className='text-foreground font-medium'>Upload Image</h2>
						<p className='text-foreground/60 text-sm'>Max file sixe: 1MB</p>
					</div>

					<Button
						className='mt-4 dark:text-foreground'
						variant={"outline"}
						onClick={handleOpenFileExplorer}
					>
						Add Image
					</Button>

					<input
						ref={inputRef}
						hidden
						type='file'
						accept='images/*'
						onChange={handleFileChange}
					/>
				</div>

				<div className='w-full sm:w-2/3 min-h-[100px] px-6'>
					<div className='text-foreground'>
						<label htmlFor='name' className='font-medium'>
							Author name
						</label>
						<Input placeholder='Your name' />
					</div>

					<div className='mt-4 text-foreground'>
						<label htmlFor='name' className='font-medium'>
							Title
						</label>
						<Input placeholder='Your title' />
					</div>

					<div className='mt-6 flex gap-4'>
						<Button variant={"outline"} className='dark:text-foreground'>
							Cancel
						</Button>
						<Button>Save Changes</Button>
					</div>
				</div>
			</div>
		</article>
	);
};
