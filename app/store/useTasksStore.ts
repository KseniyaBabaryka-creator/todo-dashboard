import { defineStore } from 'pinia';
import type { Task } from '~/server/utils/tasks-store';

export const useTasksStore = defineStore('taskStore', {
	state: () => ({
		tasks: [] as Task[],
	}),

	actions: {
		setTasks(tasks: Task[]) {
			this.tasks = tasks;
		},
		updateTask(updated: Task) {
			const index = this.tasks.findIndex(t => t.id === updated.id);
			if (index !== -1) this.tasks[index] = updated;
		}
	},
});
