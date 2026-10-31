import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const invoices = [
	{ id: "INV-001", status: "Paid", tone: "success", method: "Card", amount: 250 },
	{ id: "INV-002", status: "Pending", tone: "warning", method: "Transfer", amount: 150 },
	{ id: "INV-003", status: "Unpaid", tone: "destructive", method: "Transfer", amount: 350 },
	{ id: "INV-004", status: "Paid", tone: "success", method: "Card", amount: 450 },
	{ id: "INV-005", status: "Paid", tone: "success", method: "PayPal", amount: 550 },
] as const;

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function TableDemo() {
	return (
		<Table className="max-w-2xl">
			<TableCaption>Your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-end">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.id}>
						<TableCell className="font-medium">{invoice.id}</TableCell>
						<TableCell>
							<Badge variant="soft" tone={invoice.tone}>
								{invoice.status}
							</Badge>
						</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-end tabular-nums">{usd.format(invoice.amount)}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-end tabular-nums">{usd.format(invoices.reduce((sum, invoice) => sum + invoice.amount, 0))}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
