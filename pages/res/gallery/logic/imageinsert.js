
function randomize(array) {
    let maxIndex =  array.images.length;
    for(const i in array.images){
        index = Math.floor(Math.random() * maxIndex)
        if(index !== i){
            let x = array.images[i];
            array.images[i] = array.images[index];
            array.images[index] = x;
        }
    }
}

function fillImages(id) {
    let element = document.getElementById(id);
    if (element == undefined || element == null) {
        throw new Error("Nem megfelelő azonosító lett megadva, vagy az elem nem létezik");
    }
    console.log(window.location.origin + '/res/images/gallery.json');
    fetch(window.location.origin + '/res/images/gallery.json')
        .then((response) => response.json())
        .then((elements) => {
            console.log(elements);
            let counter = 0;
            randomize(elements);
            /**/ let i = 0;
            for (let path of elements.images) {
                counter++;
                let div = document.createElement("div");
                    div.className = "image-selection";
                let radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = "image-select";
                    radio.id = path.replace(/\//,"_").split('.')[0];
                    radio.tabIndex = -1;
                let label = document.createElement("label");
                    label.setAttribute("for",radio.id);
                    label.tabIndex = 0;
                let img = document.createElement("img");
                    img.src = `${window.location.origin}/res/images/${path}`;
                    img.alt = `Galéria kép #${counter}`;
                    img.title = path;
                    img.loading = "lazy";
                    label.appendChild(img);
                    div.appendChild(radio);
                    div.appendChild(label);
                    element.appendChild(div);
                /**/ if (++i > 6) return;
            }
        })
        .catch((err) => { throw new Error(err) });
}

document.addEventListener("DOMContentLoaded", () => fillImages("images"));
