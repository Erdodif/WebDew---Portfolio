document.addEventListener("DOMContentLoaded", () => {
    let menuActive = false;
    let menu = document.getElementById("menu");
    document.getElementById("menu-toogle").addEventListener("click", () => {
        if (menuActive) {
            menu.classList.remove("focused");
        }
        else {
            menu.classList.add("focused");
        }
        menuActive = !menuActive;
    });
});
