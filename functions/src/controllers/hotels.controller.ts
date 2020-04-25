import Hotels from "../helpers/hotels.helper";
import Adresses from '../helpers/adresses.helper';

import { Request, Response } from "express";


const hotels = new Hotels();
const adresses = new Adresses();

export async function handleAddHotels(req : Request, res: Response){
    try{
        const {name, phone, description, email, rate, address} = req.body
        const newAdress = await adresses.addAdresses(address);
        const adressId = newAdress.id;
        const newHotel = await hotels.addHotels({name, phone, description, email, rate, adressId});
        res.send(newHotel)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchHotels(req: Request, res : Response){
    try {
        const fetch = await hotels.fetchAllHotels();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchHotelsById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await hotels.fetchHotelsById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateHotelById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await hotels.updateHotelById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteHotelById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await hotels.delteHotelById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}