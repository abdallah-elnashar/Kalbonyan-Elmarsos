const wait = function (num) {
    return new Promise(function (resolve) {
        setTimeout(resolve, num * 1000)
    })
}

const imgContainer = document.querySelector('.images')
const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = `${imgPath}`;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img)
        })

        img.addEventListener('error', function () {
            reject(new Error('image not found'))
        })

    })
}
let currentImg;
createImage(`img/img-1.jpg`)
    .then(img => {
        currentImg = img;
        return wait(2)
    }).then(() => {
        currentImg.style.display = 'none'
        return createImage('img/img-2.jpg');
    }).then((img) => {
        currentImg = img;
        return wait(2)
    }).then(() => {
        currentImg.style.display = 'none'
    })
    .catch(err => console.error(err));