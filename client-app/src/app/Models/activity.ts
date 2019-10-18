// interfaces in TypeScript are used for type checking. Could use a class but it would be compiled into JS unlike the interface
export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}