import { ref, computed, watch } from 'vue';
import type { Task } from '~~/server/utils/tasks-store';
import { useTasksStore } from "~/store/useTasksStore";

export function useTask() {
	const store = useTasksStore();
	const selectedStatus = ref<'all' | Task['status']>('all');

	const { data, pending, error } = useAsyncData('tasks', async () => {
		const tasks = await $fetch<Task[]>('/api/tasks');
		store.setTasks(tasks);
		return tasks;
	});

	// FShow tasks based on filters
	const filteredTasks = computed(() => {
		if (selectedStatus.value === 'all') return store.tasks;
		return store.tasks.filter(t => t.status === selectedStatus.value);
	});

	return { filteredTasks, selectedStatus, pending, error };
}
