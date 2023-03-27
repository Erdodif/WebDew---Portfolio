
function randomize(array) {
    let maxIndex = array.images.length;
    for (const i in array.images) {
        index = Math.floor(Math.random() * maxIndex)
        if (index !== i) {
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
    fetch(window.location.origin + '/res/images/gallery.json')
        .then((response) => response.json())
        .then((elements) => {
            let counter = 0;
            randomize(elements);
            for (let path of elements.images) {
                counter++;
                let div = document.createElement("div");
                div.className = "image-selection";
                let radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "image-select";
                radio.id = path.replace(/\//, "_").split('.')[0];
                radio.tabIndex = -1;
                let label = document.createElement("label");
                label.setAttribute("for", radio.id);
                label.tabIndex = 0;
                let img = document.createElement("img");
                img.src = `${window.location.origin}/res/images/${path}`;
                img.alt = `Galéria kép #${counter}`;
                img.title = path;
                img.loading = "lazy";
                img.id = `gallery-image_${path.split('.')[0]}`;
                label.appendChild(img);
                div.appendChild(radio);
                div.appendChild(label);
                element.appendChild(div);
            }
            setInterval(()=>reindex(id),1500);
            window.matchMedia("(max-width:55rem)").addEventListener("change",(media) => media.matches ? reindex(id) : null);
            window.matchMedia("(max-width:33rem)").addEventListener("change",(media) => media.matches ? reindex(id) : null);
            window.matchMedia("(min-width:55rem)").addEventListener("change",(media) => media.matches ? reindex(id) : null);
        });
}

document.addEventListener("DOMContentLoaded", () => fillImages("images"));


function itemOrderGreater(left, right) {
    let leftRect = left.getBoundingClientRect();
    let rightRect = right.getBoundingClientRect();
    if (leftRect.y === rightRect.y) {
        return leftRect.x - rightRect.x;
    }
    return leftRect.y - rightRect.y;
}

function reindex(id) {
    let tabIndex = 1;
    let holder = document.getElementById(id);
    let indexes = [];
    if (holder.children.length > 9999) {
        throw new Error("This shouldn't happen, but you managed to have at least 10k images here, so tabindex won't work today...");
    }
    for (let i = 0; i < holder.children.length; i++) {
        indexes.push(i);
    }
    indexes.sort((a, b) => itemOrderGreater(holder.children[a], holder.children[b]));
    for (const index of indexes) {
        let element = holder.children[index];
        let label = Array.from(element.children).filter(item => item.tagName === "LABEL")[0];
        label.tabIndex = tabIndex;
        tabIndex++;
    }
}