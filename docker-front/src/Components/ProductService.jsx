import axios from 'axios'

// Configuración base de axios
const API_BASE_URL = 'https://docker-app-jz81.onrender.com' // Ajusta esta URL según tu API de NestJS
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Aquí puedes manejar errores globales como tokens expirados, etc.
        console.error('Error en la API:', error)
        return Promise.reject(error)
    }
)

// Objeto que contiene todos los métodos para interactuar con la API de productos
export const ProductService = {
    // GET - Obtener todos los productos
    getAllProducts: async () => {
        try {
            const response = await api.get('/products')
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener productos')
        }
    },

    // GET - Obtener un producto por ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener el producto')
        }
    },

    // POST - Crear un nuevo producto
    createProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al crear el producto')
        }
    },

    // PUT - Actualizar un producto existente
    updateProduct: async (id, productData) => {
        try {
            const response = await api.patch(`/products/${id}`, productData)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al actualizar el producto')
        }
    },

    // DELETE - Eliminar un producto
    deleteProduct: async (id) => {
        try {
            await api.delete(`/products/${id}`)
            return true
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al eliminar el producto')
        }
    }
}

// Exportar también la instancia de axios por si necesitas usarla directamente
export default api