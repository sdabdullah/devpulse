export interface IIssue {
    title: string;
    description: string;
    type: string;
}

export interface IupdateIssue {
    title?: string;
    description?: string;
    type?: string;
}