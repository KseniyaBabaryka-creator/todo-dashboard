import { ref } from 'vue';
import { useTasksStore } from '~/store/useTasksStore';
import type { Task } from '~~/server/utils/tasks-store';

export function useTaskEditor(taskId: number) {
	const store = useTasksStore();

	const task = ref<Task | null>(null);
	const pending = ref(true);
	const error = ref('');
	const taskTitle = ref('');
	const taskStatus = ref('');
	const saving = ref(false);
	const submitError = ref('');

	// Load task by id
	const loadTask = async () => {
		pending.value = true;
		error.value = '';
		try {
			const data = await $fetch<Task>(`/api/tasks/${taskId}`);
			task.value = data;
			taskTitle.value = data.title;
			taskStatus.value = data.status;
		} catch (err: any) {
			error.value = err?.statusMessage || 'Failed to fetch task';
		} finally {
			pending.value = false;
		}
	};

	const saveTask = async () => {
		if (!task.value) return;
		saving.value = true;
		submitError.value = '';

		try {
			const updated = await $fetch<Task>(`/api/tasks/${taskId}`, {
				method: 'PUT',
				body: { title: taskTitle.value, status: taskStatus.value }
			});

			task.value = updated;
			store.updateTask(updated);
		} catch (err: any) {
			submitError.value = err?.statusMessage || 'Failed to save changes';
		} finally {
			saving.value = false;
		}
	};

	return {
		task,
		taskTitle,
		taskStatus,
		pending,
		error,
		saving,
		submitError,
		loadTask,
		saveTask,
	};
}
