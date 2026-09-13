import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="panel"><h2>Teams</h2><p>Loading teams...</p></section>;
  }

  if (error) {
    return <section className="panel"><h2>Teams</h2><div className="alert alert-danger">{error}</div></section>;
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Teams</h2>
        <span className="badge text-bg-success">{teams.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Sport</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">No teams found.</td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.members}</td>
                  <td>{team.sport}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Teams;
