function timestamp() {
    const response = document.getElementById("g-recaptcha-response");
    const captchaSettings = document.getElementsByName("captcha_settings")[0];

    if (captchaSettings && (!response || response.value.trim() === "")) {
        let elems = JSON.parse(captchaSettings.value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        captchaSettings.value = JSON.stringify(elems);
    }
}

setInterval(timestamp, 500);

const productSelect = document.getElementById("00NdL00001pNCsD");

if (productSelect) {
    fetch('./products.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки JSON файла');
            return response.json();
        })
        .then(products => {
            products.forEach(prod => {
                let option = document.createElement("option");
                option.value = prod.code;
                option.text = prod.name;
                productSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            let option = document.createElement("option");
            option.text = "Ошибка загрузки списка";
            productSelect.appendChild(option);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;

        const firstName = document.getElementById('first_name');
        if (!nameRegex.test(firstName.value)) {
            document.getElementById('fname-error').style.display = 'block';
            firstName.style.borderColor = 'red';
            isValid = false;
        } else {
            document.getElementById('fname-error').style.display = 'none';
            firstName.style.borderColor = '';
        }

        const lastName = document.getElementById('last_name');
        if (!nameRegex.test(lastName.value)) {
            document.getElementById('lname-error').style.display = 'block';
            lastName.style.borderColor = 'red';
            isValid = false;
        } else {
            document.getElementById('lname-error').style.display = 'none';
            lastName.style.borderColor = '';
        }

        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('email-error').style.display = 'block';
            emailInput.style.borderColor = 'red';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
            emailInput.style.borderColor = '';
        }

        const phoneInput = document.getElementById('phone');
        const cleanPhone = phoneInput.value.replace(/\D/g, ""); 
        if (cleanPhone.length < 10) {
            document.getElementById('phone-error').style.display = 'block';
            phoneInput.style.borderColor = 'red';
            isValid = false;
        } else {
            document.getElementById('phone-error').style.display = 'none';
            phoneInput.style.borderColor = '';
        }

        const captchaResponse = grecaptcha.getResponse();
        const captchaWrapper = document.getElementById('captcha-wrapper');
        const captchaError = document.getElementById('captcha-error');

        if (captchaResponse.length === 0) {
            captchaError.style.display = 'block';
            captchaWrapper.style.borderColor = 'red';
            isValid = false;
        } else {
            captchaError.style.display = 'none';
            captchaWrapper.style.borderColor = 'transparent';
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});