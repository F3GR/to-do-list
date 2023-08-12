export class Task {
    constructor(inputNewTask, projectName, newTaskStatus) {
        const { projectId, title, dueDate, priority, description, notes } = inputNewTask;   

        this.projectId = projectId;
        this.projectName = projectName;
        this.id = Task.getNewTaskId();
        this.title = title;
        this.dueDate = dueDate;
        this.status = newTaskStatus;
        this.priority = priority;
        this.description = description;
        this.notes = notes;

        Task.incrementNewTaskId();
    }
    static taskId = 0;

    static getNewTaskId = () =>  this.taskId;
    static incrementNewTaskId = () => this.taskId++;
    static resetId = () => this.taskId = 0;
}