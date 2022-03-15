import { ValueConverter } from "@angular/compiler/src/render3/view/template";

export interface FormData {

    id?: number;
    title: string;
    author: string;
    authorId: number;
    fields: FieldDetails[];
}



export interface FieldDetails {
    id: string;
    displayText:string;
    type: string;
    default?: string;
    options?: FieldOptions[]
}

export interface FieldOptions {
    key: string;
    value: string;
}