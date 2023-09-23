export class Project {
    constructor(name, iconURL, altText) {
        this.id = String(Project.getNewId());
        this.name = name;
        this.iconURL = iconURL;
        this.altText = altText;
        Project.incrementNewProjectId();
    }

    static projectId = 1;
    static getNewId() {
        return Project.projectId;
    }
    static incrementNewProjectId() {
        Project.projectId++;
    }
    static resetId() {
        Project.projectId = 1;
    }
}



