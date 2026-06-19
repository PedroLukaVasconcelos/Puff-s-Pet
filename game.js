// BOTÕES

const buttonPlayWith = document.getElementById("buttonPlayWith");
const buttonFeed = document.getElementById("buttonFeed");
const buttonWater = document.getElementById("buttonWater");
const buttonWalk = document.getElementById("buttonWalk");
const buttonKillPet = document.getElementById("buttonKillPet");
const buttonRevivePet = document.getElementById("buttonRevivePet");

// BARRAS

const objectLvlPlay = document.getElementById("objectLvlPlay");
const objectLvlHunger = document.getElementById("objectLvlHunger");
const objectLvlThirst = document.getElementById("objectLvlThirst");
const objectLvlWalks = document.getElementById("objectLvlWalks");

// ELEMENTOS

const petBoxSingular = document.getElementById("petBoxSingular");
const petIcon = document.getElementById("petIcon");

// IMAGEM PADRÃO

petIcon.src = "img/pluffs.png";

// STATUS INICIAIS

objectLvlPlay.value = 100;
objectLvlHunger.value = 100;
objectLvlThirst.value = 100;
objectLvlWalks.value = 100;

// BRINCAR

buttonPlayWith.addEventListener("click", () => {
    objectLvlPlay.value = Math.min(100, objectLvlPlay.value + 40);
});

// COMER

buttonFeed.addEventListener("click", () => {
    objectLvlHunger.value = Math.min(100, objectLvlHunger.value + 40);
});

// BEBER

buttonWater.addEventListener("click", () => {
    objectLvlThirst.value = Math.min(100, objectLvlThirst.value + 40);
});

// PASSEAR

buttonWalk.addEventListener("click", () => {
    objectLvlWalks.value = Math.min(100, objectLvlWalks.value + 40);
});

// MATAR

buttonKillPet.addEventListener("click", () => {

    objectLvlPlay.value = 0;
    objectLvlHunger.value = 0;
    objectLvlThirst.value = 0;
    objectLvlWalks.value = 0;

    petIcon.style.opacity = "0.3";

    petBoxSingular.style.filter = "grayscale(100%)";

    buttonKillPet.style.display = "none";
    buttonRevivePet.style.display = "block";
});

// REVIVER

buttonRevivePet.addEventListener("click", () => {

    objectLvlPlay.value = 100;
    objectLvlHunger.value = 100;
    objectLvlThirst.value = 100;
    objectLvlWalks.value = 100;

    petIcon.style.opacity = "1";

    petBoxSingular.style.filter = "none";

    buttonKillPet.style.display = "block";
    buttonRevivePet.style.display = "none";
});

// DECRESCIMENTO AUTOMÁTICO

setInterval(() => {
    if (objectLvlPlay.value > 0)
        objectLvlPlay.value--;
}, 1000);

setInterval(() => {
    if (objectLvlHunger.value > 0)
        objectLvlHunger.value--;
}, 1100);

setInterval(() => {
    if (objectLvlThirst.value > 0) {
        objectLvlThirst.value--;
    }
}, 600);

setInterval(() => {
    if (objectLvlWalks.value > 0)
        objectLvlWalks.value--;
}, 2000);
