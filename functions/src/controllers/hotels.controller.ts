import Hotels from "../helpers/hotels.helper";
import Addresses from '../helpers/addresses.helper';

import { Request, Response } from "express";


const hotels = new Hotels();
const addresses = new Addresses();

export async function handleAddHotels(req : Request, res: Response){
    try{
        const {name, phone, description, email, rate, address} = req.body
        var newAddress = null
        var addressId = "none";

        if(address){
            newAddress = await addresses.addAddresses(address);
            addressId = newAddress.id;
        }
        const newHotel = await hotels.addHotels({name, phone, description, email, rate, addressId});
        res.send(newHotel)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleAddAddons(req : Request, res: Response){
    try{
        const {addons} = req.body;
        const {id} = req.params;

        const newAddons = await hotels.addAddons(addons, id);
        res.send(newAddons)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAddons(req: Request, res : Response){
    try {
        const {id} = req.params;
        const fetch = await hotels.fetchAllAddons(id);
        res.send(fetch)
    } catch (error) {
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