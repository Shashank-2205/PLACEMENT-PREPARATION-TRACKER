import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function OnlineCompilers({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dsa-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>💻 Online Code Compilers</h1>
        
        <div className="dsa-content">
          <div
            className="feature-item"
            style={{ background: "rgba(255, 255, 255, 0.2)", borderLeft: "4px solid #4CAF50" }}
          >
            <a
              href="https://www.programiz.com/online-compiler/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h4 style={{ margin: 0 }}>https://www.programiz.com/online-compiler/</h4>
            </a>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(255, 255, 255, 0.2)", borderLeft: "4px solid #4CAF50" }}
          >
            <a
              href="https://www.onlinegdb.com/online_c_compiler"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h4 style={{ margin: 0 }}>https://www.onlinegdb.com/online_c_compiler</h4>
            </a>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(255, 255, 255, 0.2)", borderLeft: "4px solid #4CAF50" }}
          >
            <a
              href="https://onecompiler.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h4 style={{ margin: 0 }}>https://onecompiler.com/</h4>
            </a>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(255, 255, 255, 0.2)", borderLeft: "4px solid #4CAF50" }}
          >
            <a
              href="https://godbolt.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h4 style={{ margin: 0 }}>https://godbolt.org/</h4>
            </a>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(255, 255, 255, 0.2)", borderLeft: "4px solid #4CAF50" }}
          >
            <a
              href="https://nextleap.app/online-compiler/python-programming"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h4 style={{ margin: 0 }}>https://nextleap.app/online-compiler/python-programming</h4>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
