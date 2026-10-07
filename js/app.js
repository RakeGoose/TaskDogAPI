const nextButton = document.getElementById('next-button');
const dogImage = document.getElementById('dog-image');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error');

async function loadDogImage() {
    nextButton.disabled = true;
    loading.textContent = "Загрузка...";
    errorMessage.textContent = "";
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        if (!response.ok) {
            throw new Error(`Ошибка HTTP запроса: ${response.status}`);
        }

        const data = await response.json();
        await loadImage(data.message);
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        nextButton.disabled = false;
        loading.textContent = "";
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        dogImage.onload = () => {
            resolve();
        };
        dogImage.onerror = () => {
            reject(new Error("Не удалось загрузить изображение"));
        };

        dogImage.src = url;
    });
}

void loadDogImage();

nextButton.addEventListener('click', loadDogImage);