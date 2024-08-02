import { readFileCustom, writeFileCustom } from "../utils/fs.js";


export const getAllSellers = (req, res) =>{
    const allData = readFileCustom('./src/models/users.json')
    const allSellers = allData.filter(data => data.role === 'seller')
    res.send({
        message: "ok",
        data: allSellers
    })
}
export const getSingleStudentById = (req, res) =>{
    const allData = readFileCustom('./src/models/users.json')
    const foundedSeller = allData.find((s) => s.id == req.params.sellerId && s.role == 'seller')
    res.send({
        message: 'ok',
        data: foundedSeller
    })
}



