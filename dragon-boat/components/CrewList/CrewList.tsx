import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import "./CrewList.scss";
import { Crew } from "../../types";
import { sampleCrew } from "../../utils/sample-crew";

type CrewTableProps = {
	data: Crew[];
	onView?: (crew: Crew) => void;
	onCopy?: (crew: Crew) => void;
	onDelete?: (crewId: string) => void;
	onCreate?: (crew?: Crew) => void;
};

export default function CrewList({
	data,
	onView,
	onCopy,
	onDelete,
	onCreate,
}: CrewTableProps) {
	const columns: ColumnDef<Crew>[] = [
		{
			accessorKey: "name",
			header: "Crew name",
		},
		{
			accessorFn: (crew) =>
				crew.roster.length +
				crew.leftSide.filter((p) => p !== null).length +
				crew.rightSide.filter((p) => p !== null).length +
				(crew.drum ? 1 : 0) +
				(crew.steer ? 1 : 0),
			id: "numPaddlers",
			header: "#",
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => (
				<div className="actions">
					<button
						onClick={() => onView?.(row.original)}
						title="View"
						className="view"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
					</button>
					<button
						onClick={() => onCopy?.(row.original)}
						title="Copy"
						className="copy"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					</button>
					<button
						onClick={() => onDelete?.(row.original.id)}
						title="Delete"
						className="delete"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
							<line x1="10" y1="11" x2="10" y2="17"></line>
							<line x1="14" y1="11" x2="14" y2="17"></line>
						</svg>
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
			<section className="button-group">
				<button onClick={() => onCreate?.()}>Create a new crew</button>
				<button onClick={() => onCreate?.(sampleCrew)}>
					Create sample crew
				</button>
			</section>
		</div>
	);
}
