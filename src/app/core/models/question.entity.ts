import { UIComment, StoreObject } from "."

export type DBQuestion = {
    dateOfCreation: number;
    tag: string[];
    text: string;
    title: string;
    approved: boolean;
    author: string;
    comments: StoreObject<UIComment>;
}

export type UIQuestion = Omit<DBQuestion, 'comments'> & {
    id: string;
    comments: UIComment[];
}  