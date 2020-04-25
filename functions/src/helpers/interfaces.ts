export interface Result {
    success: boolean;
    data: {} | undefined;
}

export interface ResultId {
    success: boolean;
    data: {} | undefined;
    id:string;
}


export interface Adress{
    country:string,
    city:string,
    district:string,
    street:string,
    number:number,
    zipcode:string,
}

export interface Hotel{
    name : string,
    phone : string,
    description: string,
    email : string,
    rate : number,
    adressId: string
}

