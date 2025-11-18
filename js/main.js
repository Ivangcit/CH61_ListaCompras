// botones
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
// campos de llenadpo
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
//const txtPrice=document.getElementById('Price');
//formulario
const formularioAgregar = document.getElementById("formAgregar");
//alerta de validaciones
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);
const alertValidaciones = document.getElementById("alertValidaciones");
//tablas
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
//variables
let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

//funciones
function validarCantidad(cantidad) {
  if (cantidad.length == 0) {
    return false;
  }
  if (isNaN(cantidad)) {
    return false;
  }
  if (Number(cantidad) <= 0) {
    return false;
  }

  return true;
} //validarCantidad

function getPrecio(precio) {
  // return Math.floor(Math.random()*100);
  return Math.round(Math.random() * 10000) / 100;
} //getprecio

//botones

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  formularioAgregar.reset();
});

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  //bandera
  let isValid = true;
  //Para que las alertas se reinicien en cada click y marque los errores adecuadamente
  txtName.style.border = "";
  txtNumber.style.border = "";
  //txtPrice.style.border="";
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";

  if (txtName.value.length < 3) {
    txtName.style.border = "solid thin red";
    alertValidacionesTexto.innerHTML =
      "<strong>El nombre del producto es incorrecto</strong><br/>";
    alertValidaciones.style.display = "block";
    isValid = false;
  }

  if (!validarCantidad(txtNumber.value)) {
    txtNumber.style.border = "solid thin red";
    alertValidacionesTexto.innerHTML +=
      "<strong>La cantidad no es correcta</strong><br/>";
    alertValidaciones.style.display = "block";
    isValid = false;
  }

  // if(!validarCantidad(txtPrice.value)){
  //     txtPrice.style.border="solid thin red";
  //     alertValidacionesTexto.innerHTML+="<strong>El precio no es correcto</strong>";
  //     alertValidaciones.style.display="block";
  //     isValid=false;
  // }

  if (isValid) {
    let precio = getPrecio();
    console.log(precio);
    cont++;
    totalEnProductos += Number(txtNumber.value);
    costoTotal += precio * Number(txtNumber.value);
    // precio unico mostrar
    //txtPrice.value=precio;
    //
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(costoTotal);

    let resumen = {
      cont: cont,
      totalEnProductos: totalEnProductos,
      costoTotal: costoTotal,
    };

    localStorage.setItem("resumen", JSON.stringify(resumen));

    let row = `<tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>    
        </tr>`;

    tablaListaCompras.insertAdjacentHTML("afterbegin", row);
    formularioAgregar.reset();
    txtName.focus();
  }
}); //boton agregar

window.addEventListener("load", function (event) {
  event.preventDefault();

  if (this.localStorage.getItem("resumen") != null) {
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    cont = resumen.cont;
    totalEnProductos = resumen.totalEnProductos;
    costoTotal = resumen.costoTotal;
  }

  contadorProductos.innerText = cont;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(costoTotal);
}); //window
