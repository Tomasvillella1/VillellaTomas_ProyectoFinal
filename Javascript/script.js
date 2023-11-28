let productosHTML = document.getElementById("sectionSubs");

let carrito = [];

const agregar = () =>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto se ha agregado al carrito',
        showConfirmButton: false,
        timer: 1000
     })
}

const encontradoItem = () =>{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El producto ya se encuentra en el carrito',
      })
}


const borrarCarrito = () =>{
    Swal.fire({
        title: 'Desea Vaciar todo el carrito?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Su carrito ha sido vaciado', '', 'success')
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else if (result.isDenied) {
          
        }
      })
}

const ComprarCarrito = () =>{
    Swal.fire({
        title: 'Desea continuar con la compra?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Su carrito ha sido confirmado', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Se ha cancelado la compra', '', 'error')
        }
      })
}

const CarritoCalc = () => {
    let carritoTotal = JSON.parse(localStorage.getItem("Carrito"));
    let total = 0;

    carritoTotal.forEach(item =>{
        total += item.Precio
    });

    let totalCar = document.getElementById("precio");
    let div = document.createElement("div");
    div.classList.add("totalPagar")
    div.innerHTML = `${total}`;
    precio.innerHTML = "";
    precio.append(div);
};

const filtrado = () => {
    fetch("./data.json")
    .then((response) => response.json())
    .then(data => {
        data.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("productos")
        div.style.backgroundImage = `url(${item.img})`;
        div.style.backgroundSize = "cover";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.opacity = "0.9";
        div.innerHTML = `
            <h2>${item.Nombre}</h2>
            <h4>$${item.Precio}</h4>
            <button id="boton${item.id}"><i class="fas fa-shopping-cart"></i></button>
        `
        sectionSubs.append(div);
        
        let boton = document.getElementById(`boton${item.id}`);

        const ejecutar = (id) =>{
            let encontrado = data.find(item => item.id === id);
            
            if (!carrito.includes(encontrado)) {
                carrito.push(item)
                localStorage.setItem("Carrito", JSON.stringify(carrito))
                agregar();
                CarritoCalc();
            } else {
                encontradoItem();
                localStorage.setItem("Carrito", JSON.stringify(carrito))
            }
        
        }
        boton.addEventListener("click", () => ejecutar(item.id)); 
    })})};

filtrado();

let boton1 = document.getElementById("Aplicaciones");
let boton2 = document.getElementById("Streaming");
let boton3 = document.getElementById("Gimnasios");
let boton4 = document.getElementById("Viajes");
let boton5 = document.getElementById("Todos");
let botonCarrito = document.getElementById("Carrito")

const Mostrar = async (categ) => {
    try {
        const response = await fetch("./data.json")
        const data = await response.json();

        let filtro = categ;
        let filtrados = data.filter( item => item.Categoria == filtro); //el status es una appServcio justo de esa api
        
        sectionSubs.innerHTML = "";

        filtrados.forEach(item =>{
                let div = document.createElement("div");
                div.classList.add("productos")
                div.style.backgroundImage = `url(${item.img})`;
                div.style.backgroundSize = "cover";
                div.style.backgroundRepeat = "no-repeat";
                div.style.backgroundPosition = "center";
                div.style.opacity = "0.9";
                div.innerHTML = `
                    <h2>${item.Nombre}</h2>
                    <h4>$${item.Precio}</h4>
                    <button id="boton${item.id}"><i class="fas fa-shopping-cart"></i></button>
                `
                sectionSubs.append(div);
                
                let boton = document.getElementById(`boton${item.id}`);
        
                const ejecutar = (id) =>{
                    let encontrado = data.find(item => item.id === id);
                    
                    if (!carrito.includes(encontrado)) {
                        carrito.push(item)
                        localStorage.setItem("Carrito", JSON.stringify(carrito))
                        agregar();
                        CarritoCalc();
                    } else {
                        encontradoItem();
                        localStorage.setItem("Carrito", JSON.stringify(carrito))
                    }
                
                }
                boton.addEventListener("click", () => ejecutar(item.id)); 
        })

    } catch (error) {
        console.log(error);
    }

};

boton1.addEventListener("click", () => Mostrar(1));
boton2.addEventListener("click", () => Mostrar(2));
boton3.addEventListener("click", () => Mostrar(3));
boton4.addEventListener("click", () => Mostrar(4));
boton5.addEventListener("click",() => location.reload()); 


botonCarrito.addEventListener("click", () => {
    carrito = JSON.parse(localStorage.getItem("Carrito"))
    carritoBarra.innerHTML = "";
    carrito.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("productosCarrito");
        div.style.backgroundImage = `url(${item.img})`;
        div.style.backgroundSize = "cover";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.opacity = "0.9";
        div.id = `${item.id}`;
        div.innerHTML = `
            <h2>${item.Nombre}</h2>SS
            <h4>$${item.Precio}</h4>
            <button id="boton${item.id}">Remover</button>`
        carritoBarra.append(div);

        let boton = document.getElementById(`boton${item.id}`);

        const borrar = (id) =>{
            carrito = JSON.parse(localStorage.getItem("Carrito"))
            let encontrado = carrito.find(item => item.id === id);

            let index = carrito.indexOf(encontrado);
            if (index !== -1) {
                carrito.splice(index, 1);

            };
            localStorage.setItem("Carrito", JSON.stringify(carrito));
            
            let remover = document.getElementById(id)
            remover.remove();

            CarritoCalc();
        };

        boton.addEventListener("click", () =>borrar(item.id));    

})});

const pushbar = new Pushbar({
    blur:true,
    overlay:true,
  });

  let botonRemC = document.getElementById("BotonRemC");
  botonRemC.addEventListener("click", () => {
      localStorage.clear();
      borrarCarrito();
    
  });

  let botonComprar = document.getElementById("BotonComprar");
  botonComprar.addEventListener("click", () => {
    ComprarCarrito();
    
  });

  const DateTime = luxon.DateTime;
  const now = DateTime.now().toLocaleString(DateTime.DATE_FULL)
  let fecha = document.getElementById("fecha");
  let divF = document.createElement("div");
  divF.classList.add("fecha1")
  divF.innerHTML =`
  <h4>${now}</h4>
  `
  fecha.append(divF)
  


 