export default function ComponentGroupItem({
	title,
	components,
}: {
	title: string;
	components: number;
}) {
	return (
		<article className='w-full relative hover:bg-muted/30 p-4 transition-all'>
			<div className='w-full h-[200px] bg-muted rounded-lg'></div>
			<div className='mt-4'>
				<h2 className='text-md font-medium text-foreground'>{title}</h2>
				<p className='text-sm text-foreground/70 mt-1'>{components} examples</p>
			</div>
		</article>
	);
}
