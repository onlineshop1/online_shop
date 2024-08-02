
import path from 'path'
import { readFileCustom} from '../utils/fs.js'
import { writeFileCustom } from '../utils/fs.js'
const filePath = path.join(process.cwd(), "src", "models", "users.json")

    // formdan kelgan ma'lumotlarni bazada bor yoki yo'q ekanligini tekshiruvchi funktsiya
export const login = (req, res) =>{
    const {phoneNumber, password } = req.body
    const allUser = readFileCustom(filePath)
    const foundedUser = allUser.find(data =>data.phone_number === phoneNumber && data.password === password)

    if(!foundedUser){
        res.render('404', {message:'user not found'})
        return
    }

    switch(foundedUser.role){
        case "seller":
            res.render('seller.ejs', {seller: foundedUser})
            break;
        case "customer":
            res.render('index.ejs', {customer: foundedUser})
            break;
        case "superadmin":
            res.render('superadmin.ejs', {superadmin: foundedUser})
            break;
        case "admin":
            res.render('admin.ejs', {admin: foundedUser})
        default:
            res.render('404.ejs',{message: "User not found role"}) 
            break;
    }
} 

export const register = (req, res) => {
    const { firstName, lastName, phoneNumber, password, passwordRepeat } = req.body;

    if (password !== passwordRepeat) {
        return res.render('register.ejs', { message: 'Passwords do not match' });
    }

    const allUsers = readFileCustom(filePath);
    console.log(allUsers)
    const existingUser = allUsers.find(user => user.phone_number === phoneNumber);
    console.log(existingUser)
    if (existingUser) {
        return res.render('register.ejs', { message: 'User already exists' });
    }


    const newUser = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        password: password,
        role: "customer" 
    };

    allUsers.push(newUser);
    writeFileCustom(filePath, allUsers);

    res.render ('index.ejs'); 
};