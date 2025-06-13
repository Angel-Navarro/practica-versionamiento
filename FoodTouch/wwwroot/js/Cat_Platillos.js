function AgregarPlatillo() {

    formData = new FormData();
    var nombre = document.getElementById("txt_Nombre_CatPlati").value;
    var descricpion = document.getElementById("txt_Descr_CatPlati").value;
    var precioG = document.getElementById("txt_PrecioG_CatPlati").value;
    var precioCH = document.getElementById("txt_PrecioCH_CatPlati").value;
    var idCategoria = document.getElementById("p_id_CatPlati").value;
    var estatus = document.getElementById("cmb_Estatus_CatPlati").value;

    //Validaciones

    //if (correo == "" || cuerpo == "" || varnNombre == "" || varnNombre == "" ||
    //    rol == "" || rol == "") {
    //    document.getElementById("lbl_Alerta_CRUsu").innerHTML = "Completa todos los campos.";
    //    var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CRUsu'));
    //    myModal.show();
    //    return;
    //}

    formData.append("nombre", nombre);
    formData.append("descripcion", descricpion);
    formData.append("precioG", precioG);
    formData.append("precioCH", precioCH);
    formData.append("idCategoria", idCategoria);
    formData.append("estatus", estatus);

    axios.post(urlServer + '/CatPlatillos/AgregarPlatillo', formData)
        .then(respuesta => {
            console.log(respuesta.data);
            if (respuesta.data == 'OK') {
                document.getElementById("lbl_Info_CatPlatillo").innerHTML = "Registro Exitoso";
                var myModal = new bootstrap.Modal(document.getElementById('ModalInfo_CatPlatillo'));
                myModal.show();

                //Limpiar datos
                document.getElementById("txt_Nombre_CRUsu").value = "";
                document.getElementById("txt_Correo_CRUsu").value = "";
                document.getElementById("txt_Rol_CRUsu").value = "";

                document.getElementById("txt_Nombre_CatPlati").value = "";
                document.getElementById("txt_Descr_CatPlati").value = "";
                document.getElementById("txt_PrecioG_CatPlati").value = "";
                document.getElementById("txt_PrecioCH_CatPlati").value = "";
                document.getElementById("p_id_CatPlati").value = "";
                document.getElementById("cmb_Estatus_CatPlati").value = "";
            }
            else {
                document.getElementById("lbl_Alerta_CatPlatillo").innerHTML = "Error al guardar";
                var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CatPlatillo'));
                myModal.show();
            }
        }).catch((error) => { console.error(error) });
}