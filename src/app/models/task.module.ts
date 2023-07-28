export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'completed';
  historyLog: HistoryLogEntry[];
}
export interface HistoryLogEntry {
  timestamp: Date;
  action: string; // This can be a string describing the action (e.g., "Created", "Status Changed", "Edited")
}
export interface TasksState {
  tasks: Task[];
}