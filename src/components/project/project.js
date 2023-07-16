export class Project {
    constructor(projectName, iconURL) {
        this.projectName = projectName;
        this.iconURL = iconURL;
        this.taskList = new Map();

        let id = 1;
        this.getNewProjectId = () => id;
        this.incrementNewProjectId = () => {
            id++;
        };
    }
}
