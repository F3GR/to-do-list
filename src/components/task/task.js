export class Task {
    constructor(projectId, projectName, id, title, dueDate, status, priority, description, notes) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
    }
    static taskId = 0;

    static getNewTaskId = () => { 
        return this.taskId;
    }
    static incrementNewTaskId = () => {
        this.taskId++;
    };
}
