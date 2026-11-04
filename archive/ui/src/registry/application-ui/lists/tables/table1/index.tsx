import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

const data: Payment[] = [
	{
		id: "728ed52f",
		avatar: "/static/images/avatars/1.jpeg",
		name: "Rodrigue Wallash",
		paymentDate: new Date(),
		amount: 3100,
		status: "pending",
		email: "rodrigue.wallash@gmail.com",
	},
	{
		id: "628ed52f",
		avatar: "/static/images/avatars/2.jpeg",
		name: "James Bond",
		paymentDate: new Date(),
		amount: 1200,
		status: "success",
		email: "james.bond@gmail.com",
	},
	{
		id: "528ed52f",
		avatar: "/static/images/avatars/3.jpeg",
		name: "Dilane Kombou",
		paymentDate: new Date(),
		amount: 600,
		status: "success",
		email: "dilane.kombou@gmail.com",
	},
	{
		id: "428ed52f",
		avatar: "/static/images/avatars/4.jpeg",
		name: "Regina Blend",
		paymentDate: new Date(),
		amount: 1500,
		status: "success",
		email: "regina.blend@gmail.com",
	},
	{
		id: "328ed52f",
		avatar: "/static/images/avatars/5.jpeg",
		name: "Roleau Minbeck",
		paymentDate: new Date(),
		amount: 1800,
		status: "success",
		email: "roleau.minbeck@gmail.com",
	},
	{
		id: "228ed52f",
		avatar: "/static/images/avatars/6.jpeg",
		name: "Junior Mbanga",
		paymentDate: new Date(),
		amount: 1250,
		status: "failed",
		email: "junior.mbanga@gmail.com",
	},
];

export default function Table1() {
	return (
		<div className='container mx-auto max-w-[1000px] py-10 px-4'>
			<div>
				<h1 className='text-4xl font-bold text-foreground'>Costumers</h1>
				<span className='text-foreground/70'>
					We have summarised your financial activity information
				</span>
			</div>

			<div className='mt-10'>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
