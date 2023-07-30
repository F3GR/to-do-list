let groupNodes;

export function getGroupNodes() {
    if (groupNodes) {
        return groupNodes;
    }
    return groupNodes = {   
        mainGroupName: document.querySelector('main .header span'),
        mainGroupIcon: document.querySelector('main .header img'),
        taskList: document.querySelector('main .task-list')   
    };
};

