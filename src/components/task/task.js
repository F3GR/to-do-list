export class Task {
    constructor(projectName, title, dueDate, status, priority, description, notes) {
        this.projectName = projectName;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.description = description;
        this.notes = notes;

        let id = 1;
        this.getNewTaskId = () => id;
        this.incrementNewTaskId = () => {
            id++;
        };
    }
}
