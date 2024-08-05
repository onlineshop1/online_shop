//mijozlar parolini tekshirish
export function checkPasswordCustomer(password, passwordRepeat) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if ((password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && password == passwordRepeat)) {
        return true;
    } else {
        return false;
    }
}
// adminlar parolini tekshirish
export function checkPasswordAdmins(password, passwordRepeat) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if ((password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && password == passwordRepeat)) {
        return true;
    } else {
        return false;
    }
}
// telefon raqamni tekshirish
export const checkPhoneNumber = function(phoneNumber){
    const head = phoneNumber.slice(0, 4)
    if(head == '+998'&& head.length == 13 ) {
        return true;
    }else{
        return false;
    }
}

