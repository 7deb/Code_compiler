import { Request, Response } from "express";
import { codeExecuter } from "../services/compilerServices";

export const executeCode = async ( req: Request,res: Response): Promise<void> => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    const result = await codeExecuter(code, language, input);
    res.status(200).json({ success: true, result });
    return ;
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    return ;
  }
};
