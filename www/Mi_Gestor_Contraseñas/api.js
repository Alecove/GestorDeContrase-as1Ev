class Api {
    constructor() {
        this.url = 'http://localhost:3000';
    }

    async getCategorias() {
        const res = await fetch(`${this.url}/categories`);
        return await res.json();
    }

    async crearCategoria(nombre) {
        const res = await fetch(`${this.url}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nombre })
        });
        if (!res.ok) throw new Error("Error guardando categoría");
    }

    async borrarCategoria(id) {
        await fetch(`${this.url}/categories/${id}`, { method: 'DELETE' });
    }

    async getSitios(idCategoria) {
        const res = await fetch(`${this.url}/sites?categoryId=${idCategoria}`);
        return await res.json();
    }

    
    async crearSitio(datos) {
     
        const urlCorrecta = `${this.url}/categories/${datos.categoryId}`;
        
        console.log("Conectando a:", urlCorrecta);

        const res = await fetch(urlCorrecta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: datos.name,
                user: datos.user,
                password: datos.password,
                description: "Creado desde la web" 
            })
        });

        if (!res.ok) {
            console.error("Error del servidor:", res.status);
            throw new Error("Fallo al guardar");
        }
        
        return await res.json();
    }
  

    async borrarSitio(id) {
        await fetch(`${this.url}/sites/${id}`, { method: 'DELETE' });
    }
}