<template>
<div v-if="task" class="bg-[#2B1887] h-screen justify-center p-6 md:p-20">
	<div class="flex flex-col items-start gap-6">
		<p class="text-xl text-white font-light">Task: <span class="text-2xl font-medium">{{ task.title }}</span></p>
		<p class="text-xl text-white font-light">Status: <span class="text-2xl font-medium" :class="{'text-[#E42C5F]' : task.status === 'todo', 'text-[#ECB800]' : task.status === 'in-progress', 'text-[#2CE4A1]' : task.status === 'done'}">{{ task.status.toUpperCase() }}</span></p>
	</div>
</div>
</template>

<script setup lang="ts">
	const route = useRoute();
	const id = Number(route.params.id);

	if (Number.isNaN(id)) {
		await navigateTo('/404');
	}

	const { data: task, pending, error } = await useAsyncData<Task>(
			`task-${id}`,
			() => $fetch(`/api/tasks/${id}`)
	);

	if (error.value || !task.value) {
		await navigateTo('/404');
	}


</script>