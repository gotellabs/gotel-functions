import Products from "../helpers/products.helper";
import { Request, Response } from "express";


const products = new Products();

export async function handleAddProducts(req: Request, res: Response) {
    try {
        const { hotelId } = req.params;
        const { name, description, stock, price, avaliable, imageUrl } = req.body
        const newProduct = await products.addProducts({ hotelId, name, description, stock, price, avaliable, imageUrl });
        res.send(newProduct)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchProducts(req: Request, res: Response) {
    try {
        const fetch = await products.fetchAllProducts();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchProductsByHotel(req: Request, res: Response) {
    try {
        const { hotelId } = req.params;
        const fetch = await products.fetchAllProductsByHotel(hotelId);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchProductsById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await products.fetchProductsById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await products.updateProductById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const fetch = await products.delteProductById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}