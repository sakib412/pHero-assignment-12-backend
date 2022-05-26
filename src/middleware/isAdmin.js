import { errorResponse } from "../utils/response";

const isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'ADMIN') {
        return res.status(403).json(errorResponse("Forbidden access"));
    }
    next()
}

export default isAdmin