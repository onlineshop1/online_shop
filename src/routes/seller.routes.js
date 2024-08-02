import{Router} from 'express'
import { getAllSellers, getSingleStudentById } from '../controllers/seller.controllers.js';



const sellersRoutes = Router();

sellersRoutes
    .get('/Sellers', getAllSellers)
    .get('/Sellers/:sellerId', getSingleStudentById);

export default sellersRoutes