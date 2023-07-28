import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './Home.css';

const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <section>
                <div className="introduction">
                    <h1>Welcome to Geo Tracking App</h1>
                    {user
                        ? <p>You are now logged into the system and can create different locations around the world, then view and manipulate them.</p>
                        : <p>By logging into our system you can discover different locations around the world as well as create new ones.</p>
                    }
                </div>
            </section>
        </>
    );
}

export default Home;