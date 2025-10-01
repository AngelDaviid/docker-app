import { useState, useEffect } from 'react'

function ProductForm({ product, onSubmit, onCancel }) {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
    })

    // Estado para validaciones
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Lista de categorías predefinidas (puedes expandir o hacer dinámico)
    const categories = [
        'Electrónicos',
        'Ropa',
        'Hogar',
        'Deportes',
        'Libros',
        'Alimentación',
        'Salud',
        'Otros'
    ]

    // Efecto para llenar el formulario cuando estamos editando
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || product.nombre || '',
                description: product.description || product.descripcion || '',
                price: product.price || product.precio || '',
                stock: product.stock || product.cantidad || '',
                category: product.category || product.categoria || ''
            })
        }
    }, [product])

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Función para validar el formulario
    const validateForm = () => {
        const newErrors = {}

        // Validar nombre (requerido)
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio'
        }

        // Validar precio (requerido y debe ser número positivo)
        if (!formData.price) {
            newErrors.price = 'El precio es obligatorio'
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser un número mayor a 0'
        }

        // Validar stock (requerido y debe ser número entero no negativo)
        if (!formData.stock && formData.stock !== '0') {
            newErrors.stock = 'El stock es obligatorio'
        } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
            newErrors.stock = 'El stock debe ser un número mayor o igual a 0'
        }

        // Validar categoría (requerida)
        if (!formData.category) {
            newErrors.category = 'La categoría es obligatoria'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Preparar datos para enviar a la API
            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            }

            if (product) {
                // Estamos editando
                await onSubmit(product._id, dataToSubmit)
            } else {
                // Estamos creando
                await onSubmit(dataToSubmit)
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="form-overlay">
            <div className="form-container">
                {/* Header del formulario */}
                <div className="form-header">
                    <h3>
                        {product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
                    </h3>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="product-form">
                    {/* Campo Nombre */}
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="Ej: iPhone 13 Pro"
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* Campo Descripción */}
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descripción detallada del producto..."
                            rows="3"
                        />
                    </div>

                    {/* Campos Precio y Stock en fila */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Precio *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={errors.price ? 'error' : ''}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                            {errors.price && <span className="error-text">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">Stock *</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className={errors.stock ? 'error' : ''}
                                placeholder="0"
                                min="0"
                            />
                            {errors.stock && <span className="error-text">{errors.stock}</span>}
                        </div>
                    </div>

                    {/* Campo Categoría */}
                    <div className="form-group">
                        <label htmlFor="category">Categoría *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={errors.category ? 'error' : ''}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <span className="error-text">{errors.category}</span>}
                    </div>

                    {/* Botones de acción */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-small"></span>
                                    {product ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                product ? 'Actualizar Producto' : 'Crear Producto'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm