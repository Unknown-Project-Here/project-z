export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'p0':
            return 'bg-[hsl(325.5,90%,80%)] text-[hsl(325.5,90%,20%)] dark:bg-[hsl(325.5,100%,73.7%)] dark:text-[hsl(325.5,100%,20%)]';
        case 'p1':
            return 'bg-[hsl(264.7,79.5%,80%)] text-[hsl(264.7,79.5%,20%)] dark:bg-[hsl(264.7,89.5%,77.6%)] dark:text-[hsl(264.7,89.5%,20%)]';
        case 'p2':
            return 'bg-[hsl(31,90%,80%)] text-[hsl(31,90%,20%)] dark:bg-[hsl(31,100%,71.2%)] dark:text-[hsl(31,100%,20%)]';
        case 'p3':
            return 'bg-[hsl(31,90%,80%)] text-[hsl(31,90%,20%)] dark:bg-[hsl(31,100%,81.2%)] dark:text-[hsl(31,100%,20%)]';
        default:
            return 'bg-[hsl(325.5,90%,80%)] text-[hsl(325.5,90%,20%)] dark:bg-[hsl(325.5,100%,83.7%)] dark:text-[hsl(325.5,100%,20%)]';
    }
};

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'breeze':
            return 'bg-[hsl(325.5,90%,90%)] text-[hsl(325.5,90%,30%)] dark:bg-[hsl(325.5,100%,83.7%)/0.2] dark:text-[hsl(325.5,100%,83.7%)]';
        case 'slope':
            return 'bg-[hsl(264.7,79.5%,90%)] text-[hsl(264.7,79.5%,30%)] dark:bg-[hsl(264.7,89.5%,77.6%)/0.2] dark:text-[hsl(264.7,89.5%,77.6%)]';
        case 'hill':
            return 'bg-[hsl(31,90%,90%)] text-[hsl(31,90%,30%)] dark:bg-[hsl(31,100%,71.2%)/0.2] dark:text-[hsl(31,100%,71.2%)]';
        case 'mountain':
            return 'bg-[hsl(31,90%,90%)] text-[hsl(31,90%,30%)] dark:bg-[hsl(31,100%,81.2%)/0.2] dark:text-[hsl(31,100%,81.2%)]';
        case 'everest':
            return 'bg-[hsl(325.5,90%,90%)] text-[hsl(325.5,90%,30%)] dark:bg-[hsl(325.5,100%,83.7%)/0.2] dark:text-[hsl(325.5,100%,83.7%)]';
        default:
            return 'bg-muted/50 text-muted-foreground';
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'todo':
            return 'bg-muted/50 text-muted-foreground';
        case 'in-progress':
            return 'bg-[hsl(264.7,79.5%,90%)] text-[hsl(264.7,79.5%,30%)] dark:bg-[hsl(264.7,89.5%,77.6%)/0.2] dark:text-[hsl(264.7,89.5%,77.6%)]';
        case 'review':
            return 'bg-[hsl(325.5,90%,90%)] text-[hsl(325.5,90%,30%)] dark:bg-[hsl(325.5,100%,83.7%)/0.2] dark:text-[hsl(325.5,100%,83.7%)]';
        case 'done':
            return 'bg-[hsl(31,90%,90%)] text-[hsl(31,90%,30%)] dark:bg-[hsl(31,100%,71.2%)/0.2] dark:text-[hsl(31,100%,71.2%)]';
        default:
            return 'bg-muted/50 text-muted-foreground';
    }
};
