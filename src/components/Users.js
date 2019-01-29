import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
    render() {
        return (
            <div class="contanier">
                <h3> Ceritanya Ini User List</h3>
                <Link to="/">Dashboard</Link>
                <Link to="/cartlist">Cart list</Link>
            </div>
        )
    }
}

export default Users;