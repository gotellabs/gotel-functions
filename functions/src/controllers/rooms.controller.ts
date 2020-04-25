import Rooms from "../helpers/rooms.helper";
import { Request, Response } from "express";


const rooms = new Rooms();

export async function handleAddRooms(req : Request, res: Response){
    try{
        const {hotelId, name, description, stock} = req.body
        const newRoom = await rooms.addRooms({hotelId, name, description, stock});
        res.send(newRoom)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchRooms(req: Request, res : Response){
    try {
        const fetch = await rooms.fetchAllRooms();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchRoomsById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await rooms.fetchRoomsById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateRoomById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await rooms.updateRoomById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteRoomById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await rooms.delteRoomById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}