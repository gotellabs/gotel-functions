import Adresses from "../helpers/adresses.helper";
import { Request, Response } from "express";


const adresses = new Adresses();

export async function handleAddAdresses(req : Request, res: Response){
    try{
        const {country, city, district, street, number, zipcode} = req.body
        const newAdress = await adresses.addAdresses({country, city, district, street, number, zipcode});
        res.send(newAdress)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAdresses(req: Request, res : Response){
    try {
        const fetch = await adresses.fetchAllAdresses();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAdressesById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await adresses.fetchAdressesById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateAdressById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await adresses.updateAdressById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteAdressById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await adresses.delteAdressById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}