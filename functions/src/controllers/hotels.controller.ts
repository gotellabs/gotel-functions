import Hotels from "../helpers/hotels.helper";
import { Request, Response } from "express";


const hotels = new Hotels();

export async function handleAddHotels(req : Request, res: Response){
    try{
        const newHotel = await hotels.addHotels(req.body);
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