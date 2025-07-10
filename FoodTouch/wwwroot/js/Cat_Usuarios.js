// Codigo de Angel Navarro Cat_Usuarios.js

function AgregarUsuario() {
    const nombre = document.getElementById("txt_Nombre_CatUsu").value.trim();
    const correo = document.getElementById("txt_Correo_CatUsu").value.trim();
    const clave = document.getElementById("txt_Clave_CatUsu").value.trim();
    const rol = document.getElementById("cmb_Rol_CatUsu").value;

    if (!nombre || !correo || !clave || !rol) {
        MostrarAlerta("Ningún campo debe estar vacío.");
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("clave", clave);
    formData.append("rol", rol);

    axios.post(urlServer + 'CatUsuarios/AgregarUsuario', formData)
        .then(respuesta => {
            if (respuesta.data === 'OK') {
                OcultarModal("ModalAgregarUsuario");
                MostrarInfo("Registro Exitoso");
                ActualizarTablaUsuarios();
                LimpiarCamposUsuario();
            } else {
                MostrarAlerta("Error al guardar.");
            }
        }).catch(error => {
            console.error(error);
            MostrarAlerta("Error en la solicitud.");
        });
}

function ModificarUsuario() {
    const id = document.getElementById("txt_ModiId_CatUsu").value;
    const nombre = document.getElementById("txt_ModiNombre_CatUsu").value.trim();
    const correo = document.getElementById("txt_ModiCorreo_CatUsu").value.trim();
    const clave = document.getElementById("txt_ModiClave_CatUsu").value.trim();
    const rol = document.getElementById("cmb_ModiRol_CatUsu").value;

    if (!nombre || !correo || !clave || !rol) {
        MostrarAlerta("Ningún campo debe estar vacío.");
        return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("clave", clave);
    formData.append("rol", rol);

    axios.post(urlServer + 'CatUsuarios/ModificarUsuario', formData)
        .then(respuesta => {
            OcultarModal("ModalModificarUsuario");
            if (respuesta.data === 'OK') {
                MostrarInfo("Actualización Exitosa");
                ActualizarTablaUsuarios();
            } else {
                MostrarAlerta("Error al guardar.");
            }
        }).catch(error => {
            console.error(error);
            MostrarAlerta("Error en la solicitud.");
        });
}

function MostrarModalModificarUsuario(datosConcatenados) {
    const [id, nombre, correo, clave, rol] = datosConcatenados.split('|');
    document.getElementById("txt_ModiId_CatUsu").value = id;
    document.getElementById("txt_ModiNombre_CatUsu").value = nombre;
    document.getElementById("txt_ModiCorreo_CatUsu").value = correo;
    document.getElementById("txt_ModiClave_CatUsu").value = clave;
    document.getElementById("cmb_ModiRol_CatUsu").value = rol;

    new bootstrap.Modal(document.getElementById('ModalModificarUsuario')).show();
}

function LimpiarCamposUsuario() {
    document.getElementById("txt_Nombre_CatUsu").value = "";
    document.getElementById("txt_Correo_CatUsu").value = "";
    document.getElementById("txt_Clave_CatUsu").value = "";
    document.getElementById("cmb_Rol_CatUsu").value = "Administrador";
}

function MostrarAlerta(mensaje) {
    document.getElementById("lbl_Alerta_CatUsu").innerText = mensaje;
    new bootstrap.Modal(document.getElementById('ModalAlerta_CatUsu')).show();
}

function MostrarInfo(mensaje) {
    document.getElementById("lbl_Info_CatUsu").innerText = mensaje;
    new bootstrap.Modal(document.getElementById('ModalInfo_CatUsu')).show();
}

function OcultarModal(idModal) {
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById(idModal));
    if (modalInstance) modalInstance.hide();
}

function ActualizarTablaUsuarios() {
    axios.get(urlServer + 'CatUsuarios/ObtenerUsuarios')
        .then(respuesta => {
            const usuarios = respuesta.data;
            const tbody = document.getElementById("tbody_CatUsu");
            tbody.innerHTML = "";

            usuarios.forEach(usuario => {
                const fila = `
                    <tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.correo}</td>
                        <td>••••••••</td>
                        <td>${usuario.rol}</td>
                        <td>
                            <button type="button" class="border-0" style="background-color: #00FF0000;"
                                onclick="MostrarModalModificarUsuario('${usuario.id}|${usuario.nombre}|${usuario.correo}|${usuario.clave}|${usuario.rol}')">
                                <i class="fa-solid fa-pencil fa-bounce" style="color: #11ff00;"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => console.error("Error al obtener usuarios:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    const inputBuscador = document.getElementById("txtBuscadorUsuarios_CatUsu");
    inputBuscador.addEventListener("input", function () {
        const filtro = inputBuscador.value.toLowerCase();
        const filas = document.querySelectorAll("#tbody_CatUsu tr");

        filas.forEach(fila => {
            const nombre = fila.children[0].textContent.toLowerCase();
            const correo = fila.children[1].textContent.toLowerCase();

            if (nombre.includes(filtro) || correo.includes(filtro)) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });
    });
});
