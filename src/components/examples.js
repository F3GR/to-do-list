import { add } from 'date-fns';

const now = new Date();
const year1 = now.getFullYear();
const month1 = now.getMonth() + 1;
const day1 = now.getDate();

const date = new Date(year1, month1, day1);

const result1 = add(date, {
    months: 1
}).toLocaleDateString();

const result2 = add(date, {
    days: -1
}).toLocaleDateString();


export const projectExample = {
    name: 'New project', 
    iconURL: '../src/originals/category-it.svg', 
    altText: 'Category IT icon'
};


export const taskExample1 = {
    projectId: "1",
    title: 'Task example 1', 
    dueDate: result1, 
    priority: '2', 
    description: '', 
    notes: ''
};

export const taskExample2 = {
    projectId: "1",
    title: 'Task example 2', 
    dueDate: result2, 
    priority: '1', 
    description: '', 
    notes: ''
};