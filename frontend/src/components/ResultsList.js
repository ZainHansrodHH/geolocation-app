const ResultsList = ({ results }) => (
    <ul>
        {results.map((result, index) => (
            <li key={index}>
                <strong>{result.name}</strong><br />
                Latitude: {result.latitude}, Longitude: {result.longitude}<br />
                Time Zone: {result.time_zone}<br />
                Score: {result.score.toFixed(2)}
            </li>
        ))}
    </ul>
);

export default ResultsList;
