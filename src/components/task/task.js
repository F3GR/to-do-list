export class Task {
    constructor(id, title, dueDate, status, priority, description, notes) {
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
        return String(this.taskId);
    }
    static incrementNewTaskId = () => {
        this.taskId++;
    };
}
