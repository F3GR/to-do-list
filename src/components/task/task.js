export class Task {
    constructor(inputNewTask, projectName, newTaskStatus) {
        const { projectId, title, dueDate, priority, description, notes } = inputNewTask;   

        this.projectId = projectId;
        this.projectName = projectName;
        this.id = getNewTaskId();
        this.title = title;
        this.dueDate = dueDate;
        this.status = newTaskStatus;
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

    static resetId = () => {
        this.taskId = 0;
    }
}