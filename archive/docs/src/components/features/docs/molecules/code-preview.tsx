import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const CodePreview: React.FC<{ content: string, dark?: boolean, fullScreen?: boolean }> = ({ content, dark = false, fullScreen = false }) => {
	return (
		<div className="flex-1 overflow-y-auto bg-muted/30">
			<div className="p-2 w-full">
				{content ? (
					<Markdown
						remarkPlugins={[remarkGfm]}
						components={{
							p: ({ children, ...props }) => <p {...props} className="text-sm font-medium leading-relaxed [&:not(:first-child)]:mt-6 text-foreground/80">{children}</p>,
							a: ({ children, ...props }) => <a {...props} className="text-primary font-semibold underline underline-offset-4 cursor-pointer">{children}</a>,
							h1: ({ children, ...props }) => <h1 {...props} className="sm:text-3xl text-4xl font-semibold mt-4 mb-5 text-foreground">{children}</h1>,
							h2: ({ children, ...props }) => <h2 {...props} className="text-xl font-medium mt-8 mb-3 text-foreground">{children}</h2>,
							h3: ({ children, ...props }) => <h3 {...props} className="text-lg font-medium mt-8 mb-3 text-foreground">{children}</h3>,
							h4: ({ children, ...props }) => <h4 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">{children}</h4>,
							h5: ({ children, ...props }) => <h5 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">{children}</h5>,
							h6: ({ children, ...props }) => <h6 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">{children}</h6>,
							ol: ({ children, ...props }) => <ol {...props} className="my-6 ml-6 list-decimal">{children}</ol>,
							ul: ({ children, ...props }) => <ul {...props} className="my-6 ml-6 list-decimal list-inside">{children}</ul>,
							li: ({ children, ...props }) => <li {...props} className="mt-2 text-sm font-medium text-foreground/80">{children}</li>,
							blockquote: (props) => <blockquote {...props} className="inline-block pl-2 border-l-4 border-l-border"></blockquote>,
							code(props) {
								const { children, className, node, ...rest } = props
								const match = /language-(\w+)/.exec(className || '')

								const [isCopied, setIsCopied] = useState(false);

								const handleCopy = () => {
									navigator.clipboard.writeText(String(children));
									setIsCopied(true);
									setTimeout(() => setIsCopied(false), 2000);
								}

								return match ? (
									<div className='border border-border rounded-md overflow-hidden'>
										<div className="flex items-center justify-between px-2 py-2 h-[40px] text-xs font-medium text-foreground/50 border-b border-b-border bg-muted/40">
											<span>{match[1]}</span>

											<span>
												<Button
													size="icon"
													className='size-6'
													variant="ghost"
													onClick={handleCopy}
												>
													{isCopied ? <CheckCircle2 className="size-3" /> : <Copy className="size-3" />}
												</Button>
											</span>
										</div>
										<SyntaxHighlighter
											{...rest as any}
											PreTag="div"
											children={String(children).replace(/\n$/, '')}
											showLineNumbers
											language={match[1]}
											style={{ margin: 0, ...(dark ? oneDark : oneLight) }}
											customStyle={{ margin: 0, borderRadius: 0, maxHeight: fullScreen ? "calc(100vh - 110px)" : "500px" }}
											className="text-sm"
										></SyntaxHighlighter>
									</div>
								) : (
									<code {...rest} className={cn("bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.9rem] break-words outline-none", className)}>
										{children}
									</code>
								)
							}
						}}
					>
						{content}
					</Markdown>
				) : (
					<p className="text-muted-foreground text-center mt-0 italic">Preview will appear here...</p>
				)}
			</div>
		</div>
	);
};