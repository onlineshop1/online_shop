import{Router} from 'express'
import { 
    getAllSellers,
    getSingleSellerById,
    postSeller,
    deleteSeller,
    updateSeller
 } from '../controllers/seller.controllers.js';



const sellersRoutes = Router();

sellersRoutes
    .get('/Sellers', getAllSellers)
    .get('/Sellers/:sellerId', getSingleSellerById)
    .post('/Sellers', postSeller)
    .delete('/Sellers/delete/:sellerId', deleteSeller)
    .put('/sellers/update/:sellerId',updateSeller)

export default sellersRoutes