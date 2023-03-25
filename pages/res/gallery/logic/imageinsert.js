
function fillImages(id) {
    let element = document.getElementById(id);
    let relativePath = element.dataset.path;
    if (element == undefined || element == null) {
        throw new Error("Nem megfelelő azonosító lett megadva, vagy az elem nem létezik");
    }
    let elements = {};
    console.log(window.location.origin + '/res/images/gallery.json');
    fetch(window.location.origin + '/res/images/gallery.json')
        .then((response) => response.json())
        .then((elements) => {
            console.log(elements);
            let counter = 0;
            for (let path of elements.images) {
                counter++;
                let img = document.createElement("img");
                img.src = `${window.location.origin}/res/images/${path}`;
                img.alt = `Galéria kép #${counter}`;
                img.loading = "lazy";
                element.appendChild(img);
            }
        })
        .catch((err) => { throw new Error(err) });

}
