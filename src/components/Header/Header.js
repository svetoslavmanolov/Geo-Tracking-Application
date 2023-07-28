import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    {user
                        ?
                        <>
                            <li><Link to='/map'>Map</Link></li>
                            <li><Link to='/points'>Points List</Link></li>
                            <li><Link to='/logout'>Logout</Link></li>
                            <p style={{
                                display: 'inline-block',
                                fontWeight: 'bold',
                                color: 'white',
                                margin: '2px 0 5px 20px',
                                fontSize: '1.1rem'
                            }}>Welcome, {user}!</p>
                        </>
                        : <li><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;