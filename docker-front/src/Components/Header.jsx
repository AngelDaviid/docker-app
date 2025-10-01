function Header() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo/Título del dashboard */}
                <div className="header-title">
                    <h1>📦 Dashboard de Productos</h1>
                    <p>Panel administrativo para gestión de inventario</p>
                </div>

                {/* Información del usuario (puedes expandir esto más adelante) */}
                <div className="header-user">
                    <div className="user-info">
                        <span className="user-name">Administrador</span>
                        <span className="user-role">Panel de Control</span>
                    </div>
                    <div className="user-avatar">
                        👤
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header