import { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PointActions } from './PointListConstants';
import PointItem from './PointItem/PointItem';
import PointEdit from '../PointEdit/PointEdit';
import PointDelete from '../PointDelete/PointDelete';
import getAllPoints from '../../services/PointService';
import './PointsList.css';

export default function PointsList() {
    const [pointAction, setPointAction] = useState({ point: null, action: null });
    const [positon, setPosition] = useState([]);
    const [sortType, setSortType] = useState('ascending');
    const [sortByField, setSortByField] = useState('name');
    const [result, setResult] = useState();

    const places = getAllPoints();

    const [state, setState] = useState({
        query: '',
        list: places
    });

    const mapRef = useRef();
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    function sortFunc(results, sortType, sortByField) {
        if (sortType === 'ascending') {
            results.sort((a, b) => a[sortByField] < b[sortByField] ? -1 : 1)
        } else if (sortType === 'descending') {
            results.sort((a, b) => b[sortByField] > a[sortByField] ? 1 : -1)
        }
        return results;
    }

    const pointActionClickHandler = (pointName, actionType) => {
        const currentPoint = state.list.find(point => point.name === pointName);
        setPointAction({
            point: currentPoint,
            action: actionType
        });
        const currentPosition = { lat: currentPoint.lat, lng: currentPoint.lng }
        setPosition(currentPosition);
    }

    const pointEditHandler = (pointData, point) => {
        const allEditedPoints = state.list.map(place => place.lat === point.lat ? { ...place, ...pointData } : place);
        localStorage.setItem('places', JSON.stringify(allEditedPoints));
        setState({
            ...state,
            list: allEditedPoints
        });
        closeHandler();
    }

    const pointDeleteHandler = (point) => {
        const allPlacesWithoutDeleted = state.list.filter(place => place.lat !== point.lat);
        localStorage.setItem('places', JSON.stringify(allPlacesWithoutDeleted));
        setState({
            ...state,
            list: allPlacesWithoutDeleted
        });
        closeHandler();
    }

    const closeHandler = () => {
        setPointAction({ point: null, action: null });
    }

    const onSearchChange = (e) => {
        const results = places.filter(place => {
            if (e.target.value === '') return places;
            return place[sortByField].toLowerCase().includes(e.target.value.toLowerCase());
        });
        setResult(results);
        setState({
            query: e.target.value,
            list: sortFunc(results, sortType, sortByField)
        })
    }

    function updatePoints(e) {
        setSortType(e);
        setState({
            query: state.query,
            list: !result
                ? sortFunc(places, e, sortByField)
                : sortFunc(result, e, sortByField)
        });
    }

    function sortBy(e) {
        setSortByField(e);
        setState({
            query: state.query,
            list: !result
                ? sortFunc(places, sortType, e)
                : sortFunc(result, sortType, e)
        })
    }

    return (
        <>
            <form className="search-form">
                <h2>
                    <span>Find your point</span>
                </h2>
                <div className="search-input-container">
                    <input
                        type="search"
                        placeholder="Search for point by name, descr. or category..."
                        name="search"
                        value={state.query}
                        onChange={onSearchChange}
                    />
                </div>
                <div className="filter">
                    <span>Filter by:</span>
                    <select
                        name="criteria"
                        className="criteria"
                        onChange={(e) => sortBy(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="description">Description</option>
                        <option value="category">Category</option>
                    </select>
                    <span>Sort by:</span>
                    <select
                        name="criteria"
                        className="criteria"
                        defaultValue={'default'}
                        onChange={(e) => updatePoints(e.target.value)}
                    >
                        <option value="default">None</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </form>
            <div>
                {pointAction.action === PointActions.Edit &&
                    <PointEdit
                        point={pointAction.point}
                        onClose={closeHandler}
                        onEditPoint={pointEditHandler}
                    />
                }
                {pointAction.action === PointActions.Delete &&
                    <PointDelete
                        point={pointAction.point}
                        onClose={closeHandler}
                        onDeletePoint={pointDeleteHandler}
                    />
                }
            </div>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Category
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.list.map(point =>
                            <tr key={point.lat}>
                                <PointItem
                                    singlePoint={point}
                                    onActionClick={pointActionClickHandler}
                                />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {pointAction.action === PointActions.GoToMap &&
                <div className="map">
                    <GoogleMap
                        zoom={10}
                        center={positon}
                        mapContainerClassName="map-container"
                        onLoad={onLoad}
                    >
                        <Marker position={positon} />
                    </GoogleMap>
                </div>
            }
        </>
    );
}