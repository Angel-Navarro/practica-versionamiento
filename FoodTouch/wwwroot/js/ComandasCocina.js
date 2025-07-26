// COMANDAS COCINA - SISTEMA DE ESTADOS
// =====================================================

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









/**
 * Cambia el estado de un platillo individual
 * @param {number} platilloId - ID del platillo
 * @param {number} comandaId - ID de la comanda
 */
function togglePlatilloStatus(platilloId, comandaId) {
    console.log('Cambiando estado del platillo:', platilloId, 'de la comanda:', comandaId);

    const platilloElement = document.querySelector(`[data-platillo-id="${platilloId}"]`);
    if (!platilloElement) {
        console.error('No se encontró el platillo con ID:', platilloId);
        return;
    }

    const statusButton = platilloElement.querySelector('.platillo-status');
    const statusBadge = platilloElement.querySelector('.status-badge');
    const statusText = statusButton.querySelector('.status-text');
    const statusIcon = statusButton.querySelector('i');

    if (!statusButton || !statusBadge || !statusText || !statusIcon) {
        console.error('No se encontraron todos los elementos necesarios para el platillo:', platilloId);
        return;
    }

    const currentStatus = statusButton.getAttribute('data-status');
    let newStatus = '';

    // Determinar el siguiente estado
    switch (currentStatus) {
        case 'pending':
            newStatus = 'in-progress';
            break;
        case 'in-progress':
            newStatus = 'completed';
            break;
        case 'completed':
            // Ya está terminado, no hacer nada
            console.log('El platillo ya está completado');
            return;
        default:
            newStatus = 'pending';
    }

    console.log('Cambiando de', currentStatus, 'a', newStatus);

    // Actualizar visualmente el platillo
    updatePlatilloVisualStatus(platilloElement, statusButton, statusBadge, statusText, statusIcon, newStatus);

    // Verificar si todos los platillos están completados
    checkComandaCompletion(comandaId);

    // Aquí puedes agregar la llamada AJAX si es necesario
    // updatePlatilloStatusOnServer(platilloId, newStatus);
}

//Actualiza el estado visual de un platillo
function updatePlatilloVisualStatus(platilloElement, statusButton, statusBadge, statusText, statusIcon, newStatus) {
    // Agregar animación
    platilloElement.classList.add('status-changing');

    // Actualizar atributos
    statusButton.setAttribute('data-status', newStatus);
    platilloElement.setAttribute('data-status', newStatus);

    // Remover clases de estado anteriores
    statusButton.classList.remove('pending', 'in-progress', 'completed');
    statusBadge.classList.remove('pending', 'in-progress', 'completed');

    // Agregar nueva clase de estado
    statusButton.classList.add(newStatus);
    statusBadge.classList.add(newStatus);

    // Actualizar contenido según el estado
    switch (newStatus) {
        case 'pending':
            statusBadge.textContent = '⏸';
            statusText.textContent = 'Iniciar Preparación';
            statusIcon.className = 'fas fa-play-circle';
            statusButton.style.cursor = 'pointer';
            break;
        case 'in-progress':
            statusBadge.textContent = '🔥';
            statusText.textContent = 'Marcar Listo';
            statusIcon.className = 'fas fa-check-circle';
            statusButton.style.cursor = 'pointer';
            break;
        case 'completed':
            statusBadge.textContent = '✓';
            statusText.textContent = 'Completado';
            statusIcon.className = 'fas fa-medal';
            statusButton.style.cursor = 'not-allowed';
            break;
    }

    // Remover animación después de completarla
    setTimeout(() => {
        platilloElement.classList.remove('status-changing');
    }, 300);
}

/**
 * Verifica si todos los platillos de una comanda están completados
 * @param {number} comandaId - ID de la comanda
 */
function checkComandaCompletion(comandaId) {
    console.log('Verificando completitud de la comanda:', comandaId);

    const comandaCard = document.querySelector(`[data-comanda-id="${comandaId}"]`);
    if (!comandaCard) {
        console.error('No se encontró la comanda con ID:', comandaId);
        return;
    }

    const comandaCardElement = comandaCard.closest('.comanda-card');
    const platillos = comandaCardElement.querySelectorAll('.platillo-status');

    let allCompleted = true;
    let anyInProgress = false;
    let totalPlatillos = platillos.length;
    let completedCount = 0;

    platillos.forEach(platillo => {
        const status = platillo.getAttribute('data-status');
        if (status !== 'completed') {
            allCompleted = false;
        } else {
            completedCount++;
        }
        if (status === 'in-progress') {
            anyInProgress = true;
        }
    });

    // Determinar el estado de la comanda
    let comandaStatus = 'pending';
    if (allCompleted) {
        comandaStatus = 'completed';
    } else if (anyInProgress) {
        comandaStatus = 'in-progress';
    }

    console.log('Estado de la comanda:', comandaStatus, `(${completedCount}/${totalPlatillos} completados)`);

    // Actualizar el estado visual de la comanda
    updateComandaVisualStatus(comandaCardElement, comandaStatus);

    // Actualizar barra de progreso
    updateProgressBar(comandaCardElement, platillos);
}

/**
 * Actualiza el estado visual de toda la comanda
 */
function updateComandaVisualStatus(comandaCard, newStatus) {
    const comandaHeader = comandaCard.querySelector('.comanda-header');
    const comandaId = comandaCard.querySelector('[data-comanda-id]').getAttribute('data-comanda-id');
    const comandaStatusIcon = comandaCard.querySelector(`#lbl_PlatEstatus_ComMes_${comandaId}`);
    const comandaStatusBtn = comandaCard.querySelector('.comanda-status');

    // Remover clases de estado anteriores del header
    comandaHeader.classList.remove('pending', 'in-progress', 'completed');
    comandaHeader.classList.add(newStatus);

    // Actualizar botón de estado de comanda si existe
    if (comandaStatusBtn) {
        comandaStatusBtn.classList.remove('pending', 'in-progress', 'completed');
        comandaStatusBtn.classList.add(newStatus);
        comandaStatusBtn.setAttribute('data-status', newStatus);

        // Actualizar ícono del botón
        const btnIcon = comandaStatusBtn.querySelector('i');
        if (btnIcon) {
            switch (newStatus) {
                case 'pending':
                    btnIcon.className = 'fas fa-utensils';
                    comandaStatusBtn.style.cursor = 'pointer';
                    break;
                case 'in-progress':
                    btnIcon.className = 'fas fa-fire';
                    comandaStatusBtn.style.cursor = 'pointer';
                    break;
                case 'completed':
                    btnIcon.className = 'fas fa-crown';
                    comandaStatusBtn.style.cursor = 'not-allowed';
                    break;
            }
        }
    }

    // Actualizar ícono de estado en el header
    if (comandaStatusIcon) {
        switch (newStatus) {
            case 'pending':
                comandaStatusIcon.innerHTML = '<i class="fa-solid fa-circle-pause fa-lg" style="color: #ffc107;"></i>';
                break;
            case 'in-progress':
                comandaStatusIcon.innerHTML = '<i class="fa-solid fa-clock fa-lg" style="color: #ff9800;"></i>';
                break;
            case 'completed':
                comandaStatusIcon.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #28a745;"></i>';
                break;
        }
    }
}

/**
 * Actualiza la barra de progreso de la comanda
 */
function updateProgressBar(comandaCard, platillos) {
    let existingProgress = comandaCard.querySelector('.comanda-progress');
    if (!existingProgress) {
        existingProgress = document.createElement('div');
        existingProgress.className = 'comanda-progress';
        comandaCard.querySelector('.comanda-header').appendChild(existingProgress);
    }

    const totalPlatillos = platillos.length;
    const completedPlatillos = Array.from(platillos).filter(p => p.getAttribute('data-status') === 'completed').length;
    const progress = totalPlatillos > 0 ? (completedPlatillos / totalPlatillos) * 100 : 0;

    existingProgress.style.width = progress + '%';
}

/**
 * Cambia manualmente el estado de toda la comanda
 * @param {number} comandaId - ID de la comanda
 */
function toggleComandaStatus(comandaId) {
    console.log('Cambiando estado manual de la comanda:', comandaId);

    const comandaCard = document.querySelector(`[data-comanda-id="${comandaId}"]`);
    if (!comandaCard) {
        console.error('No se encontró la comanda con ID:', comandaId);
        return;
    }

    const comandaCardElement = comandaCard.closest('.comanda-card');
    const comandaStatusBtn = comandaCardElement.querySelector('.comanda-status');
    const currentStatus = comandaStatusBtn.getAttribute('data-status');

    // Solo permitir cambio manual si no está completada
    if (currentStatus === 'completed') {
        console.log('La comanda ya está completada');
        return;
    }

    let newStatus = '';
    switch (currentStatus) {
        case 'pending':
            newStatus = 'in-progress';
            break;
        case 'in-progress':
            newStatus = 'completed';
            break;
        default:
            newStatus = 'pending';
    }

    console.log('Cambiando comanda de', currentStatus, 'a', newStatus);

    // Si se marca como completada manualmente, completar todos los platillos
    if (newStatus === 'completed') {
        const platillos = comandaCardElement.querySelectorAll('.platillo-status');
        platillos.forEach(platillo => {
            if (platillo.getAttribute('data-status') !== 'completed') {
                const platilloElement = platillo.closest('.platillo-item');
                const statusBadge = platilloElement.querySelector('.status-badge');
                const statusText = platillo.querySelector('.status-text');
                const statusIcon = platillo.querySelector('i');

                updatePlatilloVisualStatus(platilloElement, platillo, statusBadge, statusText, statusIcon, 'completed');
            }
        });
    }

    updateComandaVisualStatus(comandaCardElement, newStatus);

    // Aquí puedes agregar la llamada AJAX si es necesario
    // updateComandaStatusOnServer(comandaId, newStatus);
}

// Funciones para llamadas al servidor (opcional - implementar según necesites)
function updatePlatilloStatusOnServer(platilloId, newStatus) {
    console.log('Actualizando platillo en servidor:', platilloId, newStatus);
    // Aquí agregarías tu llamada AJAX al controlador
    /*
    $.ajax({
        url: '/Comandas/UpdatePlatilloStatus',
        type: 'POST',
        data: {
            platilloId: platilloId,
            status: newStatus
        },
        success: function(result) {
            console.log('Platillo actualizado en servidor');
        },
        error: function(xhr, status, error) {
            console.error('Error actualizando platillo:', error);
        }
    });
    */
}

function updateComandaStatusOnServer(comandaId, newStatus) {
    console.log('Actualizando comanda en servidor:', comandaId, newStatus);
    // Aquí agregarías tu llamada AJAX al controlador
    /*
    $.ajax({
        url: '/Comandas/UpdateComandaStatus',
        type: 'POST',
        data: {
            comandaId: comandaId,
            status: newStatus
        },
        success: function(result) {
            console.log('Comanda actualizada en servidor');
        },
        error: function(xhr, status, error) {
            console.error('Error actualizando comanda:', error);
        }
    });
    */
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
    console.log('Sistema de comandas inicializado');

    // Agregar event listeners adicionales si es necesario
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleComanda(this);
        });
    });
});