import { ReactNode } from "react"

const StepperWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full flex flex-col">{children}</div>
	)
}

const StepperItem = ({ number, title, children }: { number: number, title: string, children: ReactNode }) => {
	return (
		<div className="relative w-full flex flex-col pt-8">
			<div className="absolute top-0 left-0 w-full flex items-center gap-4">
				<span className="rounded-full size-8 border-2 bg-muted border-background text-foreground flex items-center justify-center">
					{number}
				</span>
				<span className="font-semibold text-foreground">{title}</span>
			</div>

			{
				children && (

					<div className="w-full border-l dark:border-l-input p-4 pl-8 ml-4">
						{children}
					</div>
				)
			}
		</div>
	)
}

export default {
	Item: StepperItem,
	Wrapper: StepperWrapper
}