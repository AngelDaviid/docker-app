import { useState, useEffect } from 'react'
import './assets/styles/App.css'
import Header from './Components/Header'
import ProductForm from './Components/ProductForm'
import ProductList from './Components/ProductList'
import {ProductService} from "./Components/ProductService.jsx";

// Importamos nuestros componentes

function App() {
    // Estados principales de la aplicación
    const [products, setProducts] = useState([]) // Lista de productos
    const [loading, setLoading] = useState(true) // Estado de carga
    const [error, setError] = useState(null) // Manejo de errores
    const [showForm, setShowForm] = useState(false) // Controla si mostramos el formulario
    const [editingProduct, setEditingProduct] = useState(null) // Producto que se está editando

    // Efecto para cargar los productos al montar el componente
    useEffect(() => {
        loadProducts()
    }, [])

    // Función para cargar todos los productos desde la API
    const loadProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await ProductService.getAllProducts()
            setProducts(data)
        } catch (err) {
            setError('Error al cargar los productos: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    // Función para crear un nuevo producto
    const handleCreateProduct = async (productData) => {
        try {
            const newProduct = await ProductService.createProduct(productData)
            setProducts([...products, newProduct])
            setShowForm(false)
            setError(null)
        } catch (err) {
            setError('Error al crear el producto: ' + err.message)
        }
    }

    // Función para actualizar un producto existente
    const handleUpdateProduct = async (id, productData) => {
        try {
            const updatedProduct = await ProductService.updateProduct(id, productData)
            setProducts(products.map(product =>
                product.id === id ? updatedProduct : product
            ))
            setShowForm(false)
            setEditingProduct(null)
            setError(null)
        } catch (err) {
            setError('Error al actualizar el producto: ' + err.message)
        }
    }

    // Función para eliminar un producto
    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await ProductService.deleteProduct(id)
                setProducts(products.filter(product => product.id !== id))
                setError(null)
            } catch (err) {
                setError('Error al eliminar el producto: ' + err.message)
            }
        }
    }

    // Función para abrir el formulario en modo edición
    const handleEditProduct = (product) => {
        setEditingProduct(product)
        setShowForm(true)
    }

    // Función para cancelar la edición/creación
    const handleCancelForm = () => {
        setShowForm(false)
        setEditingProduct(null)
    }

    return (
        <div className="app">
            {/* Header del dashboard */}
            <Header />

            <div className="container">
                {/* Botón para agregar nuevo producto */}
                <div className="actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                        disabled={showForm}
                    >
                        + Nuevo Producto
                    </button>
                </div>

                {/* Mostrar errores si los hay */}
                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}

                {/* Formulario de producto (se muestra condicionalmente) */}
                {showForm && (
                    <ProductForm
                        product={editingProduct}
                        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                        onCancel={handleCancelForm}
                    />
                )}

                {/* Lista de productos */}
                <ProductList
                    products={products}
                    loading={loading}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onRefresh={loadProducts}
                />
            </div>
        </div>
    )
}

export default App