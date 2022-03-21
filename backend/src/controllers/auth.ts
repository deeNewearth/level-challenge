import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

export const test = async (
  req: Request,
  res: Response
): Promise<Response> => {
  
  
  return res.status(HttpStatus.OK).json({ error: 'hello routed' });

  //return res.status(HttpStatus.CREATED).json(bag);
};


export const login = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { userName, password } = req.body;

    if('John Doe' != userName && 'letmein!' != password){
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'incorrect username or password' });
    }

    return res.status(HttpStatus.OK).json({
      serverPath: process.cwd()
    });

  };
  