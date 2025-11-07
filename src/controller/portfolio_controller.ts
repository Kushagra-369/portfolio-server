import { Request, Response } from "express";
import Portfolio from "../Model/portfolio_model";
import { IPortfolio } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";
import { upload_project_img, deleteImg } from '../img/upload'



export const create_project = async (req: Request, res: Response): Promise<void> => {
  try {
    let data: any = req.body;
    const img = req.file;

    if (!img) { res.status(400).send({ status: false, message: "Image is required." }); return }
    if (typeof data.tools === "string") data.tools = JSON.parse(data.tools)
    if (typeof data.socialLinks === "string") data.socialLinks = JSON.parse(data.socialLinks)

    data.profilePhoto = await upload_project_img(img.path)

    const newPortfolio = await Portfolio.create(data);
    res.status(201).json({ status: "success", data: newPortfolio });
  } catch (error: any) {
    errorHandling(error, res);
  }
};


export const get_all_project = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Portfolio.find();
    res.status(200).send({ status: "success", data: projects });
  } catch (error: any) {
    errorHandling(error, res);
  }
};



export const delete_project = async (req: Request, res: Response): Promise<void> => {
  try {
    let { isDeleted, product_id } = req.query;



    if (typeof isDeleted === "string") {
      try { isDeleted = JSON.parse(isDeleted) }
      catch { res.status(400).send({ status: false, message: 'Invalid type isDeleted' }); return }
    }

    const project = await Portfolio.findById(product_id);
    if (!project) { res.status(404).send({ status: "fail", message: "Project not found." }); return; }

    if (isDeleted) {
      project.isDeleted = true; await project.save();
      res.status(200).send({ status: "success", message: "Project soft-deleted successfully." });
      return
    }
    else {
      project.isDeleted = false; await project.save();
      res.status(200).send({ status: "success", message: "Project restored successfully." });
    }
  }
  catch (error: any) { errorHandling(error, res); }
};

export const update_project = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const project = await Portfolio.findById(id);
    if (!project) {
      res.status(404).send({ status: "fail", message: "Project not found." });
      return;
    }

    // Update project details
    Object.assign(project, data);
    await project.save();

    res.status(200).send({ status: "success", message: "Project updated successfully.", data: project });
  } catch (error: any) {
    errorHandling(error, res);
  }
};

export const update_project_img = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const { product_id } = req.query


    if (!product_id) { res.status(400).send({ status: false, message: "Product id is required." }); return }
    if (!file) { res.status(400).send({ status: false, message: "Image is required." }); return }

    const project = await Portfolio.findById(product_id);

    if (!project) { res.status(404).send({ status: false, message: "Project not found." }); return; }

    if (project?.profilePhoto?.public_id) {
      await deleteImg(project?.profilePhoto?.public_id)
    }

    const imgUrl = await upload_project_img(file.path)
    const update_img = await Portfolio.findByIdAndUpdate(product_id, { $set: { profilePhoto: imgUrl } }, { new: true })
    res.status(200).send({ status: "success", message: "Project image updated successfully.", data: update_img }); return

  }
  catch (error: any) { errorHandling(error, res); }
}

