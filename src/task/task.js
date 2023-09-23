export class Task {
    constructor(
        projectId, 
        title,
        dueDate, 
        priority, 
        description, 
        notes, 
        projectName, 
        newTaskStatus
        ) {
        this.projectId = projectId;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
        this.projectName = projectName;
        this.status = newTaskStatus;
        this.id = String(Task.getNewTaskId());
        Task.incrementNewTaskId();
    }

    static taskId = 1;
    static getNewTaskId() {
        return Task.taskId;
    };
    static incrementNewTaskId() {
        Task.taskId++;
    };
    static resetId() {
        Task.taskId = 1;
    };
}