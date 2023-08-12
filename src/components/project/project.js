export class Project {
    constructor(inputNewProject) {
        const { 
            name, 
            iconURL, 
            altText 
        } = inputNewProject;

        this.id = Project.getNewId();
        this.name = name;
        this.iconURL = iconURL;
        this.altText = altText;

        Project.incrementNewProjectId();
    }

    static projectId = 0;

    static getNewId = () => this.projectId;
    static incrementNewProjectId = () => this.projectId++;
    static resetId = () => this.projectId = 0;
};
