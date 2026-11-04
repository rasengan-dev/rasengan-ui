interface Options {
	/** What the URL is, for the messages: "the registry" reads "the registry at <url>". Without it, the URL alone. */
	what?: string;
	/** The message for a 404, when the caller knows what is missing. */
	notFound?: string;
	/** A line added to the messages: where to change the address, say. */
	hint?: string;
}

/**
 * JSON from a URL, with errors a person can act on. A server that sends a web page instead (a site's fallback for
 * unknown paths, a registry not deployed yet) is named as such, rather than failing on `Unexpected token '<'`.
 */
export async function fetchJson<T>(url: string, { what, notFound, hint }: Options = {}): Promise<T> {
	const subject = what ? `${what} at ${url}` : url;
	// A sentence starts with a capital; a bare URL keeps its own.
	const Subject = what ? subject[0].toUpperCase() + subject.slice(1) : url;
	const fail = (message: string) => new Error(hint ? `${message}\n${hint}` : message);
	const response = await fetch(url).catch((error: Error) => {
		throw fail(`Can't reach ${subject}: ${error.message}`);
	});
	if (response.status === 404 && notFound) throw fail(notFound);
	if (!response.ok) throw fail(`${Subject} answered ${response.status}.`);
	const text = await response.text();
	try {
		return JSON.parse(text) as T;
	} catch {
		const page = (response.headers.get("content-type") ?? "").includes("html") || text.trimStart().startsWith("<");
		throw fail(page ? `${Subject} sent a web page, not JSON: nothing is published at that address.` : `${Subject} sent something that isn't JSON.`);
	}
}
