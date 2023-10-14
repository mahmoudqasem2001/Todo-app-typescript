import { ToDoListImpl } from './to_do_list';
import { Task } from './task';
import { saveDataToLocalStorage } from './local_storage_utils';
import { getDataFromLocalStorage } from './local_storage_utils';
/**
 * Initialize ToDoList instance.
 * @type {ToDoListImpl}
 */
const todoList: ToDoListImpl = new ToDoListImpl();
/**
 * DOM elements for task filtering.
 * @type {HTMLButtonElement}
 */
const allButton: HTMLButtonElement = document.getElementById('allButton') as HTMLButtonElement;
/**
 * DOM elements for task filtering.
 * @type {HTMLButtonElement}
 */
const activeButton: HTMLButtonElement = document.getElementById('activeButton') as HTMLButtonElement;
/**
 * DOM elements for task filtering.
 * @type {HTMLButtonElement}
 */
const completedButton: HTMLButtonElement = document.getElementById('completedButton') as HTMLButtonElement;
/**
 * DOM elements for task filtering.
 * @type {HTMLButtonElement}
 */
const clearCompletedButton: HTMLButtonElement = document.getElementById('clearCompletedButton') as HTMLButtonElement;
/**
 * Add Task Modal elements.
 * @type {HTMLElement}
 */
const addTaskModal: HTMLElement = document.getElementById('addTaskModal') as HTMLElement;
/**
 * DOM element for the add task button.
 * @type {HTMLButtonElement}
 */
const addTaskButton: HTMLButtonElement = document.getElementById('addTaskButton') as HTMLButtonElement;
/**
 * DOM element for the close add task modal button.
 * @type {HTMLElement}
 */
const closeAddTaskModalButton: HTMLElement= document.getElementById('closeAddTaskModal') as HTMLElement;
/**
 * DOM element for the add new task button.
 * @type {HTMLButtonElement}
 */
const addNewTaskButton: HTMLButtonElement = document.getElementById('addNewTask') as HTMLButtonElement;
/**
 * Function to open the add task modal.
 * @returns {void}
 */
function openAddTaskModal(): void {
    addTaskModal.classList.remove('hidden');
}
/**
 * Function to close the add task modal.
 * @returns {void}
 */
function closeAddTaskModal(): void {
    addTaskModal.classList.add('hidden');
}
/**
 * Function to add a new task.
 * @returns {void}
 */
function addNewTask(): void {
    const taskInput = document.getElementById('newTask') as HTMLInputElement;
    const taskName = taskInput.value;

    if (taskName.trim() !== '') {
        /**
         * Create a new task.
         * @type {Task}
         */
        const newTask: Task = {
            id: todoList.tasks.length + 1,
            name: taskName,
            completed: false,
        };
        /**
         * Add the new task to the list.
         * @returns {void}
         */
        todoList.addTask(newTask);
        renderTasks(todoList.filterTasks('all'));
        /**
         * Reset input and close modal
         */
        taskInput.value = '';
        closeAddTaskModal();
        saveDataToLocalStorage('tasks', todoList.tasks);
    }
}
/**
 * Toggle button style based on the selected filter.
 * @param {HTMLButtonElement} clickedButton - The button that was clicked.
 * @returns {void}
 */
function toggleButton(clickedButton: HTMLButtonElement): void {
    const buttons = document.querySelectorAll('button[data-filter]');
    buttons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));

    clickedButton.classList.add('bg-blue-500', 'rounded-md', 'text-white');

    const filter = clickedButton.dataset.filter || 'all';
    todoList.filterTasks(filter);
    renderTasks(todoList.filterTasks(filter));
}
/**
 * Handle completion status change event.
 * @param {Event} event - The event triggered by completion status change.
 * @returns {void}
 */
function handleCompletionStatus(event: Event): void {
    const button = event.target as HTMLButtonElement;
    toggleButton(button);
}

/**
 * Clear completed tasks.
 * @returns {void}
 */
function clearCompletedTasks(): void {
    todoList.clearCompletedTasks();
    saveDataToLocalStorage('tasks', todoList.tasks);
    renderTasks(todoList.filterTasks('all'));
    const buttons = document.querySelectorAll('button[data-filter]');
    buttons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));

}
/**
 * Event listeners for UI interactions.
 */
addTaskButton.addEventListener('click', openAddTaskModal);
closeAddTaskModalButton.addEventListener('click', closeAddTaskModal);
addNewTaskButton.addEventListener('click', addNewTask);
allButton.addEventListener('click', handleCompletionStatus);
activeButton.addEventListener('click', handleCompletionStatus);
completedButton.addEventListener('click', handleCompletionStatus);
clearCompletedButton.addEventListener('click', clearCompletedTasks);


/**
 * Renders the tasks in the UI by creating HTML elements for each task.
 *
 * @param {Task[]} tasks - An array of Task objects to be rendered.
 * @returns {void}
 */
function renderTasks(tasks: Task[]): void {
    /**
     * Get the task list element from the DOM
     * @type {HTMLElement | null}
     */
    const taskList: HTMLElement | null = document.getElementById('taskList');

    //Check if the task list element exists
    if (taskList) {
        // Clear the existing content in the task list
        taskList.innerHTML = '';

        // Iterate through each task and create the corresponding HTML elements
        tasks.forEach(task => {
            /**
             * Create a task item element
             * @type {HTMLLIElement}
             */
            const taskItem: HTMLLIElement = document.createElement('li') as HTMLLIElement;
            taskItem.draggable = true;
            taskItem.dataset.taskId = task.id.toString();
            taskItem.classList.add('flex', 'justify-between', 'border', 'p-2', 'mb-4');

            /**
             * Create a checkbox for task completion
             * @type {HTMLInputElement}
             */
            const checkbox: HTMLInputElement = document.createElement('input') as HTMLInputElement;
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            // Add an event listener to handle task completion changes
            checkbox.addEventListener('change', () => {
                todoList.toggleTaskCompletion(task.id);
                saveDataToLocalStorage('tasks', todoList.tasks);
                renderTasks(todoList.filterTasks('all'));
            });

            /**
             * Create a span for displaying the task name
             * @type {HTMLSpanElement}
             */
            const taskName: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
            taskName.textContent = task.name;
            taskName.classList.add('ml-4', 'basis-3/4');

            /**
             * Create an edit button with an event listener
             * @type {HTMLButtonElement}
             */
            const editButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.classList.add('ml-2', 'p-2', 'text-blue-500');
            editButton.addEventListener('click', () => {
                // Handle editing the task when the edit button is clicked
                // involves displaying a modal, allowing the user to update the task name
                const modal = document.getElementById('modal') as HTMLElement;
                modal.classList.remove('hidden');
                const newNameElement = document.getElementById('newTaskName') as HTMLInputElement;
                newNameElement.value = task.name;


                const closeModalBtn = document.getElementById('closeModal') as HTMLElement;
                closeModalBtn.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });

                // Updating the task in the todoList
                const updateTaskBtn = document.getElementById('updateTaskName') as HTMLButtonElement;
                updateTaskBtn.addEventListener('click', function handleUpdateTaskClick() {
                    const newName = newNameElement.value;
                    if (newName) {
                        todoList.editTask({ id: task.id, newName });
                        saveDataToLocalStorage('tasks', todoList.tasks);
                        renderTasks(todoList.filterTasks('all'));
                        newNameElement.value = '';
                        modal.classList.add('hidden');
                        updateTaskBtn.removeEventListener('click', handleUpdateTaskClick);
                    }
                });
            });

            /**
             * Create a delete button with an event listener
             * @type {HTMLButtonElement}
             */
            const deleteButton: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can text-red-600"></i>';
            deleteButton.classList.add('ml-2', 'p-2');
            deleteButton.addEventListener('click', () => {
                // Handle deleting the task when the delete button is clicked
                // May involve confirming the deletion and removing the task from the todoList
                const deleteConfirmationModal = document.getElementById('deleteConfirmationModal') as HTMLElement;
                deleteConfirmationModal.classList.remove('hidden');

                const confirmDeleteButton = document.getElementById('confirmDelete') as HTMLButtonElement;
                const cancelDeleteButton = document.getElementById('cancelDelete') as HTMLButtonElement;

                const handleConfirmDelete = () => {
                    todoList.deleteTask(task.id);
                    saveDataToLocalStorage('tasks', todoList.tasks);
                    renderTasks(todoList.filterTasks('all'));
                    deleteConfirmationModal.classList.add('hidden');

                    confirmDeleteButton.removeEventListener('click', handleConfirmDelete);
                    cancelDeleteButton.removeEventListener('click', handleCancelDelete);
                };

                const handleCancelDelete = () => {
                    deleteConfirmationModal.classList.add('hidden');

                    confirmDeleteButton.removeEventListener('click', handleConfirmDelete);
                    cancelDeleteButton.removeEventListener('click', handleCancelDelete);
                };

                confirmDeleteButton.addEventListener('click', handleConfirmDelete);
                cancelDeleteButton.addEventListener('click', handleCancelDelete);
            });

            // Add event listeners for drag and drop functionality to allow task reordering
            taskItem.addEventListener('dragstart', (event) => {
                event.dataTransfer?.setData('text/plain', task.id.toString());
            });

            taskItem.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            taskItem.addEventListener('drop', (event) => {
                // Handle dropping a dragged task to reorder the tasks
                // This involves updating the task order in the todoList and saving to localStorage
                event.preventDefault();
                const draggedTaskId = parseInt(event.dataTransfer?.getData('text/plain') || '');
                if (!isNaN(draggedTaskId)) {
                    const targetTaskId = parseInt(taskItem.dataset.taskId || '');
                    const draggedTask = todoList.tasks.find(task => task.id === draggedTaskId);
                    const targetTask = todoList.tasks.find(task => task.id === targetTaskId);

                    if (draggedTask && targetTask) {
                        const draggedIndex = todoList.tasks.indexOf(draggedTask);
                        const targetIndex = todoList.tasks.indexOf(targetTask);

                        // Reorder tasks
                        todoList.tasks.splice(draggedIndex, 1);
                        todoList.tasks.splice(targetIndex, 0, draggedTask);


                        saveDataToLocalStorage('tasks', todoList.tasks);

                        renderTasks(todoList.filterTasks('all'));
                    }
                }
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskName);
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);

        });
    }
}
/**
 * Retrieve saved tasks from local storage.
 *
 * @type {Task[] | null}
 */
const savedTasks: Task[] | null = getDataFromLocalStorage('tasks');
/**
 * If there are saved tasks, assign them to the todoList
 */
if (savedTasks) {
    todoList.tasks = savedTasks;
}
/**
 * Render the tasks initially.
 *
 * This function call triggers the initial rendering of tasks.
 *
 * @param {Task[]} tasks - An array of Task objects to be rendered.
 * @returns {void}
 */
renderTasks(todoList.filterTasks('all'));
