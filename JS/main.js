function openCategoryList(){
    let dropNavMenu = document.querySelector('.category_nav_list');
    dropNavMenu.classList.toggle('enable');
}

document.getElementById('cat-btn').addEventListener('click', (e)=>{
    openCategoryList();
});

function toggleMobileMenu(){
    let mobMenu = document.querySelector('.mobile-menu');
    mobMenu.classList.toggle('collapse');
}

document.getElementById('menu-btn').addEventListener('click', (e)=>{
    toggleMobileMenu();
});

document.getElementById('x-mark').addEventListener('click', (e)=>{
    toggleMobileMenu();
});

let carosalCounter =  0;

const carosalImages = [
    './img/banner_home1.png',
    './img/banner_home2.png'
];

function carosalSlideRight(){
    if(carosalCounter == carosalImages.length - 1){
        carosalCounter = 0;
        return carosalImages[carosalCounter];
    }

    carosalCounter += 1;
    return carosalImages[carosalCounter];
}

function carosalSlideLeft(){
    if(carosalCounter == 0){
        carosalCounter = carosalImages.length - 1;
        return carosalImages[carosalCounter];
    }

    carosalCounter -= 1;
    return carosalImages[carosalCounter];
}


function changeImage(newSrc) {
    carosalCurrentImage.classList.add("fade-out");

    setTimeout(() => {
        carosalCurrentImage.src = newSrc;
        carosalCurrentImage.classList.remove("fade-out"); 
    }, 300);
}

document.getElementById('prevImg').addEventListener('click', () => {
    changeImage(carosalSlideLeft());
});

document.getElementById('nxtImg').addEventListener('click', () => {
    changeImage(carosalSlideRight());
});