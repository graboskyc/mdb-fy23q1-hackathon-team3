import { ValueConverter } from "@angular/compiler/src/render3/view/template";

export interface FormData {

    _id?: number;
    title: string;
    author: string;
    authorId?: number;
    section: FieldDetails[];
}



export interface FieldDetails {
    id: string;
    displayText:string;
    question: string;
    type: string;
    default?: string;
    options?: string[]
}

