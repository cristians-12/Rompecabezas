const imagenes = [
    'imagen-0','imagen-1','imagen-2',
    'imagen-3','imagen-4','imagen-5',
    'imagen-6','imagen-7','imagen-8',
]

const puzzle = document.querySelector('.puzzle');
const piezas = document.querySelector('.piezas');
const mensaje = document.querySelector('.msg');


while(imagenes.length){
    let i = Math.floor(Math.random()* imagenes.length);

    const div = document.createElement('div');
    div.className = "pieza";
    div.id = imagenes[i];
    div.draggable = true;
    div.style.backgroundImage = `url(img/${imagenes[i]}.png)`;
    piezas.appendChild(div);


    // console.log(i)
    imagenes.splice(i,1);
}

for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.className = 'puestos';
    div.dataset.id = i;
    puzzle.appendChild(div);
}


piezas.addEventListener('dragstart', e=>{
    e.dataTransfer.setData('id',e.target.id);
})

puzzle.addEventListener("dragover",e=>{
    e.preventDefault();
    e.target.classList.add('hover');
})

puzzle.addEventListener("dragleave",e=>{
    e.preventDefault();
    e.target.classList.remove('hover');

})

puzzle.addEventListener("drop",e=>{
    e.target.classList.remove('hover');

    const id = e.dataTransfer.getData('id');

    console.log(id)
    const valor = id.split('-')[1];

    console.log(e.target.dataset.id)

    if(e.target.dataset.id == valor){
        e.target.appendChild(document.getElementById(id))
    }
})

// Version mobile

let piezasTot = document.querySelectorAll('.pieza');
let piezaSelect = null;
// let observador = new IntersectionObserver();
let puestos = document.querySelectorAll(".puestos");
let idCuadros = [];
let puestosPos = [];
const cuadros = [];

function compararPos(id,posPieza,cuadros){
    // console.log(cuadros)
    console.log("posicion pieza:"+Math.floor(posPieza.x))
    console.log("posicion cuadro: "+cuadros[id].position.x)

    if(Math.floor(posPieza.left) === cuadros[id].position.left || posPieza.right === cuadros[id].position.right || posPieza.top === cuadros[id].position.top || posPieza.bottom === cuadros[id].position.bottom+1){
        console.log("Entra")
    }
}

puestos.forEach(puesto => { //Posiciones de lugares del rompecabezas
    const rect = puesto.getBoundingClientRect();
    const id = puesto.dataset.id;
    puestosPos.push(rect);
    idCuadros.push(id);
    cuadros.push({
        id:id,
        position:rect
        });
    });

piezasTot.forEach(piece =>{
    piece.addEventListener("touchstart",e=>{
        piezaSelect = e.target;
    })

    piece.addEventListener("touchend",e=>{
        let posFinal = piezaSelect.getBoundingClientRect();
        let id = piezaSelect.id.split('-')[1];
        compararPos(id,posFinal,cuadros);
        piezaSelect = null;
    })

    piece.addEventListener("touchmove",e=>{
        e.preventDefault();
        if(piezaSelect!= null){
            const tocar = e.touches[0];

            // piezaSelect.style.transform = `translate(${tocar.pageX}px, ${tocar.pageY}px)`;
            piezaSelect.style.left = `${tocar.pageX}px`;
            piezaSelect.style.top = `${tocar.pageY}px`;
            piezaSelect.style.position = 'absolute';
        }
    })
})