<script setup lang="ts">
</script>

<template>
	<!-- Entry point-->
	<div class="flex flex-col items-center justify-center min-h-screen bg-[#F4F4FF] p-6">
		<h1 class="text-4xl font-bold text-[#2B1887] mb-6">Welcome to your ToDo Dashboard!</h1>
		<NuxtLink
				to="/tasks"
				class="text-white bg-[#5D5FEF] hover:bg-[#2B1887] px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-md"
		>
			To tasks
		</NuxtLink>
	</div>
</template>
