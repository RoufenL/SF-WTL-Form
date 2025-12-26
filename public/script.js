// Функция для обновления временной метки капчи
function timestamp() {
    const response = document.getElementById("g-recaptcha-response");
    const captchaSettings = document.getElementsByName("captcha_settings")[0];

    if (captchaSettings && (!response || response.value.trim() === "")) {
        let elems = JSON.parse(captchaSettings.value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        captchaSettings.value = JSON.stringify(elems);
    }
}

// Запуск таймера обновления метки
setInterval(timestamp, 500);

// Загрузка продуктов из JSON
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