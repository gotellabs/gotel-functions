import Addresses from "../helpers/addresses.helper";
import { Request, Response } from "express";


const addresses = new Addresses();

export async function handleAddAddresses(req: Request, res: Response) {
    try {
        const { country, city, district, street, number, zipcode } = req.body
        const newAddress = await addresses.addAddresses({ country, city, district, street, number, zipcode });
        res.send(newAddress)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAddresses(req: Request, res: Response) {
    try {
        const fetch = await addresses.fetchAllAddresses();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchAddressesById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await addresses.fetchAddressesById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateAddressById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await addresses.updateAddressById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteAddressById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await addresses.delteAddressById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}