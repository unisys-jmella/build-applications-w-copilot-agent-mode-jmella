import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="panel"><h2>Leaderboard</h2><p>Loading leaderboard...</p></section>;
  }

  if (error) {
    return <section className="panel"><h2>Leaderboard</h2><div className="alert alert-danger">{error}</div></section>;
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Leaderboard</h2>
        <span className="badge text-bg-warning">{entries.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">No leaderboard entries yet.</td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.username}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td>{entry.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboard;
