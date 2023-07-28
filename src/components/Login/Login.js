import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Login.css';

export default function Login() {
    const { userLogin } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.target));
        const userData = { email, password }
        userLogin(userData);
        navigate('/')
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const isValidEmail = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: !values[e.target.name].match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        }))
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: (values[e.target.name].length < bound)
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x) && Object.keys(errors).length === 2;

    return (
        <section id="loginPage">
            <form id='loginForm' onSubmit={onSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={changeHandler}
                    onBlur={(e) => isValidEmail(e)}
                />
                {errors.email &&
                    <p className="create-error">Invalid email!</p>
                }
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={changeHandler}
                    onBlur={(e) => minLength(e, 3)}
                />
                {errors.password &&
                    <p className="create-error">Password should be at least 3 characters long!</p>
                }
                <input
                    type="submit"
                    className="register"
                    value="Login"
                    disabled={!isFormValid}
                />
            </form>
        </section>
    );
}
