import { Request, Response } from "express";
import { selectUsersIds } from "../database/resolvers";

export const getUsersIds = (_req: Request, res: Response) => {
  try {
    return selectUsersIds().then((data) =>
      res.status(201).send(data.map((dataItem) => dataItem.id))
    );
  } catch (err) {
    return res.status(403).send(err);
  }
};
