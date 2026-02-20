import { Button } from "@/components/ui/button";
import { cn, detectFileFormat, formatFileSize, truncateMiddle } from "@/lib/utils";
import { CheckCircle, Dot, Trash2, UploadCloud, X } from "lucide-react";
import {
	ComponentProps,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

type Props = {
	className?: ComponentProps<"section">["className"];
};

type FileObj = {
	id: number;
	data: File;
	uploading: boolean;
	percentage: number;
};

export const UploadFileCard1 = ({ className }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<Array<FileObj>>([]);
	const [isDragging, setIsDragging] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const fileObj = {
				id: Date.now(),
				data: file,
				uploading: true,
				percentage: 0,
			};

			setFiles((files) => [...files, fileObj]);
		}
	};

	const handleDropComponent = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const file = e.dataTransfer.files[0];

		if (file) {
			const fileObj = {
				id: Date.now(),
				data: file,
				uploading: true,
				percentage: 0,
			};

			setFiles((files) => [...files, fileObj]);

			setIsDragging(false);
		}
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

	const handleUpdateFile = useCallback(
		(file: FileObj) => {
			const prevFiles = [...files];

			const index = files.findIndex((f) => f.id === file.id);

			if (index !== -1) {
				prevFiles[index] = file;

				setFiles(prevFiles);
			}
		},
		[JSON.stringify(files)]
	);

	return (
		<section
			className={cn(
				"w-full max-w-[400px] rounded-xl bg-background overflow-hidden shadow-md dark:border-[1px] border-border",
				className
			)}
		>
			<header className='min-h-[60px] border-b-[1px] border-border flex items-center p-4 gap-2'>
				<div className='size-12 shrink-0 rounded-full flex items-center justify-center border border-border border-dashed'>
					<UploadCloud className='text-muted-foreground' />
				</div>
				<div>
					<h2 className='text-foreground font-bold'>Upload files</h2>
					<p className='text-muted-foreground text-sm'>
						Select and upload the files of your choice
					</p>
				</div>
			</header>

			<section className='p-4'>
				<div
					className={cn(
						"border-[1px] border-border border-dashed min-h-[200px] rounded-xl flex flex-col items-center justify-center gap-4 py-4",
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
							JPEG, PNG, PDF and MP4 formats up to 50 MB
						</p>
					</div>

					<Button onClick={handleOpenFileExplorer}>Browse File</Button>

					<input
						type='file'
						ref={inputRef}
						hidden
						onChange={handleFileChange}
					/>
				</div>

				{files.length > 0 && (
					<div className='max-h-[220px] overflow-y-auto mt-2 '>
						<div className='flex flex-col gap-2'>
							{files.map((file) => (
								<FileItem
									key={file.id}
									file={file}
									onDelete={handleDeleteFile}
									onUpdate={handleUpdateFile}
								/>
							))}
						</div>
					</div>
				)}
			</section>
		</section>
	);
};

const FileItem = ({
	file,
	onDelete,
	onUpdate,
}: {
	file: FileObj;
	onDelete: (fileId: number) => void;
	onUpdate: (file: FileObj) => void;
}) => {
	useEffect(() => {
		if (!file.uploading) return;

		let timer = setInterval(() => {
			const newFile: FileObj = {
				...file,
				percentage: Math.min(file.percentage + 20, 100),
				uploading: file.percentage + 20 > 100 ? false : true,
			};

			onUpdate(newFile);
		}, 2000);

		return () => {
			clearInterval(timer);
		};
	}, [file]);

	const fileImage = useMemo(() => {
		const format = detectFileFormat(file.data.name);

		switch (format) {
			case "IMG": {
				return "/static/images/icons/png.png";
			}

			case "PDF": {
				return "/static/images/icons/pdf.svg";
			}

			default:
				return "/static/images/icons/pdf.svg";
		}
	}, [file]);

	return (
		<article className='rounded-xl p-4 border-[1px] border-border transition-all'>
			<div>
				<div className='flex items-center gap-2 relative'>
					<img src={fileImage} alt='File Icon' width={35} height={"auto"} />

					<div>
						<h2 className='font-medium text-sm text-foreground'>
							{truncateMiddle(file.data.name, 30)}
						</h2>
						<div className='flex items-center gap-1'>
							<span className='text-[12px] text-muted-foreground'>
								{formatFileSize((file.data.size * file.percentage) / 100)} of{" "}
								{formatFileSize(file.data.size)}
							</span>
							<Dot size={12} className='text-foreground/50' />
							<div className='text-[12px] text-muted-foreground font-medium'>
								{file.uploading ? (
									<div className='flex items-center gap-1'>
										<span className='block border-[1px] border-blue-400 border-dashed rounded-full size-3 animate-spin'></span>
										<span className=''>Uploading...</span>
									</div>
								) : (
									<div className='flex items-center gap-1'>
										<span className='block'>
											<CheckCircle size={14} className='text-green-400' />
										</span>
										<span className=''>Completed</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div
						className='absolute right-0 top-0 text-foreground/70'
						onClick={() => onDelete(file.id)}
					>
						{file.uploading ? <X size={14} /> : <Trash2 size={14} />}
					</div>
				</div>
			</div>
			<div
				className={cn(
					"w-full mt-0 transition-all flex flex-col items-end",
					!file.uploading && "hidden"
				)}
			>
				<p className='block text-[12px] text-foreground ml-auto'>
					{file.percentage}%
				</p>
				<div className='w-full h-[6px] overflow-hidden rounded-full bg-muted'>
					<span
						className='block h-full bg-blue-500 rounded-full transition-all'
						style={{
							width: `${file.percentage}%`,
						}}
					></span>
				</div>
			</div>
		</article>
	);
};
