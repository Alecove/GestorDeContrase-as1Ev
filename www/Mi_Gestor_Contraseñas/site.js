const api = new Api();
const idCategoria = localStorage.getItem('idCategoriaActual');


if (!idCategoria) {
    alert("⚠️ Error: No has entrado desde una categoría.");
    window.location.href = 'index.html';
}


document.getElementById('btnGenerar').addEventListener('click', () => {
    const chars = "ABCabc123!@#$";
    let pass = "";
    for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('pass').value = pass;
});


document.getElementById('btnGuardar').addEventListener('click', async (e) => {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('pass').value;

    if (!nombre || !usuario || !pass) {
        alert("Rellena todos los campos");
        return;
    }

    try {
        
        await api.crearSitio({
            categoryId: parseInt(idCategoria), 
            name: nombre,
            user: usuario,
            password: pass
        });

        alert("✅ AHORA SÍ: Guardado confirmado por el servidor.");
        window.location.href = 'index.html';

    } catch (error) {
        console.error(error);
        alert("❌ ERROR: Mira la consola (F12) para ver qué pasó.");
    }
});