document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password-input');
    const icon = this;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('bx-hide', 'bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('bx-show', 'bx-hide');
    }
});

document.getElementById('toggle-repeat-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('repeat-password-input');
    const icon = this;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('bx-hide', 'bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('bx-show', 'bx-hide');
    }
});