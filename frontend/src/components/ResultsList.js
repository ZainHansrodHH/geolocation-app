const ResultsList = ({ results }) => (
    <ul className="results-container">
        {results.map((result, index) => (
            <li className="result-card" key={index}>
                <strong>{result.name}</strong><br />
                Latitude: {result.latitude}, Longitude: {result.longitude}<br />
                Time Zone: {result.time_zone}<br />
                Score: {result.score.toFixed(2)}
            </li>
        ))}
    </ul>
);

export default ResultsList;
