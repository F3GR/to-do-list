export class Task {
    constructor(inputNewTask, projectName, newTaskStatus) {
        const { projectId, title, dueDate, priority, description, notes } = inputNewTask;   

        this.projectId = projectId;
        this.projectName = projectName;
        this.id = String(Task.getNewTaskId());
        this.title = title;
        this.dueDate = dueDate;
        this.status = newTaskStatus;
        this.priority = priority;
        this.description = description;
        this.notes = notes;

        Task.incrementNewTaskId();
    }
    static taskId = 1;

    static getNewTaskId = () =>  Task.taskId;
    static incrementNewTaskId = () => Task.taskId++;
    static resetId = () => Task.taskId = 1;
}