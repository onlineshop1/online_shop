import{Router} from 'express'
import { getAllSellers, getSingleSellerById, postSeller } from '../controllers/seller.controllers.js';



const sellersRoutes = Router();

sellersRoutes
    .get('/Sellers', getAllSellers)
    .get('/Sellers/:sellerId', getSingleSellerById)
    .post('/Sellers', postSeller)

export default sellersRoutes