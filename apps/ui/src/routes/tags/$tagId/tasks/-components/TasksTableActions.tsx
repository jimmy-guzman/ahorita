import { useMutation } from "@tanstack/react-query";
import type { CellContext } from "@tanstack/react-table";
import { CheckSquareIcon, SquareIcon, Trash2Icon } from "lucide-react";

import { deleteTaskMutationOptions } from "@/api/deleteTask";
import { editTaskMutationOptions } from "@/api/editTask";

interface TaskTableActionsProps {
	info: CellContext<
		{
			id: string;
			tagId: string;
			name: string;
			status: "BACKLOG" | "CANCELED" | "DONE" | "IN_PROGRESS" | "TODO";
			createdAt: string;
			updatedAt: string;
		},
		unknown
	>;
}

export const TasksTableActions = ({
	info: {
		row: { original: task },
	},
}: TaskTableActionsProps) => {
	const deleteMutation = useMutation(deleteTaskMutationOptions);
	const editMutation = useMutation(editTaskMutationOptions);

	return (
		<div className="flex gap-2">
			{task.status === "DONE" ? (
				<button
					type="button"
					aria-label={`Complete ${task.name}`}
					className="dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-success"
					onClick={() => {
						editMutation.mutate({
							params: { id: task.id },
							body: { status: "TODO" },
						});
					}}
				>
					<CheckSquareIcon className="align-baseline" />
				</button>
			) : (
				<button
					type="button"
					aria-label={`Undo Complete ${task.name}`}
					className="dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-warning"
					onClick={() => {
						editMutation.mutate({
							params: { id: task.id },
							body: { status: "DONE" },
						});
					}}
				>
					<SquareIcon className="align-baseline" />
				</button>
			)}
			<button
				type="button"
				aria-label={`Delete ${task.name}`}
				className="dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-neutral"
				onClick={() => deleteMutation.mutate(task.id)}
			>
				<Trash2Icon className="align-baseline" />
			</button>
		</div>
	);
};
