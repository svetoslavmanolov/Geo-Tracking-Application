import { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import './Map.css';

export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        lat: '',
        lng: ''
    });

    const initialState = {
        places: localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) :
            []
    };

    const onMapClick = (e) => {
        setMarkers(() => [
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
        ]);

        setErrors(state => ({
            ...state,
            lat: markers.lat === null,
            lng: markers.lng === null
        }));

        setValues((state) => ({
            ...state,
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }));
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const singlePlace = Object.fromEntries(new FormData(e.target));
        const markersObject = markers[0];
        const allDataForSinglePlace = { ...singlePlace, ...markersObject }

        const newPlaces = localStorage.getItem('places')
            ? JSON.parse(localStorage.getItem('places'))
            : [];

        const isExisting = newPlaces.find(point =>
            (point.lat === Number(singlePlace.lat) && point.lng === Number(singlePlace.lng)));

        if (isExisting) {
            alert('This location already exists, please choose another one that has different coordinates!')
            return false;
        }
        const allPlaces = [...initialState.places, allDataForSinglePlace]
        localStorage.setItem('places', JSON.stringify(allPlaces));
        alert(`You have successfully created a new location - ${singlePlace.name}`)
        setValues({
            name: '',
            description: '',
            category: '',
            lat: '',
            lng: ''
        });
    }

    const mapRef = useRef();
    const center = useMemo(() => ({ lat: 42.69751, lng: 23.32415 }), []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: (values[e.target.name].length < bound)
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x) && Object.keys(errors).length === 5

    return (
        <div className="container">
            <p>Make sure you first select a location on the map below by double-clicking on it, then enter the necessary details about your location</p>
            <div className="controls">
                <form onSubmit={onSubmit} className="createForm">
                    <div className="createFields">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="name..."
                                value={values.name}
                                onChange={changeHandler}
                                onBlur={(e) => minLength(e, 3)}
                            />
                            {errors.name &&
                                <p className="create-error">
                                    Name should be at least 3 characters long!
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="description..."
                                value={values.description}
                                onChange={changeHandler}
                                onBlur={(e) => minLength(e, 4)}
                            />
                            {errors.description &&
                                <p className="create-error">
                                    Description should be at least 4 characters long!
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="category..."
                                value={values.category}
                                onChange={changeHandler}
                                onBlur={(e) => minLength(e, 4)}
                            />
                            {errors.category &&
                                <p className="create-error">
                                    Category should be at least 4 characters long!
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="lat">Latitude</label>
                            <input
                                type="text"
                                id="lat"
                                readOnly={true}
                                name="lat"
                                placeholder="automatically filled in"
                                value={values.lat}
                            />
                            {errors.lat &&
                                <p className="create-error">
                                    Coordinates required! Do it by double clicking on the map.
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="lng">Longitude</label>
                            <input
                                type="text"
                                id="lng"
                                readOnly={true}
                                name="lng"
                                placeholder="automatically filled in"
                                value={values.lng}

                            />
                            {errors.lng &&
                                <p className="create-error">
                                    Coordinates required! Do it by double clicking on the map.
                                </p>
                            }
                        </div>
                    </div>
                    <div>
                        <input
                            type="submit"
                            className="submitButton"
                            disabled={!isFormValid}
                            value="Create Place"
                        />
                    </div>
                </form>
            </div>
            <div className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    onLoad={onLoad}
                    onDblClick={(e) => onMapClick(e)}
                >
                    {markers.map((marker) => (
                        <Marker key={marker.lat}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    );
}

