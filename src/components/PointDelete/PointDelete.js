import './PointDelete.css';

export default function PointDelete({
    point,
    onClose,
    onDeletePoint
}) {

    const onSubmit = (e) => {
        e.preventDefault();
        onDeletePoint(point);
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal-delete">
                <div className="confirm-container">
                    <header className="headers">
                        <h3>Are you sure you want to delete this location?</h3>
                        <span
                            style={{
                                color: 'grey',
                            }}
                        >
                            NAME: <span style={{ color: 'red' }}>{point.name}</span>
                        </span>
                        <br />
                        <span
                            style={{
                                color: 'grey',
                            }}
                        >
                            DESCRIPTION: <span style={{ color: 'red' }}>{point.description}</span>
                        </span>
                        <br />
                        <span
                            style={{
                                color: 'grey'
                            }}
                        >
                            CATEGORY: <span style={{ color: 'red' }}>{point.category}</span>
                        </span>
                    </header>
                    <div className="actions">
                        <div id="form-actions">
                            <button
                                onClick={onSubmit}
                                id="action-delete"
                                className="btn"
                                type="submit"
                            >
                                Delete
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
                </div>
            </div>
        </div>
    );
}