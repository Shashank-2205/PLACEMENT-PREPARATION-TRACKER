import Navbar from "../components/Navbar";

export default function Profile({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />

      <div className="container">
        <h2>Profile</h2>

        <div className="card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>User ID:</b> {user.id}</p>
        </div>
      </div>
    </>
  );
}
