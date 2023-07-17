export class Project {
    constructor(projectName, iconURL) {
        this.projectName = projectName;
        this.iconURL = iconURL;
        this.taskList = [];

        let id = 1;
        this.getProjectId = () => id.toString();
        this.incrementNewProjectId = () => {
            id++;
        };
    }
}
