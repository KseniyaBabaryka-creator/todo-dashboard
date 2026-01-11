<template>
<div v-if="task" class="bg-[#2B1887] h-screen justify-center p-6 md:p-20">
	<!-- Form to change task title and status-->
	<form @submit.prevent="handleSubmit" class="flex flex-col items-start gap-4 bg-[#5D5FEF] w-full max-w-4xl p-6 md:p-10 mx-auto rounded-lg shadow-lg">
		<!-- Input field for task title-->
		<label class="flex flex-col gap-2 font-medium text-[#F4F2FF] w-full">
			Title
			<input
					type="text"
					v-model="taskTitle"
					:disabled="saving"
					class="w-full bg-[#F4F2FF] p-2 rounded-md text-lg text-[#000] outline-none border-2 border-transparent focus:border-[#2B1887] focus:ring-2 focus:ring-[#2B1887]/40 transition"
			>
		</label>

		<!--Input field for task status-->
		<label class="flex flex-col gap-2 font-medium text-[#F4F2FF] w-full">
			Status
			<select
					v-model="taskStatus"
					class="w-full bg-[#F4F2FF] p-2 rounded-md text-lg text-[#000] outline-none border-2 border-transparent focus:border-[#2B1887] focus:ring-2 focus:ring-[#2B1887]/40 transition">
				<option value="todo">To Do</option>
				<option value="in-progress">In progress</option>
				<option value="done">Done</option>
			</select>
		</label>
		<div class="flex items-center gap-8">
			<button type="submit"
							:disabled="saving"
							class="
								bg-[#2B1887]
								px-6 py-2 mt-4
								text-white text-lg
								rounded-lg
								transition
								duration-200
								ease-in-out
								cursor-pointer

								hover:bg-[#0c0627]
								active:scale-[0.98]

								disabled:bg-[#2B1887]/50
								disabled:cursor-not-allowed
								disabled:opacity-60
								disabled:active:scale-100
							"
			>
				Save changes
			</button>

			<!-- Pending state-->
			<div v-if="saving" class="flex items-center gap-4">
				<svg
						class="w-12 h-12 text-[#2B1887] animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
				>
					<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
					></circle>
					<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					></path>
				</svg>

				<p class="text-2xl font-bold">Saving data...</p>
			</div>
		</div>

		<!--Error state-->
		<div v-if="submitError" class="flex flex-col items-center justify-center gap-2 text-center w-full text-[#E42C5F]">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
			</svg>
			<p class="text-xl font-bold">{{ submitError }}</p>
		</div>
	</form>
</div>
</template>

<script setup lang="ts">
	const route = useRoute();
	const id = Number(route.params.id);

	// Redirect if id is not a number
	if (Number.isNaN(id)) {
		await navigateTo('/404');
	}

	const {
		task,
		taskTitle,
		taskStatus,
		pending,
		error,
		saving,
		submitError,
		loadTask,
		saveTask
	} = useTaskEditor(id);

	// Load task on mount
	await loadTask();

	// Redirect if fetch failed
	if (error.value || !task.value) {
		await navigateTo('/404');
	}

	const handleSubmit = async () => {
		await saveTask();
	};
</script>