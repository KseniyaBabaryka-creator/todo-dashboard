<template>
	<div class="bg-[#2B1887] h-screen justify-center p-6 md:p-20">
		<div class="bg-[#D5CCFF] w-full max-w-4xl p-6 md:p-10 mx-auto rounded-lg shadow-lg">

			<!-- Loading state -->
			<div v-if="pending" class="flex flex-col items-center gap-4 text-[#2B1887]">
				<!-- Spinner -->
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

				<p class="text-2xl font-bold">Loading...</p>
			</div>

			<!-- Content -->
			<div v-else class="grid grid-cols-1 md:grid-cols-12 gap-8">
				<!-- Tasks List -->
				<div class="md:col-span-7 flex flex-col items-start gap-6">
					<div class="flex items-center text-[#2B1887] gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
						</svg>
						<h1 class="text-2xl font-semibold">My Tasks</h1>
					</div>

					<!-- No results after filtering -->
					<div v-if="filteredTasks.length === 0" class="w-full flex flex-col items-center gap-4 text-[#2B1887] py-4 text-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
						</svg>
						<p class="text-2xl font-bold">Unfortunately, there are no tasks that match the filter...</p>
					</div>

					<ul v-else class="flex flex-col gap-4 w-full">
						<li v-for="task in filteredTasks" :key="task.id" class="w-full p-6 bg-[#F4F2FF] rounded-md flex flex-col items-start gap-1">
							<NuxtLink :to="'/task/' + task.id" class="w-full h-full">
								<p class="text-xl font-medium">{{ task.title }}</p>
								<div class="flex items-center gap-2" :class="{'text-[#E42C5F]' : task.status === 'todo', 'text-[#ECB800]' : task.status === 'in-progress', 'text-[#2CE4A1]' : task.status === 'done'}">
									<svg
											v-if="task.status === 'todo'"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
									</svg>

									<svg
											v-else-if="task.status === 'done'"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>

									<svg
											v-else
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>


									<p>{{task.status}}</p>
								</div>
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Filters -->
				<div class="md:col-span-5 flex md:flex-col items-start gap-4 pl-8 border-l-[#7d6ad8] border-l">
					<h2 class="text-xl font-semibold text-[#2B1887]">Filter by status</h2>
					<ul class="flex md:flex-col gap-2">
						<li>
							<label class="flex items-center gap-2 text-lg font-light">
								<input
										type="radio"
										name="status"
										value="todo"
										v-model="selectedStatus"
										class="appearance-none bg-white m-0 font-inherit text-[#E42C5F] w-[1.15em] h-[1.15em] border-[0.15em] border-current rounded-full -translate-y-[0.075em] grid place-content-center translate-y-[0.05em]"/>
								To Do
							</label>
						</li>
						<li>
							<label class="flex items-center gap-2 text-lg font-light">
								<input
										type="radio"
										name="status"
										value="in-progress"
										v-model="selectedStatus"
										class="appearance-none bg-white m-0 font-inherit text-[#ECB800] w-[1.15em] h-[1.15em] border-[0.15em] border-current rounded-full -translate-y-[0.075em] grid place-content-center translate-y-[0.05em]"/>
								In progress
							</label>
						</li>
						<li>
							<label class="flex items-center gap-2 text-lg font-light">
								<input
										type="radio"
										name="status"
										value="done"
										v-model="selectedStatus"
										class="appearance-none bg-white m-0 font-inherit text-[#2CE4A1] w-[1.15em] h-[1.15em] border-[0.15em] border-current rounded-full -translate-y-[0.075em] grid place-content-center translate-y-[0.05em]"/>
								Done
							</label>
						</li>
					</ul>
					<button class="bg-[#5D5FEF] hover:bg-[#2b1887] px-6 py-1 text-white text-lg rounded-lg transition transition-2 ease-in-out cursor-pointer" @click="selectedStatus = 'all'">Clear</button>
				</div>
			</div>
			

		</div>
	</div>
</template>

<script setup lang="ts">

import {useTask} from "~/composables/useTask";

const { filteredTasks, pending, selectedStatus } = useTask();
</script>



