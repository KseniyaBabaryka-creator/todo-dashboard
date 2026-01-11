import { ref, computed, watch } from 'vue';
import type { Task } from '~~/server/utils/tasks-store';

export function useTask() {
	const { data, pending, error } = useAsyncData<Task[]>('tasks', () =>
		$fetch('/api/tasks')
	);

	const tasks = ref<Task[]>(data || []);

	watch(data, (val) => {
		if (val?.value) tasks.value = val.value;
	}, { immediate: true });

	const selectedStatus = ref<'all' | Task['status']>('all');

	const filteredTasks = computed(() => {
		if (!tasks.value) return [];
		if (selectedStatus.value === 'all') return tasks.value;
		return tasks.value.filter(t => t.status === selectedStatus.value);
	});

	return { tasks, filteredTasks, pending, error, selectedStatus };
}
