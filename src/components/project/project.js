export class Project {
    constructor(id, name, iconURL, altText) {
        this.id = id;
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
}
