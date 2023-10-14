import { Task } from './task';
import { EditTask } from './task';
import { saveDataToLocalStorage } from './local_storage_utils';

/**
 * @interface ToDoList
 * @description Interface representing a ToDoList with specific methods to manage tasks.
 * @property {Task[]} tasks - Array to store tasks
 * @method addTask - Method to add a task
 * @method deleteTask - Method to delete a task by its ID
 * @method toggleTaskCompletion - Method to toggle task completion by its ID
 * @method filterTasks - Method to filter tasks based on a filter
 * @method clearCompletedTasks - Method to clear completed tasks
 */
export interface ToDoList {
    /**
     * Array to store tasks
     */
    tasks: Task[];
    /**
     * Method to add a task
     * @param task 
     */
    addTask(task: Task): void;
    /**
     * Method to delete a task by its ID
     * @param id 
     */
    deleteTask(id: number): void;
    /**
     * Method to toggle task completion by its ID
     * @param id 
     */
    toggleTaskCompletion(id: number): void;
    /**
     * Method to filter tasks based on a filter
     * @param filter 
     */
    filterTasks(filter: string): Task[];
    /**
     * Method to clear completed tasks
     */
    clearCompletedTasks(): void;
}

/**
 * @class ToDoListImpl
 * @implements {ToDoList}
 * @description Implementation of the ToDoList interface.
 */
export class ToDoListImpl implements ToDoList {
    /**
     * @description Array to store tasks
     */
    tasks: Task[] = [];
    /**
     * @description Adds a new task to the list of tasks.
     * @param {Task} task - The task to be added.
     */
    addTask(task: Task): void {
        /**
         * Add the task at the beginning of the array
         */
        this.tasks.unshift(task);
        /**
         * Save tasks to local storage
         */
        saveDataToLocalStorage('tasks', this.tasks);

    }
    /**
     * Deletes a task by its ID.
     * @param id - The ID of the task to be deleted.
     */
    deleteTask(id: number): void {
        /**
         * Remove task with matching ID
         */
        this.tasks = this.tasks.filter(task => task.id !== id);
        /**
         * Save updated tasks to local storage
         */
        saveDataToLocalStorage('tasks', this.tasks);
    }
    /**
     * @description Edits a task's name based on its ID.
     * @param {EditTask} editTask - An object containing the task ID and the new name.
     */
    editTask({ id, newName }: EditTask): void {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                /**
                 * Update task name for the specified ID
                 */
                return { ...task, name: newName };
            }
            return task;
        });
        /**
         * Save updated tasks to local storage
         */
        saveDataToLocalStorage('tasks', this.tasks);
    }
    /**
     * @description Toggles a task's completion status based on its ID.
     * @param {number} id - The ID of the task to toggle.
     */
    toggleTaskCompletion(id: number): void {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                /**
                 * Toggle completion status for the specified ID
                 */
                task.completed = !task.completed;
            }
            return task;
        });
    }
    /**
      * @description Filters tasks based on the specified filter.
      * @param {string} filter - The filter to apply ('active', 'completed', or 'all').
      * @returns {Task[]} An array of tasks that match the filter.
      */
    filterTasks(filter: string): Task[] {
        switch (filter) {
            case 'active':
                /**
                 * Filter active tasks
                 */
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                /**
                 * Filter completed tasks
                 */
                return this.tasks.filter(task => task.completed);
            default:
                /**
                 * Return all tasks by default
                 */
                return this.tasks;
        }
    }
    /**
     * @description Clears completed tasks from the task list.
     */
    clearCompletedTasks(): void {
        /**
         * Remove completed tasks
         */
        this.tasks = this.tasks.filter(task => !task.completed);
        /**
         * Save updated tasks to local storage
         */
        saveDataToLocalStorage('tasks', this.tasks);

    }
}