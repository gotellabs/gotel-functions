export interface Result {
    success: boolean;
    data: {} | undefined;
}

export interface Hotel{
    name : string,
    phone : string,
    description: string,
    email : string,
    rate : number,
}