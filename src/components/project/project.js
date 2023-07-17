export class Project {
    constructor(id, name, iconURL) {
        this.id = id;
        this.name = name;
        this.iconURL = iconURL;
        this.tasksNumber = 0;        
    }

    static projectId = 0;

    static getNewId = () => {
        return String(this.projectId);
    }

    static incrementNewProjectId = () => {
        this.projectId++;
    };
}
