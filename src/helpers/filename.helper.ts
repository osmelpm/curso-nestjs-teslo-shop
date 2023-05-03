import { v4 as uuid } from 'uuid';
export function fileName(
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) {
  const extension = file.originalname.split('.')[1];
  const filename = `${uuid()}.${extension}`;
  callback(null, filename);
}
