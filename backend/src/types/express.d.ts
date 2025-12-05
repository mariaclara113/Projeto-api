import { User } from "../middlewares/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}