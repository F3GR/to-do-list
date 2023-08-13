export class Project {
    constructor(inputNewProject) {
        const { 
            name, 
            iconURL, 
            altText 
        } = inputNewProject;

        this.id = String(Project.getNewId());
        this.name = name;
        this.iconURL = iconURL;
        this.altText = altText;

        Project.incrementNewProjectId();
    }

    static projectId = 1;

    static getNewId = () => Project.projectId;
    static incrementNewProjectId = () => Project.projectId++;
    static resetId = () => Project.projectId = 1;
};
