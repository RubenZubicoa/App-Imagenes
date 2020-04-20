import { Request, Response } from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';


export async function getPhotos(req: Request, res: Response): Promise<Response> {

    const photos = await Photo.find();
    return res.json(photos);

}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const photo = await Photo.findById(req.params.id);
    return res.json(photo);
}

export async function createPhoto(req: Request, res: Response): Promise<Response> {

    const { title, description } = req.body;
    const { path } = req.file;

    const newPhoto = {
        title: title,
        description: description,
        imagePath: path
    }
    const photo = new Photo(newPhoto);

    await photo.save();

    return res.json({
        message: "Photo succesfully saved",
        photo
    });
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const photo = await Photo.findByIdAndRemove(req.params.id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: "Photo deleted", photo });
}
export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;

    const photo = await Photo.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({ message: "Photo updated", photo })
}