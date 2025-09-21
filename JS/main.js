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