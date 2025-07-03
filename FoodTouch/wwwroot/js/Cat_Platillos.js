function AgregarPlatillo() {
    const nombre = document.getElementById("txt_Nombre_CatPlati").value.trim();
    const descripcion = document.getElementById("txt_Descr_CatPlati").value.trim();
    const precioG = document.getElementById("txt_PrecioG_CatPlati").value.trim();
    const precioCH = document.getElementById("txt_PrecioCH_CatPlati").value.trim();
    const idCategoria = document.getElementById("p_id_CatPlati").value;
    const estatus = document.getElementById("cmb_Estatus_CatPlati").value;
    const imagen = document.getElementById("txt_Imagen_CatPlati").files[0];

    // Validaciones
    if (!nombre || !descripcion || !precioG || !precioCH || !estatus || !imagen) {

        //Obtener instancia del modal ya abierto
        var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
        if (modalInstance) {
            modalInstance.hide();
        }
        document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Ningún campo debe estar vacio";
        var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
        myModal.show();

        return;
    }

    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    if (!decimalRegex.test(precioG) || !decimalRegex.test(precioCH)) {

        //Obtener instancia del modal ya abierto
        var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
        if (modalInstance) {
            modalInstance.hide();
        }
        document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Los precios deben ser números decimales positivos.";
        var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
        myModal.show();

        return;
    }

    const validExtension = /\.(jpg|jpeg)$/i;
    if (!validExtension.test(imagen.name)) {

        //Obtener instancia del modal ya abierto
        var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
        if (modalInstance) {
            modalInstance.hide();
        }
        document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "La imagen debe ser formato JPG.";
        var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
        myModal.show();

        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            if (img.width !== img.height) {
                //Obtener instancia del modal ya abierto
                var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
                if (modalInstance) {
                    modalInstance.hide();
                }
                document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "La imagen debe ser cuadrada (mismo alto y ancho).";
                var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
                myModal.show();

                return;
            }

            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            formData.append("precioG", precioG);
            formData.append("precioCH", precioCH);
            formData.append("idCategoria", idCategoria);
            formData.append("estatus", estatus);
            formData.append("imagen", imagen);

            axios.post(urlServer + 'CatPlatillos/AgregarPlatillo', formData)
                .then(respuesta => {
                    if (respuesta.data === 'OK') {

                        //Obtener instancia del modal ya abierto
                        var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
                        if (modalInstance) {
                            modalInstance.hide(); // Oculta el modal si ya está abierto
                        }

                        document.getElementById("lbl_Info_CatPlatillo").innerHTML = "Registro Exitoso";
                        var myModal = new bootstrap.Modal(document.getElementById('ModalInfo_CatPlatillo'));
                        myModal.show();

                        ActualizarTabla();
                        LimpiarDatos();
                    } else {
                        //Obtener instancia del modal ya abierto
                        var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
                        if (modalInstance) {
                            modalInstance.hide(); // Oculta el modal si ya está abierto
                        }

                        document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Error al guardar";
                        var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
                        myModal.show();
                    }
                }).catch(error => {
                    console.error(error);
                    MostrarAlerta("Error en la solicitud.");
                });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(imagen); // Dispara la validación de tamaño de imagen
}



//function AgregarPlatillo() {

//    formData = new FormData();
//    var nombre = document.getElementById("txt_Nombre_CatPlati").value;
//    var descripcion = document.getElementById("txt_Descr_CatPlati").value;
//    var precioG = document.getElementById("txt_PrecioG_CatPlati").value;
//    var precioCH = document.getElementById("txt_PrecioCH_CatPlati").value;
//    var idCategoria = document.getElementById("p_id_CatPlati").value;
//    var estatus = document.getElementById("cmb_Estatus_CatPlati").value;
//    var imagen = document.getElementById("txt_Imagen_CatPlati").files[0];




//    //VALIDACIONES_________________
//    // Validación general de campos vacíos
//    if (!nombre || !descripcion || !precioG || !precioCH || !estatus || !imagen) {
//        MostrarAlerta("Todos los campos son obligatorios.");
//        return;
//    }

//    // Validación de precios como números decimales positivos
//    const decimalRegex = /^\d+(\.\d{1,2})?$/;
//    if (!decimalRegex.test(precioG) || !decimalRegex.test(precioCH)) {
//        MostrarAlerta("Los precios deben ser números decimales positivos (ej. 10.50).");
//        return;
//    }

//    // Validar extensión de imagen
//    const validExtension = /\.(jpg|jpeg)$/i;
//    if (!validExtension.test(imagen.name)) {
//        MostrarAlerta("La imagen debe estar en formato JPG.");
//        return;
//    }

//    // Validar que la imagen sea cuadrada
//    const reader = new FileReader();
//    reader.onload = function (e) {
//        const img = new Image();
//        img.onload = function () {
//            if (img.width !== img.height) {
//                MostrarAlerta("La imagen debe ser cuadrada (mismo ancho y alto).");
//                return;
//            }

//    //_____________________________





//    //Validaciones

//    //if (correo == "" || cuerpo == "" || varnNombre == "" || varnNombre == "" ||
//    //    rol == "" || rol == "") {
//    //    document.getElementById("lbl_Alerta_CRUsu").innerHTML = "Completa todos los campos.";
//    //    var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CRUsu'));
//    //    myModal.show();
//    //    return;
//    //}

//    formData.append("nombre", nombre);
//    formData.append("descripcion", descripcion);
//    formData.append("precioG", precioG);
//    formData.append("precioCH", precioCH);
//    formData.append("idCategoria", idCategoria);
//    formData.append("estatus", estatus);
//    formData.append("imagen", imagen);

//    axios.post(urlServer + 'CatPlatillos/AgregarPlatillo', formData)
//        .then(respuesta => {
//            console.log(respuesta.data);
//            if (respuesta.data == 'OK') {

//                //Obtener instancia del modal ya abierto
//                var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo'));
//                if (modalInstance) {
//                    modalInstance.hide(); // Oculta el modal si ya está abierto
//                }

//                document.getElementById("lbl_Info_CatPlatillo").innerHTML = "Registro Exitoso";
//                var myModal = new bootstrap.Modal(document.getElementById('ModalInfo_CatPlatillo'));
//                myModal.show();

//                ActualizarTabla();
//                LimpiarDatos();


//            }
//            else {
//                document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Error al guardar";
//                var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
//                myModal.show();
//            }
//        }).catch((error) => { console.error(error) });

//}

function LimpiarDatos() {
    document.getElementById("txt_Nombre_CatPlati").value = "";
    document.getElementById("txt_Descr_CatPlati").value = "";
    document.getElementById("txt_PrecioG_CatPlati").value = "";
    document.getElementById("txt_PrecioCH_CatPlati").value = "";
    document.getElementById("cmb_Estatus_CatPlati").value = "ACTIVO";
}

function ActualizarTabla() {
    const formData = new FormData();
    const idCategoria = document.getElementById("p_id_CatPlati").value;
    formData.append("idCategoria", idCategoria);

    axios.post(urlServer + 'CatPlatillos/ObtenerPlatillos', formData)
        .then(respuesta => {
            const platillos = respuesta.data;
            console.log(platillos);

            if (Array.isArray(platillos)) {
                const tbody = document.getElementById("tbody_CatPlati");
                tbody.innerHTML = ""; //Limpiar solo el contenido del tbody

                platillos.forEach(plato => {
                    const fila = `
                        <tr>
                            <td>${plato.nombre}</td>
                            <td>${plato.descripcion}</td>
                            <td>${plato.precioG}</td>
                            <td>${plato.precioCH}</td>
                            <td>
                                <button type="button" class="border-0" style="background-color: #00FF0000;"
                                    onclick="MostrarImagen('${plato.imagenBase64}')">
                                    <i class="fa-solid fa-image fa-bounce" style="color: #1655c0;"></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="border-0" style="background-color: #00FF0000;"
                                    onclick="MostrarModalModificar('${plato.id}|${plato.nombre}|${plato.descripcion}|${plato.precioG}|${plato.precioCH}|${plato.estatus}|${plato.imagenBase64}')">
                                    <i class="fa-solid fa-pencil fa-bounce" style="color: #11ff00;"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    tbody.innerHTML += fila;
                });
            } else {
                console.warn("La respuesta no es una lista.");
            }
        })
        .catch(error => {
            console.error("Error al obtener platillos:", error);
        });
}

function MostrarModalModificar(datosConcatenados) {
    const datos = datosConcatenados.split('|');

    const id = datos[0];
    const nombre = datos[1];
    const descripcion = datos[2];
    const precioG = datos[3];
    const precioCH = datos[4];
    const estatus = datos[5];
    const imagenBase64 = datos[6];

    // Llenar campos del modal
    document.getElementById('txt_ModiNombre_CatPlati').value = nombre;
    document.getElementById('txt_ModiDescr_CatPlati').value = descripcion;
    document.getElementById('txt_ModiPrecioG_CatPlati').value = precioG;
    document.getElementById('txt_ModiPrecioCH_CatPlati').value = precioCH;
    document.getElementById('cmb_ModiEstatus_CatPlati').value = estatus;

    // Guardar Id
    document.getElementById('txt_ModiId_CatPlati').value = id;

    // Mostrar imagen en <img>
    const imgPreview = document.getElementById('img_ModiVistaPrevia');
    imgPreview.src = imagenBase64;
    imgPreview.style.display = imagenBase64 ? 'block' : 'none';

    // Mostrar modal
    var modal = new bootstrap.Modal(document.getElementById('ModalModificarPlatillo'));
    modal.show();
}

function ActualizarImagen() {
    const input = document.getElementById('txt_ModiImagen_CatPlati');
    const imgPreview = document.getElementById('img_ModiVistaPrevia');

    if (input.files && input.files[0]) {
        const file = input.files[0];

        //Creamos un lector de archivos del navegador
        const reader = new FileReader();

        reader.onload = function (e) {

            //     e.target.result contiene la imagen como data URL en base64
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        };

        reader.readAsDataURL(file); // convierte a base64 automáticamente
    }
}


//function ModificarPlatillo() {

//    formData = new FormData();
//    var nombre = document.getElementById("txt_ModiNombre_CatPlati").value;
//    var descripcion = document.getElementById("txt_ModiDescr_CatPlati").value;
//    var precioG = document.getElementById("txt_ModiPrecioG_CatPlati").value;
//    var precioCH = document.getElementById("txt_ModiPrecioCH_CatPlati").value;
//    var estatus = document.getElementById("cmb_ModiEstatus_CatPlati").value;

//    var id = document.getElementById("txt_ModiId_CatPlati").value;

//    // Obtener la imagen que se muestra en la vista previa (base64)
//    const imagenBase64 = document.getElementById('img_ModiVistaPrevia').src;


//    formData.append("id", id);
//    formData.append("nombre", nombre);
//    formData.append("descripcion", descripcion);
//    formData.append("precioG", precioG);
//    formData.append("precioCH", precioCH);
//    formData.append("estatus", estatus);
//    formData.append("imagenBase64", imagenBase64);

//    axios.post(urlServer + 'CatPlatillos/ModificarPlatillo', formData)
//        .then(respuesta => {
//            console.log(respuesta.data);
//            if (respuesta.data == 'OK') {

//                //Obtener instancia del modal ya abierto
//                var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalModificarPlatillo'));
//                if (modalInstance) {
//                    modalInstance.hide(); // Oculta el modal si ya está abierto
//                }

//                document.getElementById("lbl_Info_CatPlatillo").innerHTML = "Actualización Exitosa";
//                var myModal = new bootstrap.Modal(document.getElementById('ModalInfo_CatPlatillo'));
//                myModal.show();

//                ActualizarTabla();


//            }
//            else {
//                document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Error al guardar";
//                var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
//                myModal.show();
//            }
//        }).catch((error) => { console.error(error) });
//}

function ModificarPlatillo() {
    const id = document.getElementById("txt_ModiId_CatPlati").value;
    const nombre = document.getElementById("txt_ModiNombre_CatPlati").value.trim();
    const descripcion = document.getElementById("txt_ModiDescr_CatPlati").value.trim();
    const precioG = document.getElementById("txt_ModiPrecioG_CatPlati").value.trim();
    const precioCH = document.getElementById("txt_ModiPrecioCH_CatPlati").value.trim();
    const estatus = document.getElementById("cmb_ModiEstatus_CatPlati").value;
    const inputImagen = document.getElementById("txt_ModiImagen_CatPlati");
    const nuevaImagen = inputImagen.files.length > 0 ? inputImagen.files[0] : null;

    // Validación de campos vacíos
    if (!nombre || !descripcion || !precioG || !precioCH || !estatus) {
        CerrarModalYMostrarAlerta("Ningún campo debe estar vacío.");
        return;
    }

    // Validación de precios decimales
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    if (!decimalRegex.test(precioG) || !decimalRegex.test(precioCH)) {
        CerrarModalYMostrarAlerta("Los precios deben ser números decimales positivos.");
        return;
    }

    const enviarDatos = (imagenBase64) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precioG", precioG);
        formData.append("precioCH", precioCH);
        formData.append("estatus", estatus);
        formData.append("imagenBase64", imagenBase64);

        axios.post(urlServer + 'CatPlatillos/ModificarPlatillo', formData)
            .then(respuesta => {
                var modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalModificarPlatillo'));
                if (modalInstance) modalInstance.hide();

                if (respuesta.data === 'OK') {
                    document.getElementById("lbl_Info_CatPlatillo").innerHTML = "Actualización Exitosa";
                    new bootstrap.Modal(document.getElementById('ModalInfo_CatPlatillo')).show();
                    ActualizarTabla();
                    LimpiarDatos();
                } else {
                    MostrarAlerta("Error al guardar.");
                }
            })
            .catch(error => {
                console.error(error);
                MostrarAlerta("Error en la solicitud.");
            });
    };

    if (nuevaImagen) {
        const validExtension = /\.(jpg|jpeg)$/i;
        if (!validExtension.test(nuevaImagen.name)) {
            CerrarModalYMostrarAlerta("La imagen debe ser formato JPG.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                if (img.width !== img.height) {
                    CerrarModalYMostrarAlerta("La imagen debe ser cuadrada (mismo alto y ancho).");
                    return;
                }
                enviarDatos(e.target.result); // Imagen válida, enviar base64
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(nuevaImagen);
    } else {
        // Usar imagen actual de la vista previa
        const imagenBase64 = document.getElementById("img_ModiVistaPrevia").src;
        enviarDatos(imagenBase64);
    }
}

// Función para cerrar el modal de modificar y mostrar alerta
function CerrarModalYMostrarAlerta(mensaje) {
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalModificarPlatillo'));
    if (modalInstance) modalInstance.hide();
    document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = mensaje;
    new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo')).show();
}






function MostrarImagen(imagenBase64) {
    const imgElement = document.getElementById('img_ModalPlatillo');
    imgElement.src = imagenBase64;

    const modal = new bootstrap.Modal(document.getElementById('ModalImagenPlatillo'));
    modal.show();
        }

function ValidarCampos() {

}



document.addEventListener("DOMContentLoaded", function () {
    const inputBuscador = document.getElementById("txtBuscadorPlatillos");
    const filas = document.querySelectorAll("#tbody_CatPlati tr");

    inputBuscador.addEventListener("input", function () {
        const filtro = inputBuscador.value.toLowerCase();

        filas.forEach(fila => {

            const nombre = fila.children[0].textContent.toLowerCase(); // Columna 0 = Nombre del platillo
            const descripcion = fila.children[1].textContent.toLowerCase();
            const precioG = fila.children[2].textContent.toLowerCase();
            const precioCH = fila.children[3].textContent.toLowerCase();

            if (
                nombre.includes(filtro) ||
                descripcion.includes(filtro) ||
                precioG.includes(filtro) ||
                precioCH.includes(filtro)
            ) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });
    });
});