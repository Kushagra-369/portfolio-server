import { Request, Response } from "express";
import Portfolio from "../Model/portfolio_model";
import { IPortfolio } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";

export const create_project = async (req: Request<{}, {}, IPortfolio>,res: Response): Promise<void> => {
  try {
    const data = req.body;
    // upload image check db product is not present then upload img
    const newPortfolio = await Portfolio.create(data);
    res.status(201).send({status: "success", data: newPortfolio});
  } 
  catch (error: any) {errorHandling(error,res);}
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
    const { id } = req.params;
    const project = await Portfolio.findById(id);
    if (!project) {
      res.status(404).send({ status: "fail", message: "Project not found." });
      return;
    }
    await Portfolio.findByIdAndDelete(id);
    res.status(200).send({ status: "success", message: "Project deleted successfully." });
  } catch (error: any) {
    errorHandling(error, res);
  }
};



// get api  // filter delete product , active product 
// delete project
// update img only 
// update data but not updated img