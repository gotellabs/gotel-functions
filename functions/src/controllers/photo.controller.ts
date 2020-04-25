import Photos from "../helpers/photos.helper";
import { Request, Response } from "express";


const photos = new Photos();

export async function handleAddPhotos(req : Request, res: Response){
    try{
        const {description, imageUrl} = req.body
        const newPhoto = await photos.addPhotos({description, imageUrl});
        res.send(newPhoto)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchPhotos(req: Request, res : Response){
    try {
        const fetch = await photos.fetchAllPhotos();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchPhotosById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await photos.fetchPhotosById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdatePhotoById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await photos.updatePhotoById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeletePhotoById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await photos.deltePhotoById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}