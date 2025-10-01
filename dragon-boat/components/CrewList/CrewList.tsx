import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import "./CrewList.scss";
import { Crew } from "../../types";

type CrewTableProps = {
	data: Crew[];
	onView?: (crew: Crew) => void;
	onDelete?: (crew: Crew) => void;
};

export default function CrewList({ data, onView, onDelete }: CrewTableProps) {
	const columns: ColumnDef<Crew>[] = [
		{
			accessorKey: "name",
			header: "Crew name",
		},
		{
			accessorFn: (crew) => crew.roster.length,
			id: "numPaddlers",
			header: "#",
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => (
				<div className="actions">
					<button onClick={() => onView?.(row.original)} className="view">
						View
					</button>
					<button onClick={() => onDelete?.(row.original)} className="delete">
						Delete
					</button>
				</div>
			),
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="crew-list">
			<table className="crew-table">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									className="table-header"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									{{
										asc: " 🔼",
										desc: " 🔽",
									}[header.column.getIsSorted() as string] ?? null}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="table-row">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="table-data">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button className="create-crew">Create a new crew</button>
		</div>
	);
}
