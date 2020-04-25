import Addons from "../helpers/addons.helper";
import { Request, Response } from "express";


const addons = new Addons();

export async function handleAddAddons(req : Request, res: Response){
    try{
        const {name, avaliable, type} = req.body
        const newAddon = await addons.addAddons({name, avaliable, type});
        res.send(newAddon)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAddons(req: Request, res : Response){
    try {
        const fetch = await addons.fetchAllAddons();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAddonsById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await addons.fetchAddonsById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateAddonById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await addons.updateAddonById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteAddonById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await addons.delteAddonById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}