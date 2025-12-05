const api = new Api();
const listaCategorias = document.getElementById('listaCategorias');
const listaSitios = document.getElementById('listaSitios');
const inputCat = document.getElementById('inputCategoria');
const titulo = document.getElementById('tituloCategoria');
const btnIrFormulario = document.getElementById('btnIrFormulario');

async function cargarCategorias() {
    listaCategorias.innerHTML = ''; 
    const categorias = await api.getCategorias();

    categorias.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'item-categoria'; 
        div.innerHTML = `<span>${cat.name}</span> <button class="btn-rojo" onclick="eliminarCat(${cat.id})">X</button>`;
        
        div.querySelector('span').addEventListener('click', () => {
           
            localStorage.setItem('idCategoriaActual', cat.id);
            localStorage.setItem('nombreCategoriaActual', cat.name);
            cargarSitios(cat.id, cat.name);
        });

        listaCategorias.appendChild(div);
    });
}


async function cargarSitios(idCategoria, nombreCategoria) {
    titulo.innerText = 'Categoría: ' + nombreCategoria;
    btnIrFormulario.style.display = 'block';
    listaSitios.innerHTML = '<p style="padding:20px; color:gray;">Cargando...</p>';

    const sitios = await api.getSitios(idCategoria);
    listaSitios.innerHTML = ''; 

    
    const sitiosFiltrados = sitios.filter(sitio => parseInt(sitio.categoryId) === parseInt(idCategoria));

    if (sitiosFiltrados.length === 0) {
        listaSitios.innerHTML = '<p style="padding:20px">No hay sitios guardados aquí todavía.</p>';
        return;
    }

    sitiosFiltrados.forEach(sitio => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${sitio.name}</h3>
            <p>Usuario: ${sitio.user}</p>
            <p>Pass: ******</p>
            <button class="btn-rojo" onclick="eliminarSitio(${sitio.id}, ${idCategoria}, '${nombreCategoria}')">Eliminar</button>
        `;
        listaSitios.appendChild(div);
    });
}


document.getElementById('btnNuevaCat').addEventListener('click', async () => {
    const nombre = inputCat.value;
    const icono = document.getElementById('selectIcono').value; 

    if (nombre.length > 0) {
        
        const nombreCompleto = `${icono} ${nombre}`;
        
        await api.crearCategoria(nombreCompleto);
        inputCat.value = '';
        cargarCategorias();
    } else {
        alert("Escribe un nombre para la categoría");
    }
});


btnIrFormulario.addEventListener('click', () => {
    window.location.href = 'site.html';
});


window.eliminarCat = async (id) => {
    if(confirm('¿Borrar esta categoría y todo lo que tiene dentro?')) {
        await api.borrarCategoria(id);
        
      
        if(localStorage.getItem('idCategoriaActual') == id) {
            localStorage.removeItem('idCategoriaActual');
            listaSitios.innerHTML = '';
            titulo.innerText = 'Selecciona una categoría';
            btnIrFormulario.style.display = 'none';
        }
        cargarCategorias();
    }
};

window.eliminarSitio = async (id, idCat, nomCat) => {
    if(confirm('¿Borrar sitio?')) {
        await api.borrarSitio(id);
        cargarSitios(idCat, nomCat);
    }
};


cargarCategorias();


const idMem = localStorage.getItem('idCategoriaActual');
const nomMem = localStorage.getItem('nombreCategoriaActual');

if (idMem && nomMem) {
   
    setTimeout(() => {
        cargarSitios(idMem, nomMem);
    }, 100);
}