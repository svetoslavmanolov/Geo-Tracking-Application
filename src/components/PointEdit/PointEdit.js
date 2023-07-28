import { useState } from 'react';
import './PointEdit.css';

export default function PointEdit({
    point,
    onClose,
    onEditPoint
}) {

    const [values, setValues] = useState({
        name: point.name,
        description: point.description,
        category: point.category
    });

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        category: false
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const pointData = Object.fromEntries(new FormData(e.target));
        onEditPoint(pointData, point);
    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: (values[e.target.name].length < bound)
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x) && Object.keys(errors).length === 3;

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit Point</h2>
                    </header>
                    <form onSubmit={onSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <div className="input-wrapper">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        // defaultValue={point.name}
                                        value={values.name}
                                        onChange={changeHandler}
                                        onKeyUp={(e) => minLength(e, 3)}
                                    />
                                    {errors.name &&
                                        <p className="form-error">
                                            Name must be at least 3 characters long!
                                        </p>}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <div className="input-wrapper">
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        // defaultValue={point.description}
                                        value={values.description}
                                        onChange={changeHandler}
                                        onKeyUp={(e) => minLength(e, 4)}
                                    />
                                    {errors.description &&
                                        <p className="form-error">
                                            Description must be at least 4 characters long!
                                        </p>}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <div className="input-wrapper">
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        // defaultValue={point.category}
                                        value={values.category}
                                        onChange={changeHandler}
                                        onKeyUp={(e) => minLength(e, 4)}
                                    />
                                    {errors.category &&
                                        <p className="form-error">
                                            Category must be at least 4 characters long!
                                        </p>}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div id="form-actions">
                                <button
                                    id="action-save"
                                    className="btn"
                                    type="submit"
                                    disabled={!isFormValid}
                                >
                                    Edit
                                </button>
                                <button
                                    id="action-cancel"
                                    className="btn"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
