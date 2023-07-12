class Task {
    constructor(projectName, title, dueDate, status, priority, description, notes) {
        let taskProjectName = projectName;
        this.projectName = () => taskProjectName;

        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.description = description;
        this.notes = notes;
    }
}
