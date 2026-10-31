import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";
import { ComponentProps, useRef, useState } from "react";

type Props = {
	className?: ComponentProps<"section">["className"];
};

type FileObj = {
	id: number;
	data: File;
	uploading: boolean;
	percentage: number;
};

export const UploadFileCard2 = ({ className }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<Array<FileObj>>([]);
	const [isDragging, setIsDragging] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files ?? [];
		const filesToUpload: FileObj[] = [];

		for (const file of files) {
			filesToUpload.push({
				id: Date.now() + Math.floor(Math.random() * 100),
				data: file,
				uploading: true,
				percentage: 0,
			});
		}

		setFiles((files) => [
			...files,
			...filesToUpload.slice(0, 4 - files.length),
		]);
	};

	const handleDropComponent = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const files = e.dataTransfer.files ?? [];
		const filesToUpload: FileObj[] = [];

		for (const file of files) {
			filesToUpload.push({
				id: Date.now(),
				data: file,
				uploading: true,
				percentage: 0,
			});
		}

		setFiles((files) => [
			...files,
			...filesToUpload.slice(0, 4 - files.length),
		]);
		setIsDragging(false);
	};

	const handleOpenFileExplorer = () => {
		inputRef.current?.click();
	};

	const handleDeleteFile = (fileId: number) => {
		const prevFiles = [...files];

		const index = files.findIndex((file) => file.id === fileId);

		if (index !== -1) {
			prevFiles.splice(index, 1);

			setFiles(prevFiles);
		}
	};

	const generateReadableImage = (file: File) => URL.createObjectURL(file);

	return (
		<article
			className={cn(
				"relative w-full max-w-[600px] rounded-2xl shadow-md bg-background dark:border-[1px] border-border",
				className
			)}
		>
			<div className='h-[60px] border-b border-border flex items-center justify-between px-4'>
				<span className='font-medium text-md text-foreground/70'>
					Upload Images
				</span>
				<Button variant={"outline"} size={"icon"} className='size-8'>
					<X size={14} className='text-foreground' />
				</Button>
			</div>

			<div className='w-full flex flex-col p-4'>
				<div
					className={cn(
						"border-[1px] border-border border-dashed min-h-[200px] w-full rounded-xl flex flex-col items-center justify-center gap-4 py-4",
						isDragging && "bg-muted"
					)}
					onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
						e.preventDefault();
						e.stopPropagation();
						setIsDragging(true);
					}}
					onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
						e.preventDefault();
						e.stopPropagation();
						setIsDragging(false);
					}}
					onDrop={handleDropComponent}
				>
					<UploadCloud className='text-muted-foreground' />

					<div className='w-full flex flex-col items-center gap-2 px-4'>
						<h2 className='text-foreground font-bold text-center text-pretty'>
							Choose a file or drag and drop it here
						</h2>
						<p className='text-sm text-muted-foreground text-center text-pretty'>
							JPEG, PNG, GIF and WEBP formats up to 10 MB
						</p>
					</div>

					<Button
						onClick={handleOpenFileExplorer}
						disabled={files.length === 4}
					>
						Browse File
					</Button>

					<input
						type='file'
						ref={inputRef}
						hidden
						onChange={handleFileChange}
						multiple
					/>
				</div>

				<div className='grid grid-cols-4 w-full gap-4 mt-4'>
					{files.map((file) => (
						<div
							key={file.id}
							className='relative bg-muted aspect-square rounded-lg overflow-hidden'
						>
							<img
								src={generateReadableImage(file.data)}
								alt='Image'
								className="w-full h-full object-cover"
							/>

							<span
								onClick={() => handleDeleteFile(file.id)}
								className='absolute right-1 top-1 size-6 bg-red-400 rounded-full flex items-center justify-center'
							>
								<X
									size={16}
									className='text-primary-foreground dark:text-primary'
								/>
							</span>
						</div>
					))}

					{files.length < 4 &&
						new Array(4 - files.length)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className='bg-muted aspect-square rounded-lg'
								></div>
							))}
				</div>

				<Button className='mt-4'>Upload</Button>
			</div>
		</article>
	);
};
