import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="panel"><h2>Workouts</h2><p>Loading workouts...</p></section>;
  }

  if (error) {
    return <section className="panel"><h2>Workouts</h2><div className="alert alert-danger">{error}</div></section>;
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Workouts</h2>
        <span className="badge text-bg-secondary">{workouts.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Focus Area</th>
              <th>Equipment</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">No workouts found.</td>
              </tr>
            ) : (
              workouts.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.focusArea}</td>
                  <td>{workout.equipment?.join(', ') || 'None'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Workouts;
