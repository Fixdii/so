
export type BDQuestion = {
    dateOfCreation: number;
    tag: string;
    text: string;
    title: string;
    approved: boolean;
}


export type UIQuestion = BDQuestion & {
    id: string;
}

  