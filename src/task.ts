/**
 * @interface Task
 * @description Interface representing a task in the to-do list.
 * @property {number} id - Unique identifier for the task.
 * @property {string} name - The name or description of the task.
 * @property {boolean} completed - Indicates whether the task is completed or not.
 */
export interface Task {
    /**
     * Unique identifier for the task.
     */
    id: number;
    /**
     * The name or description of the task.
     */
    name: string;
    /**
     * Indicates whether the task is completed or not.
     * 
     */
    completed: boolean;
}
/**
 * @interface EditTask
 * @description Interface representing the information needed to edit a task.
 * @property {number} id - The ID of the task to be edited.
 * @property {string} newName - The new name or description for the task.
 */
export interface EditTask {
    /**
     * The ID of the task to be edited.
     */
    id: number;
    /**
     * The new name or description for the task.
     */
    newName: string;
}
