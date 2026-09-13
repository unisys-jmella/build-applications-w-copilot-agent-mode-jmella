// API endpoint: /api/users/
// https://example-8000.app.github.dev/api/users
import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load users.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <section className="panel"><h2>Users</h2><p>Loading users...</p></section>;
  }

  if (error) {
    return <section className="panel"><h2>Users</h2><div className="alert alert-danger">{error}</div></section>;
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Users</h2>
        <span className="badge text-bg-primary">{users.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team ID</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id ?? `${user.username}-${user.email}`}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.teamId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
