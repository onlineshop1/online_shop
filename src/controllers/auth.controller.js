
import path from 'path'
import { readFileCustom} from '../utils/fs.js'
import { writeFileCustom } from '../utils/fs.js'
import { checkPasswordCustomer, checkPhoneNumber, checkPasswordAdmins } from '../utils/register.js'
const filePath = path.join(process.cwd(), "src", "models", "users.json")

// login formidan kelgan ma'lumotlarni tekshirish
export const login = (req, res) =>{
    const {phoneNumber, password } = req.body
    const allUsers = readFileCustom(filePath)
    //userni topish
    const foundedUser = allUsers.find(data =>data.phone_number === phoneNumber && data.password === password)
    if(!foundedUser){
        res.render('404', {message:'user not found'})
        return
    }
    // login vaqtida userlarni ROLE orqali ajratish
    switch(foundedUser.role){
        case "seller":
            res.redirect(`/seller?id=${foundedUser.id}`)
            break;
        case "customer":
            res.redirect(`/index?id=${foundedUser.id}`)
            break;
        case "superadmin":
            res.redirect(`/superadmin`)
            break;
        case "admin":
            res.redirect(`/admin?id=${foundedUser.id}`)
        default:
            res.redirect(`404'?message=${ "User not found role"}`) 
            break;
    }
}

// register forimdan kelgan ma'lumotlarni tekshirsh
export const register = (req, res) => {
    const { firstName, lastName, phoneNumber, password, passwordRepeat } = req.body;
    const allUsers = readFileCustom(filePath)
    //auto complite ID
    let userId = allUsers.at(-1).id || 1
    //password to'g'ri ekanligini tekshirish
    if(!checkPasswordCustomer(password, passwordRepeat)){
        console.log(`password xato${password}`)
        return res.render('register', {message:'parollaringiz mos emas'})
    }
    //phone numberni tekshirish takshirish
    if(checkPhoneNumber(phoneNumber)){
        const existingUser = allUsers.find(user => user.phone_number === phoneNumber);
        if (existingUser) {
            return res.render('register.ejs', { message: 'User already exists' });
        }
    }else{
        return res.render('register.ejs', {message: "telefon raqam noto'g'ri"})
    }
    
    // user ma'lumotlari
    const newUser = {
        id: userId + 1,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        password: password,
        role: "customer" 
    };
    //yangi user ma'lumotlarni data basega saqlash
    allUsers.push(newUser);
    writeFileCustom(filePath, allUsers);

    
    res.render ('index.ejs'); 
};