import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="panel"><h2>Activities</h2><p>Loading activities...</p></section>;
  }

  if (error) {
    return <section className="panel"><h2>Activities</h2><div className="alert alert-danger">{error}</div></section>;
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Activities</h2>
        <span className="badge text-bg-info">{activities.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">No activities found.</td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userId}-${activity.date}`}>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;
