// server/api/tasks.get.ts
import { getTasks } from '../utils/tasks-store';

export default defineEventHandler(async () => {
	return getTasks();
});