function AgregarUsuario() {

    var myModalCarga = new bootstrap.Modal(document.getElementById('ModalCarga'));
    myModalCarga.show();

    formData = new FormData();
    varnNombre = document.getElementById("txt_Nombre_CRUsu").value;
    var correo = document.getElementById("txt_Correo_CRUsu").value;
    var rol = document.getElementById("txt_Rol_CRUsu").value;

    if (correo == "" || cuerpo == "" || varnNombre == "" || varnNombre == "" ||
        rol == "" || rol == "") {
        document.getElementById("lbl_Alerta_CRUsu").innerHTML = "Completa todos los campos.";
        var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CRUsu'));
        myModal.show();
        return;
    }

    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("rol", rol);

    axios.post(urlServer + '/CR_Usuarios/AgregarUsuario', formData)
        .then(respuesta => {
            console.log(respuesta.data);
            if (respuesta.data == 'OK') {
                document.getElementById("lbl_Info_CRUsu").innerHTML = "Envío de correo exitoso";
                var myModal = new bootstrap.Modal(document.getElementById('ModalInfo_CRUsu'));
                myModal.show();
                document.getElementById("txt_Nombre_CRUsu").value = "";
                document.getElementById("txt_Correo_CRUsu").value = "";
                document.getElementById("txt_Rol_CRUsu").value = "";
            }
            else {
                document.getElementById("lbl_Alerta_CRUsu").innerHTML = "No se envio guardo el usuario";
                var myModal = new bootstrap.Modal(document.getElementById('ModalAlerta_CRUsu'));
                myModal.show();
            }
        }).catch((error) => { console.error(error) });
}