import { toggleMobileMenu } from "./utills.js";

document.querySelector('#menu-btn').addEventListener('click', ()=>{
    toggleMobileMenu()
});

document.querySelector('#x-mark').addEventListener('click', ()=>{
    toggleMobileMenu();
})