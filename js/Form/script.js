const form = document.getElementById('form-registration');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password= document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const formMsg = document.getElementById('form-msg');
let errors = {};


function showError(input, msg) {
    const formControl = input.parentElement;
    const errorMsg = formControl.querySelector('.main-form-control-msg');

    formControl.className = 'main-form__control error';
    errorMsg.innerText = msg;
    errors[input.id] = false;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'main-form__control success';
     errors[input.id] = true;
}

function checkEmail (input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(input.value).toLowerCase())){
        showSuccess(input)
    }else {
        showError(input, 'Email is not valid');
    }
}

function checkRequired(array){
    array.forEach((input)=>{
        if(input.value.trim() === ''){
            showError(input, `${input.name} is required`);
        }else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${input.name} must be at least ${min} characters`)
    }else if (input.value.length > max){
        showError(input, `${input.name} must be less than ${max} characters`)

    } else {
        showSuccess(input);
    }
}

function checkPassword(input1, input2){
    checkLength(input1, 6, 25);

    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function showMsg() {
    form.classList.add('hidden');
    formMsg.classList.add('visible');
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    checkRequired([username, email, password, passwordConfirm]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPassword(password, passwordConfirm);

    if(errors.username === true && errors.email === true && errors.passwordConfirm === true) {
       showMsg();
    }

});
