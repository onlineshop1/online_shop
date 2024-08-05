import exp from "constants";
import { readFileCustom, writeFileCustom} from "../utils/fs.js";
import path from 'path';
const filePath = path.join(process.cwd(), "src", "models", "users.json")


export const getAllSellers = (req, res) =>{
    const allData = readFileCustom(filePath);
    const allSellers = allData.filter(data => data.role === 'seller')
    res.send({
        message: "ok",
        sellers: allSellers
    })
}
export const getSingleSellerById = (req, res) =>{
    const allData = readFileCustom(filePath);
    const foundedSeller = allData.find((s) => s.id == req.params.sellerId && s.role == 'seller');
    res.send({
        message: 'ok',
        data: foundedSeller
    })
}
export const postSeller = (req, res) =>{
    const allData = readFileCustom(filePath);
    const newSeller = {
        id: allData.length > 0 ? allData[allData.length - 1].id + 1 : 1,
        name: req.body.name,
        role: 'seller'
    };
    allData.push(newSeller);
    writeFileCustom(filePath, allData);
    res.status(201).send({
        message: 'Seller created successfully',
        data: newSeller
    });
}



