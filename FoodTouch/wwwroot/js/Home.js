function ActualizarTarjetas() {
    const formData = new FormData();
    const idCategoria = document.getElementById("cmb_Categoria_Menu").value;
    formData.append("idCategoria", idCategoria);

    axios.post(urlServer + 'Home/ObtenerPlatillosDependeEstatus', formData)
        .then(respuesta => {
            const platillos = respuesta.data;
            console.log(platillos);

            if (Array.isArray(platillos)) {
                const cardContainer = document.querySelector(".card__container");
                cardContainer.innerHTML = ""; //Limpiar solo el contenido

                platillos.forEach(plato => {
                    const card = `

                        <article class="card__article"  >
                            <img src="${plato.imagenBase64 || 'Resources/default.png'}" alt="image" class="card__img" />

                            <div class="card__data">
                                <h2 class="card__title">${plato.nombre}</h2>
                                <span class="card__description">${plato.descripcion}</span>
                                <a href="#" class="card__button">ch: ${plato.precioCH} Gde: ${plato.precioG}</a>
                            </div>
                        </article>

                    `;
                    cardContainer.innerHTML += card;
                });
            } else {
                console.warn("La respuesta no es una lista.");
            }
        })
        .catch(error => {
            console.error("Error al obtener platillos:", error);
        });
}








document.addEventListener("DOMContentLoaded", function () {
    const inputBuscador = document.getElementById("txtBuscadorPlatillos_Menu");
    const tarjetas = document.querySelectorAll(".card__article");

    inputBuscador.addEventListener("input", function () {
        const filtro = inputBuscador.value.toLowerCase();

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector(".card__title")?.textContent.toLowerCase() || "";
            const descripcion = tarjeta.querySelector(".card__description")?.textContent.toLowerCase() || "";
            const precios = tarjeta.querySelector(".card__button")?.textContent.toLowerCase() || "";

            if (
                nombre.includes(filtro) ||
                descripcion.includes(filtro) ||
                precios.includes(filtro)
            ) {
                tarjeta.style.display = "";
            } else {
                tarjeta.style.display = "none";
            }
        });
    });
});