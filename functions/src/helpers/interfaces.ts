export interface Result {
    success: boolean;
    data: {} | undefined;
}

export interface ResultId {
    success: boolean;
    data: {} | undefined;
    id: string;
}

export interface Address {
    country: string,
    city: string,
    district: string,
    street: string,
    number: number,
    zipcode: string,
}

export interface Hotel {
    name: string,
    phone: string,
    description: string,
    email: string,
    rate: number,
    addressId: string
}

export interface Room {
    hotelId: string,
    name: string,
    description: string,
    stock: number
}

export interface Addon {
    name: string,
    avaliable: boolean,
    type: string
}

export interface Product {
    hotelId: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    avaliable: boolean,
    imageUrl: string
}

export interface Photo {
    hotelId?: string,
    roomId?: string,
    description: string,
    imageUrl: string
}

export interface AddonRoom {
    roomId: string,
    addonId: string
}

export interface AddonHotel {
    hotelId: string,
    addonId: string
}