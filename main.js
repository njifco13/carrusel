let automovilesData = []; // Almacenaremos los datos aquí

// Cargar los datos desde el archivo JSON
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        automovilesData = data.automoviles; // Guardar los datos
        renderTable(automovilesData); // Renderizar la tabla inicial
    })
    .catch(error => console.error('Error al cargar los datos:', error));

// Función para renderizar la tabla
function renderTable(data) {
    const tbody = document.querySelector('#automoviles tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    data.forEach(marca => {
        marca.modelos.forEach(automovil => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Marca">${marca.marca}</td>
                <td data-label="Modelo">${automovil.modelo}</td>
                <td data-label="Tipo de motor">${automovil.tipo_motor}</td>
                <td data-label="Precio">${automovil.precio}</td>
                <td data-label="Descripción">${automovil.descripcion}</td>
                <td data-label="Foto"><img src="${automovil.foto}" alt="${automovil.modelo}" width="100"></td>
            `;
            tbody.appendChild(row);
        });
    });
}

// Código para el selector personalizado
const select = document.querySelector('#select');
const opciones = document.querySelector('#opciones');
const contenidoSelect = document.querySelector('#select .contenido-select');
const hiddenInput = document.querySelector('#inputSelect');
const galeriaMarcas = document.querySelectorAll('#galeria-marcas img');

galeriaMarcas.forEach((imagen) => {
    imagen.addEventListener('click', (e) => {
        const selectedBrand = e.target.getAttribute('data-marca'); // Obtiene el valor de data-marca
        filterAutomovilesByMarca(selectedBrand); // Filtra los automóviles según la marca
    });
});
// Función para filtrar automóviles según la marca seleccionada
function filterAutomovilesByMarca(selectedBrand) {
    const filteredData = selectedBrand === 'Todos'
        ? automovilesData
        : automovilesData.filter(marca => marca.marca === selectedBrand);
    renderTable(filteredData);
}

// Asigna evento a cada opción del selector personalizado
document.querySelectorAll('#opciones > .opcion').forEach((opcion) => {
    opcion.addEventListener('click', (e) => {
        e.preventDefault();
        contenidoSelect.innerHTML = e.currentTarget.innerHTML; // Muestra la opción seleccionada
        select.classList.toggle('active');
        opciones.classList.toggle('active');
        
        const selectedBrand = e.currentTarget.querySelector('.titulo').innerText;
        hiddenInput.value = selectedBrand; // Actualiza el valor del input oculto
        filterAutomovilesByMarca(selectedBrand); // Filtra los automóviles
    });
});

// Mostrar/Ocultar el menú desplegable del selector personalizado
select.addEventListener('click', () => {
    select.classList.toggle('active');
    opciones.classList.toggle('active');
});