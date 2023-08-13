let groupNodes;

export function getGroupNodes() {
    if (groupNodes) {
        return groupNodes;
    }

    const mainGroupName = document.querySelector('main .header span');
    const mainGroupIcon = document.querySelector('main .header img');
    const taskList = document.querySelector('main .task-list');
    const addTaskIcon = document.querySelector('main .task-bar img.add-new')

    return groupNodes = {   
        mainGroupName,
        mainGroupIcon,
        taskList,
        addTaskIcon
    };
};

