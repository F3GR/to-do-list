export class Project {
    constructor(inputNewProject) {
        const { 
            name, 
            iconURL, 
            altText 
        } = inputNewProject;

        this.id = getNewId();
        this.name = name;
        this.iconURL = iconURL;
        this.altText = altText;
    }

    static projectId = 0;

    static getNewId = () => {
        return this.projectId;
    }

    static incrementNewProjectId = () => {
        this.projectId++;
    };

    static resetId = () => {
        this.projectId = 0;
    }
};
