const imagenes = [
  "imagen-0",
  "imagen-1",
  "imagen-2",
  "imagen-3",
  "imagen-4",
  "imagen-5",
  "imagen-6",
  "imagen-7",
  "imagen-8",
];
const imagenes1 = ["p-0", "p-1", "p-2"];

const puzzle = document.querySelector(".puzzle");
const piezas = document.querySelector(".piezas");
const mensaje = document.querySelector(".msg");

const piezas1 = document.querySelector(".piezas1");
const imgs = document.querySelectorAll(".imgs");

while (imagenes1.length) {
  let i = Math.floor(Math.random() * imagenes1.length);
  const div = document.createElement("div");
  div.id = imagenes1[i];
  if (imagenes1[i].split("-")[1] == 0) {
    div.innerHTML = `<img src="img/${
      imagenes1[i]
    }.png" class='absolute w-[10%] h-fit pieza1' id='${
      imagenes1[i].split("-")[1]
    }'>`;
  } else {
    div.innerHTML = `<img src="img/${
      imagenes1[i]
    }.png" class='absolute w-[20%] h-fit pieza1' id='${
      imagenes1[i].split("-")[1]
    }'>`;
  }

  piezas1.appendChild(div);
  imagenes1.splice(i, 1);
}

// while (imagenes.length) {
//   let i = Math.floor(Math.random() * imagenes.length);

//   const div = document.createElement("div");
//   div.className = "pieza";
//   div.id = imagenes[i];
//   div.draggable = true;
//   div.style.backgroundImage = `url(img/${imagenes[i]}.png)`;
//   piezas.appendChild(div);
//   // console.log(i)
//   imagenes.splice(i, 1);
// }

// for (let i = 0; i < 9; i++) {
//   const div = document.createElement("div");
//   div.className = "puestos";
//   div.dataset.id = i;
//   puzzle.appendChild(div);
// }

// piezas.addEventListener("dragstart", (e) => {
//   e.dataTransfer.setData("id", e.target.id);
// });

// puzzle.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   e.target.classList.add("hover");
// });

// puzzle.addEventListener("dragleave", (e) => {
//   e.preventDefault();
//   e.target.classList.remove("hover");
// });

// puzzle.addEventListener("drop", (e) => {
//   e.target.classList.remove("hover");

//   const id = e.dataTransfer.getData("id");

//   //   console.log(id);
//   const valor = id.split("-")[1];

//   //   console.log(e.target.dataset.id);

//   if (e.target.dataset.id == valor) {
//     e.target.appendChild(document.getElementById(id));
//   }
// });

// ---------------Version mobile----------------------------------

let piezasTot = document.querySelectorAll(".pieza1");
let piezaSelect = null;

let puestos = document.querySelectorAll(".puestos1");
let idCuadros = [];
let puestosPos = [];
const cuadros = [];

function compararPos(id, posPieza, cuadros) {
  // console.log(cuadros)
  //funcion para comparar.
  if (
    posPieza.left >= cuadros[id].position.left - 20 &&
    posPieza.left <= cuadros[id].position.left + 20 &&
    posPieza.top >= cuadros[id].position.top - 20 &&
    posPieza.top <= cuadros[id].position.top + 20 &&
    posPieza.right >= cuadros[id].position.right - 20 &&
    posPieza.right <= cuadros[id].position.right + 20 &&
    posPieza.bottom >= cuadros[id].position.bottom - 20 &&
    posPieza.bottom <= cuadros[id].position.bottom + 20 
  ) {
    piezasTot.forEach((e, i) => {
      // if (e.id.split("-")[1] === id) {
      //   puestos[id].appendChild(piezasTot[i]);
      //   piezasTot[i].style.position = "initial";
      // }
      // console.log(e.id+"id")
      if(e.id === id){
        // console.log("Coincide en"+id)
        // puestos[id].appendChild(piezasTot[i]);
        imgs[id].classList.add("hola")
      }
    });
  } else {
    piezasTot.forEach((e, i) => {
      // if (e.id.split("-")[1] === id) {
      //   console.log("No coincide en " + i);
      //   piezasTot[i].style.position = "initial";
      // }
      if(e.id === id){
        // console.log("No coincide en "+id)
        piezasTot[i].style.top = "0";
        piezasTot[i].style.left = '0';
      }
    });
  }
}

imgs.forEach((puesto) => {
  //Posiciones de lugares del rompecabezas
  const rect = puesto.getBoundingClientRect();
  // const id = puesto.dataset.id;
  const id = puesto.id;
  // console.log(id)
  puestosPos.push(rect);
  idCuadros.push(id);
  cuadros.push({
    id: id,
    position: rect,
  });
});

piezasTot.forEach((piece) => {
  //Añadiendo eventos.
  piece.addEventListener("touchstart", (e) => {
    piezaSelect = e.target;
    // console.log(piezaSelect)
  });

  piece.addEventListener("touchend", (e) => {
    let posFinal = piezaSelect.getBoundingClientRect();
    // let id = piezaSelect.id.split("-")[1];
    let id = piezaSelect.id;
    // console.log(id);

    compararPos(id, posFinal, cuadros);
    piezaSelect = null;
    if (piezas1.childElementCount === 0) {
      alert("Ganaste!");
    }
  });

  piece.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (piezaSelect != null) {
      const tocar = e.touches[0];
      const offsetX = tocar.pageX - piezas1.getBoundingClientRect().left;
      const offsetY = tocar.pageY - piezas1.getBoundingClientRect().top;
      // console.log(tocar)
      piezaSelect.style.left = `${offsetX}px`;
      piezaSelect.style.top = `${offsetY}px`;
      // piezaSelect.style.position = "absolute";
    }
  });
});
