import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import './Dashboard.css';

const Dashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Cargando dashboard...</div>;
    }

    if (!isAuthenticated) {
        return <div>Necesitas iniciar sesión para ver el dashboard.</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="app-title">Whiskers Wallet</div>
                <nav className="dashboard-nav">
                    <ul>
                        <li>Dashboard</li>
                        <li>Transacciones</li>
                        <li>Presupuestos</li>
                        <li>Metas</li>
                        <li>Cuentas</li>
                    </ul>
                </nav>
                <div className="user-section">
                    <span className="user-name">{user ? user.name : 'Usuario'}</span>
                    <LogoutButton />
                </div>
            </header>

            <main className="dashboard-content">
                <section className="summary-cards">
                    <div className="card total-balance">
                        <div className="card-title">Balance Total</div>
                        <div className="card-value">$4,580.75</div>
                    </div>
                    <div className="card income">
                        <div className="card-title">Ingresos</div>
                        <div className="card-value">$3,200.00</div>
                    </div>
                    <div className="card expenses">
                        <div className="card-title">Gastos</div>
                        <div className="card-value">$2,600.00</div>
                    </div>
                    <div className="card savings">
                        <div className="card-title">Ahorros</div>
                        <div className="card-value">$1,980.75</div>
                    </div>
                </section>

                <section className="charts-section">
                    <div className="chart expense-distribution">
                        <h2>Distribución de Gastos</h2>
                        <div className="placeholder-chart">Gráfico de Pastel aquí</div>
                    </div>
                    <div className="chart monthly-trends">
                        <h2>Ingresos y Gastos Mensuales</h2>
                        <div className="placeholder-chart">Gráfico de Barras aquí</div>
                    </div>
                </section>

                <section className="recent-transactions">
                    <h2>Transacciones Recientes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15 Feb 2024</td>
                                <td>Alimentación</td>
                                <td>Supermercado Local</td>
                                <td>$20.50</td>
                                <td className="Gasto">Gasto</td>
                            </tr>
                            <tr>
                                <td>14 Feb 2024</td>
                                <td>Salario</td>
                                <td>Pago Mensual</td>
                                <td>$3000.00</td>
                                <td className="Ingreso">Ingreso</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="action-buttons">
                     <button>+ Nueva Transacción</button>
                     <button>+ Añadir Presupuesto</button>
                     <button>+ Nueva Meta</button>
                </section>
            </main>
        </div>
    );
};

export default Dashboard; 