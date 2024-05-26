function handleClick() {
    const cover = document.querySelector('.email-box .cover');
    const button =document.querySelector('.email-box .button')
    button.classList.add('button-open')
    // 检查并切换类
    if (cover.classList.contains('open')) {
        cover.classList.remove('open');
        cover.classList.add('off');
        // 可以在这里添加额外的处理，比如在关闭动画完成后执行的函数
    } else {
        cover.classList.remove('off');
        cover.classList.add('open');
        // 同样，可以在这里添加开启动画完成后的处理
    }
}
// 雪花配置
const snowMax = 40;
// "#FFDA65", "#00AADD", "#aaaacc", "#a0c4ff", "#ccccdd", "#caffbf", "#bbf7f9", "#ffc6ff", "#ffd6a5"
const snowColors = ["#fff"];
const snowTypes = ["Times", "Arial", "Verdana"];
const snowLetter = "❉";
const sinkSpeed = 0.6;
const snowMaxSize = 32;
const snowMinSize = 12;
const snowingZone = 1;

const snowFlakes = [];
let marginBottom, marginRight;
const xMovements = [];
const coords = [];
const leftRightOffsets = [];

const getRandom = (range) => Math.floor(range * Math.random());

const initSnow = () => {
    marginBottom = document.documentElement.scrollHeight - 80;
    marginRight = document.documentElement.clientWidth - 15;

    for (let i = 0; i < snowMax; i++) {
        coords[i] = 0;
        leftRightOffsets[i] = Math.random() * 15;
        xMovements[i] = 0.03 + Math.random() / 10;
        const flake = document.createElement('span');
        flake.id = `s${i}`;
        flake.textContent = snowLetter;
        flake.style.position = 'absolute';
        flake.style.fontFamily = snowTypes[getRandom(snowTypes.length)];
        flake.style.fontSize = `${getRandom(snowMaxSize - snowMinSize) + snowMinSize}px`;
        flake.style.color = snowColors[getRandom(snowColors.length)];
        flake.style.zIndex = '1000';
        flake.sink = sinkSpeed * parseFloat(flake.style.fontSize) / 5;

        let posX;
        switch (snowingZone) {
            case 1:
                posX = getRandom(marginRight - parseFloat(flake.style.fontSize));
                break;
            case 2:
                posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize));
                break;
            case 3:
                posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize)) + marginRight / 4;
                break;
            case 4:
                posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize)) + marginRight / 2;
                break;
        }

        flake.posY = getRandom(2 * marginBottom - marginBottom - 2 * parseFloat(flake.style.fontSize));
        flake.style.left = `${posX}px`;
        flake.style.top = `${flake.posY}px`;
        document.body.appendChild(flake);
        snowFlakes.push(flake);
    }

    moveSnow();
};

const moveSnow = () => {
    snowFlakes.forEach((flake, i) => {
        coords[i] += xMovements[i];
        flake.posY += flake.sink;
        flake.style.left = `${flake.posX + leftRightOffsets[i] * Math.sin(coords[i])}px`;
        flake.style.top = `${flake.posY}px`;

        if (flake.posY >= marginBottom - 2 * parseFloat(flake.style.fontSize) || parseInt(flake.style.left) > (marginRight - 3 * leftRightOffsets[i])) {
            switch (snowingZone) {
                case 1:
                    flake.posX = getRandom(marginRight - parseFloat(flake.style.fontSize));
                    break;
                case 2:
                    flake.posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize));
                    break;
                case 3:
                    flake.posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize)) + marginRight / 4;
                    break;
                case 4:
                    flake.posX = getRandom(marginRight / 2 - parseFloat(flake.style.fontSize)) + marginRight / 2;
                    break;
            }
            flake.posY = 0;
        }
    });

    requestAnimationFrame(moveSnow);
};

if (document.readyState === "complete") {
    initSnow();
} else {
    document.addEventListener("DOMContentLoaded", initSnow);
}