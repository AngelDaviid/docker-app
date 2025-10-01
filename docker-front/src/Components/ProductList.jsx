function ProductList({ products, loading, onEdit, onDelete, onRefresh }) {
    // Si está cargando, mostrar spinner
    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Cargando productos...</p>
            </div>
        )
    }

    // Si no hay productos, mostrar mensaje vacío
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No hay productos registrados</h3>
                <p>Comienza agregando tu primer producto al inventario</p>
                <button className="btn btn-primary" onClick={onRefresh}>
                    🔄 Actualizar
                </button>
            </div>
        )
    }

    // Función para formatear precios
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(price)
    }

    return (
        <div className="product-list">
            {/* Header de la lista */}
            <div className="list-header">
                <h2>Lista de Productos ({products.length})</h2>
                <button className="btn btn-secondary" onClick={onRefresh}>
                    🔄 Actualizar
                </button>
            </div>

            {/* Tabla de productos */}
            <div className="table-container">
                <table className="products-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="product-row">
                            <td className="product-id">#{product.id}</td>
                               <td className="product-name">
                                <strong>{product.name || product.nombre}</strong>
                            </td>
                            <td className="product-description">
                                {product.description || product.descripcion || 'Sin descripción'}
                            </td>
                            <td className="product-price">
                                {formatPrice(product.price || product.precio)}
                            </td>
                            <td className="product-stock">
                  <span className={`stock-badge ${
                      (product.stock || product.cantidad) < 10 ? 'stock-low' : 'stock-good'
                  }`}>
                    {product.stock || product.cantidad || 0}
                  </span>
                            </td>
                            <td className="product-category">
                                {product.category || product.categoria || 'General'}
                            </td>
                            <td className="product-date">
                                {product.createdAt ?
                                    new Date(product.createdAt).toLocaleDateString('es-CO') :
                                    'N/A'
                                }
                            </td>
                            <td className="product-actions">
                                {/* Botón para editar */}
                                <button
                                    className="btn btn-edit"
                                    onClick={() => onEdit(product)}
                                    title="Editar producto"
                                >
                                    ✏️
                                </button>

                                {/* Botón para eliminar */}
                                <button
                                    className="btn btn-delete"
                                    onClick={() => onDelete(product._id)}
                                    title="Eliminar producto"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Footer con estadísticas básicas */}
            <div className="list-footer">
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-value">{products.length}</span>
                        <span className="stat-label">Total Productos</span>
                    </div>
                    <div className="stat-item">
            <span className="stat-value">
              {products.reduce((sum, p) => sum + (p.stock || p.cantidad || 0), 0)}
            </span>
                        <span className="stat-label">Total Stock</span>
                    </div>
                    <div className="stat-item">
            <span className="stat-value">
              {formatPrice(
                  products.reduce((sum, p) => sum + (p.price || p.precio || 0), 0)
              )}
            </span>
                        <span className="stat-label">Valor Total</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList