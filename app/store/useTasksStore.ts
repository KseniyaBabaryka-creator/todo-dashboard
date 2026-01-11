import { defineStore } from 'pinia';
import type { Task } from '~/server/utils/tasks-store';

export const useTasksStore = defineStore('taskStore', {
	state: () => ({
		tasks: [] as Task[],
	}),

	actions: {
		setTasks(tasks: Task[]) {
			this.tasks = tasks;
		}
	},
});
