
export default function getAllPoints() {
    const allPlaces = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];
    return allPlaces;
}





