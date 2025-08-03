// =====================================================
// SISTEMA DE COMANDAS - MESEROS
// JavaScript para manejo de comandas y platillos  de Angel Navarro
// =====================================================


// Variables globales para el manejo de comandas
let contadorComandas = 1; // Contador para asignar números a nuevas comandas
let platillosTemporales = []; // Array temporal para los platillos de la nueva comanda
let totalComandaTemporal = 0; // Total temporal de la nueva comanda


// FUNCIONES PARA DESPLEGUE DE COMANDAS ---------------------------------------------------------------

/**
 * Alterna el estado de una comanda (expandida/colapsada)
 * @param {HTMLElement} button - Botón toggle que se presionó
 */
function toggleComanda(button) {
    const content = button.closest('.comanda-card').querySelector('.comanda-content');
    const isCollapsed = content.classList.contains('collapsed');

    if (isCollapsed) {
        content.classList.remove('collapsed');
        button.classList.remove('collapsed');
    } else {
        content.classList.add('collapsed');
        button.classList.add('collapsed');
    }
}


// FUNCIONES PARA MANEJO DE NUEVA COMANDA --------------------------------------------------------------------


 //Muestra la comanda de agregar (la hace visible)
function mostrarComandaAgregar() {
    const comandaAgregar = document.getElementById('comandaAgregar');
    if (comandaAgregar) {
        comandaAgregar.style.display = 'block';
        // Animar la aparición
        comandaAgregar.style.opacity = '0';
        comandaAgregar.style.transform = 'translateY(20px)';
        setTimeout(() => {
            comandaAgregar.style.transition = 'all 0.3s ease';
            comandaAgregar.style.opacity = '1';
            comandaAgregar.style.transform = 'translateY(0)';
        }, 10);
    }
}

 //Oculta la comanda de agregar
function ocultarComandaAgregar() {
    const comandaAgregar = document.getElementById('comandaAgregar');
    if (comandaAgregar) {
        comandaAgregar.style.transition = 'all 0.3s ease';
        comandaAgregar.style.opacity = '0';
        comandaAgregar.style.transform = 'translateY(20px)';
        setTimeout(() => {
            comandaAgregar.style.display = 'none';
        }, 300);
    }

    // Limpiar datos temporales
    limpiarComandaTemporal();
}

 //Limpia todos los datos temporales de la nueva comanda
function limpiarComandaTemporal() {
    platillosTemporales = [];
    totalComandaTemporal = 0;
    actualizarListaPlatillosTemporales();
    actualizarTotalTemporal();
}

// FUNCIONES PARA MANEJO DEL MODAL DE PLATILLOS  ------------------------------------------------

 //Inicializa los eventos del modal de agregar platillo
function inicializarModalPlatillo() {
    const inputPlatillo = document.getElementById('cmb_PlatilloMod_ComMes');
    const inputCantidad = document.getElementById('txt_CantidadMod_ComMes');
    const selectTamano = document.getElementById('txt_TamanoMod_ComMes');

    // Evento cuando se selecciona un platillo
    if (inputPlatillo) {
        inputPlatillo.addEventListener('input', function () {
            const platilloSeleccionado = this.value;
            const option = document.querySelector(`#platillos-list option[value="${platilloSeleccionado}"]`);

            if (option) {
                const platilloId = option.getAttribute('data-id');
                document.getElementById('txt_IdPlatilloMod_ComMes').value = platilloId;

                // Aquí podrías hacer una llamada AJAX para obtener el precio
                // Por ahora usamos precios de ejemplo
                const precioBase = obtenerPrecioPlatillo(platilloId, selectTamano.value);
                document.getElementById('txt_PrecioUniMod_ComMes').value = precioBase;
                calcularTotalPlatillo();
            }
        });
    }

    // Evento cuando cambia la cantidad
    if (inputCantidad) {
        inputCantidad.addEventListener('input', calcularTotalPlatillo);
    }

    // Evento cuando cambia el tamaño
    if (selectTamano) {
        selectTamano.addEventListener('change', function () {
            const platilloId = document.getElementById('txt_IdPlatilloMod_ComMes').value;
            if (platilloId) {
                const precioBase = obtenerPrecioPlatillo(platilloId, this.value);
                document.getElementById('txt_PrecioUniMod_ComMes').value = precioBase;
                calcularTotalPlatillo();
            }
        });
    }
}

//Calcula el total del platillo basado en cantidad y precio unitario
function calcularTotalPlatillo() {
    const precioUnitario = parseFloat(document.getElementById('txt_PrecioUniMod_ComMes').value) || 0;
    const cantidad = parseInt(document.getElementById('txt_CantidadMod_ComMes').value) || 1;
    const total = precioUnitario * cantidad;

    document.getElementById('txt_PrecioTotMod_ComMes').value = total.toFixed(2);
}

//Obetner el precio de la BDD para reutilizar esta funcion
function obtenerPrecioPlatillo(platilloId, tamano) {
    // Convertir a string para asegurar la comparación de claves
    const id = platilloId.toString();
    const precio = preciosPlatillos.find(p => p.ID == id);

    if (!precio) return 100;

    if (tamano === "CHICO") return parseFloat(precio.precioCH);
    if (tamano === "GRANDE") return parseFloat(precio.precioG);

    return 100;
}

 //Limpia todos los campos del modal
function limpiarModalPlatillo() {
    document.getElementById('cmb_PlatilloMod_ComMes').value = '';
    document.getElementById('txt_IdPlatilloMod_ComMes').value = '';
    document.getElementById('txt_TamanoMod_ComMes').value = 'CHICO';
    document.getElementById('txt_CantidadMod_ComMes').value = '1';
    document.getElementById('txt_PrecioUniMod_ComMes').value = '';
    document.getElementById('txt_PrecioTotMod_ComMes').value = '';
    document.getElementById('txt_NotasMod_ComMes').value = '';
}

// FUNCIONES PARA AGREGAR PLATILLOS---------------------------------------------------------------

 //Agrega un platillo a la lista temporal de la nueva comanda
function agregarPlatilloTemporal() {
    // Obtener datos del modal
    const platilloNombre = document.getElementById('cmb_PlatilloMod_ComMes').value;
    const platilloId = document.getElementById('txt_IdPlatilloMod_ComMes').value;
    const tamano = document.getElementById('txt_TamanoMod_ComMes').value;
    const cantidad = parseInt(document.getElementById('txt_CantidadMod_ComMes').value) || 1;
    const precioUnitario = parseFloat(document.getElementById('txt_PrecioUniMod_ComMes').value) || 0;
    const precioTotal = parseFloat(document.getElementById('txt_PrecioTotMod_ComMes').value) || 0;
    const notas = document.getElementById('txt_NotasMod_ComMes').value;

    // Validaciones
    if (!platilloNombre || !platilloId) {
        alert('Por favor seleccione un platillo');
        return;
    }

    if (cantidad <= 0) {
        alert('La cantidad debe ser mayor a 0');
        return;
    }

    // Crear objeto platillo
    const platillo = {
        id: platilloId,
        nombre: platilloNombre,
        tamano: tamano,
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        precioTotal: precioTotal,
        notas: notas,
        estado: 'pending',
        tempId: Date.now() // ID temporal único
    };

    // Agregar a la lista temporal
    platillosTemporales.push(platillo);
    totalComandaTemporal += precioTotal;

    // Actualizar la interfaz
    actualizarListaPlatillosTemporales();
    actualizarTotalTemporal();

    // Limpiar y cerrar modal
    limpiarModalPlatillo();

    const modalElement = document.getElementById('ModalAgregarPlatillo_ComMes');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    // Si aún no existe la instancia (raro pero posible), créala:
    const modal = modalInstance || new bootstrap.Modal(modalElement);

    // Cerrar el modal
    modal.hide();

    console.log('Platillo agregado temporalmente:', platillo);
}

 //Actualiza la lista visual de platillos temporales
function actualizarListaPlatillosTemporales() {
    const listaContainer = document.querySelector('#comandaAgregar .platillos-list');
    if (!listaContainer) return;

    // Limpiar lista actual
    listaContainer.innerHTML = '';

    // Agregar cada platillo temporal
    platillosTemporales.forEach((platillo, index) => {
        const platilloHTML = crearElementoPlatilloTemporal(platillo, index);
        listaContainer.appendChild(platilloHTML);
    });

    // Si no hay platillos, mostrar mensaje
    if (platillosTemporales.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.className = 'text-center text-muted p-3';
        mensaje.innerHTML = '<i>No hay platillos agregados</i>';
        listaContainer.appendChild(mensaje);
    }
}

/**
 * Crea el elemento HTML para un platillo temporal
 * @param {Object} platillo - Datos del platillo
 * @param {number} index - Índice en el array
 * @returns {HTMLElement} Elemento DOM del platillo
 */
function crearElementoPlatilloTemporal(platillo, index) {
    const div = document.createElement('div');
    div.className = 'platillo-item';
    div.innerHTML = `
        <div class="status-badge pending">!</div>
        <div class="platillo-header">
            <div class="platillo-info">
                <div class="platillo-name">${platillo.nombre}</div>
                <div class="platillo-size ${platillo.tamano.toLowerCase()}">${platillo.tamano}</div>
            </div>
            <div class="platillo-quantity">${platillo.cantidad}</div>
        </div>
        <div class="platillo-notes">${platillo.notas || 'Sin notas especiales'}</div>
        <div class="container-fluid platillo-notes">
            <label>Precio Unitario $: </label>
            <label>${platillo.precioUnitario}</label>&nbsp;
            <label>Precio Total $: </label>
            <label>${platillo.precioTotal}</label>
        </div>
        <div class="platillo-actions">
            <button class="action-btn danger" onclick="eliminarPlatilloTemporal(${platillo.tempId})">Eliminar</button>
            <button class="action-btn primary" onclick="modificarPlatilloTemporal(${platillo.tempId})">Modificar</button>
        </div>
    `;
    return div;
}

/**
 * Elimina un platillo de la lista temporal
 * @param {number} tempId - ID temporal del platillo
 */
function eliminarPlatilloTemporal(tempId) {
    const index = platillosTemporales.findIndex(p => p.tempId === tempId);
    if (index > -1) {
        const platillo = platillosTemporales[index];
        totalComandaTemporal -= platillo.precioTotal;
        platillosTemporales.splice(index, 1);

        actualizarListaPlatillosTemporales();
        actualizarTotalTemporal();

        console.log('Platillo eliminado:', platillo);
    }
}

/**
 * Modifica un platillo temporal (abre el modal con sus datos)
 * @param {number} tempId - ID temporal del platillo
 */
function modificarPlatilloTemporal(tempId) {
    const platillo = platillosTemporales.find(p => p.tempId === tempId);
    if (!platillo) return;

    // Cargar datos en el modal
    document.getElementById('cmb_PlatilloMod_ComMes').value = platillo.nombre;
    document.getElementById('txt_IdPlatilloMod_ComMes').value = platillo.id;
    document.getElementById('txt_TamanoMod_ComMes').value = platillo.tamano;
    document.getElementById('txt_CantidadMod_ComMes').value = platillo.cantidad;
    document.getElementById('txt_PrecioUniMod_ComMes').value = platillo.precioUnitario;
    document.getElementById('txt_PrecioTotMod_ComMes').value = platillo.precioTotal;
    document.getElementById('txt_NotasMod_ComMes').value = platillo.notas;

    // Marcar que estamos editando
    document.getElementById('ModalAgregarPlatillo_ComMes').setAttribute('data-editing', tempId);

    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('ModalAgregarPlatillo_ComMes'));
    modal.show();
}

 //Actualiza el total de la comanda temporal
function actualizarTotalTemporal() {
    const totalElement = document.querySelector('#comandaAgregar .total-section');
    if (totalElement) {
        totalElement.textContent = `Total: $${totalComandaTemporal.toFixed(2)}`;
    }
}

// FUNCIONES PARA GUARDAR COMANDA----------------------------------------------------------------------

 //Guarda la nueva comanda enviando todos los datos al servidor
function guardarNuevaComanda() {
    if (platillosTemporales.length === 0) {
        alert('Debe agregar al menos un platillo a la comanda');
        return;
    }

    // Obtener datos del formulario
    const mesaSelect = document.querySelector('#comandaAgregar select');
    const mesaSeleccionada = mesaSelect ? mesaSelect.value : '';

    // Validar que se haya seleccionado una mesa
    if (!mesaSeleccionada) {
        alert('Por favor seleccione una mesa');
        return;
    }

    // Crear FormData con todos los datos de la comanda
    const formData = new FormData();

    // Datos básicos de la comanda
    formData.append("mesa", mesaSeleccionada);
    formData.append("mesero", "Mesero Actual"); // Deberías obtener esto del usuario logueado
    formData.append("total", totalComandaTemporal.toFixed(2));
    formData.append("fecha", new Date().toISOString());
    formData.append("cantidadPlatillos", platillosTemporales.length);

    // Agregar cada platillo como datos individuales
    platillosTemporales.forEach((platillo, index) => {
        formData.append(`platillo_${index}_id`, platillo.id);
        formData.append(`platillo_${index}_nombre`, platillo.nombre);
        formData.append(`platillo_${index}_tamano`, platillo.tamano);
        formData.append(`platillo_${index}_cantidad`, platillo.cantidad);
        formData.append(`platillo_${index}_precioUnitario`, platillo.precioUnitario);
        formData.append(`platillo_${index}_precioTotal`, platillo.precioTotal);
        formData.append(`platillo_${index}_notas`, platillo.notas || '');
        formData.append(`platillo_${index}_estado`, platillo.estado || 'pending');
    });

    // Alternativa: Enviar los platillos como JSON string
    // formData.append("platillosJson", JSON.stringify(platillosTemporales));

    console.log('Enviando comanda con los siguientes datos:');
    console.log('Mesa:', mesaSeleccionada);
    console.log('Total:', totalComandaTemporal);
    console.log('Platillos:', platillosTemporales);

    //// Mostrar indicador de carga
    //const btnGuardar = document.querySelector('button[onclick="guardarNuevaComanda()"]');
    //const textoOriginal = btnGuardar.textContent;
    //btnGuardar.textContent = 'Guardando...';
    //btnGuardar.disabled = true;

    // Mostrar indicador de carga
    const btnGuardar = document.querySelector('button[onclick="guardarNuevaComanda()"]');
    let textoOriginal = '';

    if (btnGuardar) {
        textoOriginal = btnGuardar.textContent;
        btnGuardar.textContent = 'Guardando...';
        btnGuardar.disabled = true;
    }

    // Enviar datos al servidor
    axios.post(urlServer + 'ComandasMeseros/AgregarNuevaComanda', formData)
        .then(respuesta => {
            if (respuesta.data === 'OK') {
                alert('Comanda guardada correctamente');
                ocultarComandaAgregar();

                // Opcional: recargar la lista de comandas o agregar la nueva comanda al DOM
                // location.reload(); // Recargar página completa
                // o mejor: agregarComandaAlDOM(comandaData); // Función personalizada

            } else {
                alert('Error al guardar la comanda: ' + respuesta.data);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        })
        .finally(() => {
            //// Restaurar botón
            //btnGuardar.textContent = textoOriginal;
            //btnGuardar.disabled = false;

            // Restaurar botón solo si existe
            if (btnGuardar) {
                btnGuardar.textContent = textoOriginal;
                btnGuardar.disabled = false;
            }
        });
}

/**
 * Versión alternativa enviando datos como JSON
 */
function guardarNuevaComandaJSON() {
    if (platillosTemporales.length === 0) {
        alert('Debe agregar al menos un platillo a la comanda');
        return;
    }

    // Obtener datos del formulario
    const mesaSelect = document.querySelector('#comandaAgregar select');
    const mesaSeleccionada = mesaSelect ? mesaSelect.value : '';

    if (!mesaSeleccionada) {
        alert('Por favor seleccione una mesa');
        return;
    }

    // Preparar objeto de datos
    const comandaData = {
        mesa: mesaSeleccionada,
        mesero: "Mesero Actual",
        total: totalComandaTemporal,
        fecha: new Date().toISOString(),
        platillos: platillosTemporales.map(platillo => ({
            id: platillo.id,
            nombre: platillo.nombre,
            tamano: platillo.tamano,
            cantidad: platillo.cantidad,
            precioUnitario: platillo.precioUnitario,
            precioTotal: platillo.precioTotal,
            notas: platillo.notas || '',
            estado: platillo.estado || 'pending'
        }))
    };

    const formData = new FormData();
    formData.append("comandaData", JSON.stringify(comandaData));

    console.log('Enviando comanda (JSON):', comandaData);

    // Enviar al servidor
    axios.post(urlServer + 'CatComandasMeseros/AgregarNuevaComandaJSON', formData)
        .then(respuesta => {
            if (respuesta.data === 'OK') {
                alert('Comanda guardada correctamente');
                ocultarComandaAgregar();
            } else {
                alert('Error al guardar la comanda: ' + respuesta.data);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        });
}

// FUNCIONES DE INICIALIZACIÓN----------------------------------------------------------

 //Inicializa todos los eventos cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    // Ocultar la comanda de agregar al cargar la página
    const comandaAgregar = document.getElementById('comandaAgregar');
    if (comandaAgregar) {
        comandaAgregar.style.display = 'none';
    }

    // Inicializar modal de platillos
    inicializarModalPlatillo();

    // Inicializar fecha de hoy
    const fechaInput = document.getElementById('txt_FechaComandas_ComMes');
    if (fechaInput) {
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        fechaInput.value = fechaHoy;
    }

    document.getElementById('txt_FechaComandas_ComMes').addEventListener('change', ActualizarComandasPorFecha);

    // Efectos para botones de acción
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Efecto de pulso
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            const action = this.textContent.toLowerCase();
            console.log(`Acción ejecutada: ${action}`);
        });
    });

    // Event listener para cuando se cierra el modal
    const modal = document.getElementById('ModalAgregarPlatillo_ComMes');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function () {
            // Si no estamos editando, limpiar el modal
            if (!this.getAttribute('data-editing')) {
                limpiarModalPlatillo();
            }
        });
    }
});

// FUNCIÓN PRINCIPAL PARA EL BOTÓN DE GUARDAR DEL MODAL---------------

 //Función principal que se llama desde el botón "Guardar" del modal
function AgregarPlatilloAModal() {
    const modal = document.getElementById('ModalAgregarPlatillo_ComMes');
    const editingId = modal.getAttribute('data-editing');

    if (editingId) {
        // Estamos modificando un platillo existente
        modificarPlatilloExistente(parseInt(editingId));
        modal.removeAttribute('data-editing');
    } else {
        // Estamos agregando un nuevo platillo
        agregarPlatilloTemporal();
    }
}

/**
 * Modifica un platillo existente en la lista temporal
 * @param {number} tempId - ID temporal del platillo a modificar
 */
function modificarPlatilloExistente(tempId) {
    const index = platillosTemporales.findIndex(p => p.tempId === tempId);
    if (index === -1) return;

    const platilloAnterior = platillosTemporales[index];

    // Obtener nuevos datos del modal
    const platilloNombre = document.getElementById('cmb_PlatilloMod_ComMes').value;
    const platilloId = document.getElementById('txt_IdPlatilloMod_ComMes').value;
    const tamano = document.getElementById('txt_TamanoMod_ComMes').value;
    const cantidad = parseInt(document.getElementById('txt_CantidadMod_ComMes').value) || 1;
    const precioUnitario = parseFloat(document.getElementById('txt_PrecioUniMod_ComMes').value) || 0;
    const precioTotal = parseFloat(document.getElementById('txt_PrecioTotMod_ComMes').value) || 0;
    const notas = document.getElementById('txt_NotasMod_ComMes').value;

    // Validaciones
    if (!platilloNombre || !platilloId) {
        alert('Por favor seleccione un platillo');
        return;
    }

    if (cantidad <= 0) {
        alert('La cantidad debe ser mayor a 0');
        return;
    }

    // Actualizar el total
    totalComandaTemporal = totalComandaTemporal - platilloAnterior.precioTotal + precioTotal;

    // Actualizar el platillo
    platillosTemporales[index] = {
        ...platilloAnterior,
        nombre: platilloNombre,
        id: platilloId,
        tamano: tamano,
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        precioTotal: precioTotal,
        notas: notas
    };

    // Actualizar interfaz
    actualizarListaPlatillosTemporales();
    actualizarTotalTemporal();

    // Limpiar y cerrar modal
    limpiarModalPlatillo();
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('ModalAgregarPlatillo_ComMes'));
    if (modalInstance) {
        modalInstance.hide();
    }

    console.log('Platillo modificado:', platillosTemporales[index]);
}







// ========================================================================================================
//Obtener comandas por input de fecha
// ========================================================================================================



// =====================================================
// FUNCIÓN PARA ACTUALIZAR COMANDAS POR FECHA
// =====================================================

///**
// * Actualiza las comandas mostradas según la fecha seleccionada
// */
//function ActualizarComandasPorFecha() {
//    const fecha = document.getElementById("txt_FechaComandas_ComMes").value.trim();

//    if (!fecha) {
//        alert('Por favor seleccione una fecha válida');
//        return;
//    }

//    // Mostrar indicador de carga
//    mostrarIndicadorCarga();

//    // IMPORTANTE: Usar GET con parámetros en la URL, no FormData
//    const url = `${urlServer}ComandasMeseros/ObtenerComandasDependeDia?fecha=${encodeURIComponent(fecha)}`;

//    axios.get(url)
//        .then(respuesta => {
//            console.log('Respuesta del servidor:', respuesta.data);

//            // La respuesta debería ser un array de comandas, no 'OK'
//            if (Array.isArray(respuesta.data)) {
//                // Actualizar las comandas en el DOM
//                actualizarComandasEnDOM(respuesta.data);
//                console.log(`Se cargaron ${respuesta.data.length} comandas para la fecha ${fecha}`);
//            } else {
//                // Si no es un array, verificar si hay un mensaje de error
//                console.warn('Respuesta inesperada:', respuesta.data);
//                alert('No se encontraron comandas para la fecha seleccionada');
//                limpiarComandasDOM();
//            }
//        })
//        .catch(error => {
//            console.error('Error al obtener comandas:', error);
//            alert('Error al cargar las comandas. Por favor intente nuevamente.');
//            limpiarComandasDOM();
//        })
//        .finally(() => {
//            // Ocultar indicador de carga
//            ocultarIndicadorCarga();
//        });
//}









// =====================================================
// FUNCIONES PARA ACTUALIZAR DOM DE COMANDAS
// =====================================================

/**
 * Actualiza las comandas mostradas según la fecha seleccionada
 * VERSIÓN MEJORADA de tu función existente
 */
function ActualizarComandasPorFecha() {
    const fecha = document.getElementById("txt_FechaComandas_ComMes").value.trim();

    if (!fecha) {
        alert('Por favor seleccione una fecha válida');
        return;
    }

    // Mostrar indicador de carga
    mostrarIndicadorCarga();

    // IMPORTANTE: Usar GET con parámetros en la URL, no FormData
    const url = `${urlServer}ComandasMeseros/ObtenerComandasDependeDia?fecha=${encodeURIComponent(fecha)}`;

    axios.get(url)
        .then(respuesta => {
            console.log('Respuesta del servidor:', respuesta.data);

            // La respuesta debería ser un array de comandas
            if (Array.isArray(respuesta.data)) {
                // Actualizar las comandas en el DOM
                actualizarComandasEnDOM(respuesta.data);
                console.log(`Se cargaron ${respuesta.data.length} comandas para la fecha ${fecha}`);
            } else if (respuesta.data === 'Sin comandas' || respuesta.data === 'No hay comandas') {
                // Mensaje específico cuando no hay comandas
                actualizarComandasEnDOM([]);
                console.log('No hay comandas para la fecha seleccionada');
            } else {
                // Si no es un array, verificar si hay un mensaje de error
                console.warn('Respuesta inesperada:', respuesta.data);
                actualizarComandasEnDOM([]);
            }
        })
        .catch(error => {
            console.error('Error al obtener comandas:', error);
            alert('Error al cargar las comandas. Por favor intente nuevamente.');
            limpiarComandasDOM();
            mostrarMensajeNoComandasEncontradas();
        })
        .finally(() => {
            // Ocultar indicador de carga
            ocultarIndicadorCarga();
        });
}

// =====================================================
// FUNCIONES PARA ACTUALIZAR DOM DE COMANDAS
// =====================================================

/**
 * Actualiza las comandas en el DOM con nuevos datos
 * @param {Array} comandas - Array de comandas del servidor
 */
function actualizarComandasEnDOM(comandas) {
    // Limpiar comandas actuales
    limpiarComandasDOM();

    // Si no hay comandas, mostrar mensaje
    if (!comandas || comandas.length === 0) {
        mostrarMensajeNoComandasEncontradas();
        return;
    }

    // Crear y agregar cada comanda al DOM
    const container = obtenerContainerComandas();
    comandas.forEach(comanda => {
        const comandaElement = crearElementoComanda(comanda);
        container.appendChild(comandaElement);
    });

    console.log(`Se agregaron ${comandas.length} comandas al DOM`);
}

/**
 * Limpia todas las comandas existentes del DOM (excepto la de agregar)
 */
function limpiarComandasDOM() {
    const container = obtenerContainerComandas();

    // Obtener todas las comandas existentes (excepto la de agregar y el botón)
    const comandasExistentes = container.querySelectorAll('.comanda-card:not(#comandaAgregar)');

    comandasExistentes.forEach(comanda => {
        // Animar salida antes de eliminar
        comanda.style.transition = 'all 0.3s ease';
        comanda.style.opacity = '0';
        comanda.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            if (comanda.parentNode) {
                comanda.parentNode.removeChild(comanda);
            }
        }, 300);
    });

    // También limpiar mensaje de "no comandas" si existe
    const mensajeNoComandas = container.querySelector('.no-comandas');
    if (mensajeNoComandas) {
        mensajeNoComandas.remove();
    }
}

/**
 * Obtiene el contenedor principal de comandas
 * @returns {HTMLElement} Contenedor de comandas
 */
function obtenerContainerComandas() {
    const container = document.querySelector('.container');
    if (!container) {
        console.error('No se encontró el contenedor de comandas');
        return document.body; // Fallback
    }
    return container;
}

/**
 * Muestra mensaje cuando no se encuentran comandas
 */
function mostrarMensajeNoComandasEncontradas() {
    const container = obtenerContainerComandas();

    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'no-comandas';
    mensajeDiv.innerHTML = '<p>No hay comandas para la fecha seleccionada.</p>';

    // Insertar antes del botón de agregar comanda
    const botonAgregar = container.querySelector('.text-center');
    if (botonAgregar) {
        container.insertBefore(mensajeDiv, botonAgregar);
    } else {
        container.appendChild(mensajeDiv);
    }
}

/**
 * Crea el elemento HTML para una comanda
 * @param {Object} comanda - Datos de la comanda
 * @returns {HTMLElement} Elemento DOM de la comanda
 */
function crearElementoComanda(comanda) {
    const comandaDiv = document.createElement('div');
    comandaDiv.className = 'comanda-card';

    // Formatear fecha/hora
    const fechaHoraFormateada = formatearFechaHora(comanda.fechaHora);

    // Calcular total de platillos
    const totalComanda = comanda.listaPlatillos ?
        comanda.listaPlatillos.reduce((sum, p) => sum + (p.precioTotal || 0), 0) : 0;

    comandaDiv.innerHTML = `
        <div class="comanda-header ${(comanda.estado || 'pending').toLowerCase()}">
            <div class="comanda-info">
                <div class="comanda-number">
                    <button class="toggle-btn collapsed" onclick="toggleComanda(this)">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z" />
                        </svg>
                    </button>
                    <div id="lbl_PlatEstatus_ComMes_${comanda.ID}">
                        ${obtenerIconoEstado(comanda.estado)}
                    </div>
                    Comanda #${comanda.ID.toString().padStart(3, '0')}
                    <input hidden id="txt_PlatId_ComMes_${comanda.ID}" value="${comanda.ID}" />
                </div>
                <div class="comanda-time">${fechaHoraFormateada}</div>
            </div>
            <div class="comanda-details">
                <div>Mesa ${comanda.mesa || 'N/A'}</div>
                <div>${comanda.usuarioNombre || 'Usuario'}</div>
            </div>
        </div>

        <div class="comanda-content collapsed">
            <div class="comanda-actions">
                <!-- Aquí puedes agregar botones de acción si los necesitas -->
            </div>

            <div class="platillos-list">
                ${crearListaPlatillosHTML(comanda.listaPlatillos)}
            </div>

            <div class="total-section">
                Total: $${totalComanda.toFixed(2)}
            </div>
        </div>
    `;

    return comandaDiv;
}

/**
 * Crea el HTML para la lista de platillos
 * @param {Array} platillos - Array de platillos
 * @returns {string} HTML de los platillos
 */
function crearListaPlatillosHTML(platillos) {
    if (!platillos || platillos.length === 0) {
        return '<div class="platillo-item"><div class="platillo-notes">No hay platillos en esta comanda</div></div>';
    }

    return platillos.map(platillo => `
        <div class="platillo-item">
            <div class="status-badge ${(platillo.estado || 'pending').toLowerCase()}">
                ${obtenerTextoEstadoPlatillo(platillo.estado)}
            </div>
            <div class="platillo-header">
                <div class="platillo-info">
                    <div class="platillo-name">${platillo.nombrePlatillo || platillo.nombre || 'Platillo'}</div>
                    <div class="platillo-size ${(platillo.tamano || 'medio').toLowerCase()}">${platillo.tamano || 'MEDIO'}</div>
                </div>
                <div class="platillo-quantity">${platillo.cantidad || 1}</div>
            </div>
            ${platillo.notas ? `<div class="platillo-notes">${platillo.notas}</div>` : ''}
            <div class="container-fluid platillo-notes">
                <label>Precio Unitario $: </label>
                <label>${((platillo.precioTotal || 0) / (platillo.cantidad || 1)).toFixed(2)}</label>&nbsp;
                <label>Precio Total $: </label>
                <label>${(platillo.precioTotal || 0).toFixed(2)}</label>
            </div>
            <div class="platillo-actions">
                <!-- Aquí puedes agregar botones de acción para platillos si los necesitas -->
            </div>
        </div>
    `).join('');
}

/**
 * Obtiene el ícono correspondiente al estado de la comanda
 * @param {string} estado - Estado de la comanda
 * @returns {string} HTML del ícono
 */
function obtenerIconoEstado(estado) {
    const estadoLower = (estado || 'pending').toLowerCase();

    switch (estadoLower) {
        case 'pending':
            return '<i class="fa-solid fa-circle-check fa-lg" style="color: #d80e0e;"></i>';
        case 'completed':
            return '<i class="fa-solid fa-circle-check fa-lg" style="color: #28a745;"></i>';
        case 'in-progress':
            return '<i class="fa-solid fa-clock fa-lg" style="color: #ffc107;"></i>';
        default:
            return '<i class="fa-solid fa-circle-check fa-lg" style="color: #d80e0e;"></i>';
    }
}

/**
 * Obtiene el texto correspondiente al estado del platillo
 * @param {string} estado - Estado del platillo
 * @returns {string} Texto del estado
 */
function obtenerTextoEstadoPlatillo(estado) {
    const estadoLower = (estado || 'pending').toLowerCase();

    switch (estadoLower) {
        case 'pending':
            return '!';
        case 'completed':
            return '✓';
        case 'in-progress':
            return '⏱';
        default:
            return '!';
    }
}

/**
 * Formatea la fecha y hora para mostrar
 * @param {string} fechaHora - Fecha/hora del servidor
 * @returns {string} Hora formateada (HH:MM)
 */
function formatearFechaHora(fechaHora) {
    if (!fechaHora) return '--:--';

    try {
        const fecha = new Date(fechaHora);
        if (isNaN(fecha.getTime())) {
            // Si no se puede parsear como Date, intentar extraer solo la hora
            const horaMatch = fechaHora.match(/(\d{1,2}):(\d{2})/);
            return horaMatch ? `${horaMatch[1].padStart(2, '0')}:${horaMatch[2]}` : fechaHora;
        }
        return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
        console.warn('Error al formatear fecha/hora:', fechaHora, error);
        return fechaHora;
    }
}

/**
 * Muestra un indicador de carga
 */
function mostrarIndicadorCarga() {
    // Crear overlay de carga si no existe
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        loadingOverlay.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="margin-bottom: 10px;">Cargando comandas...</div>
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Agregar animación de spin
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    loadingOverlay.style.display = 'flex';
}

/**
 * Oculta el indicador de carga
 */
function ocultarIndicadorCarga() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}




