function EndUserDashboard() {
    return (
        <div className="container mt-5">
            <div className="card shadow p-5">

                <h2>Welcome End User 👋</h2>

                <h4 className="mt-4">Available Features</h4>

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                        ✅ Dark Mode
                    </li>

                    <li className="list-group-item">
                        ✅ Reports
                    </li>

                    <li className="list-group-item">
                        ✅ Payment Gateway
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default EndUserDashboard;