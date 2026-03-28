import partyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [parties, setParties] = useState(null);

  // Load parties
  useEffect(() => {
    const loadParties = async () => {
      const res = await partyFetch.get("/parties");
      setParties(res.data);
    };
    loadParties();
  }, []);

  if (!parties) return (
    <div className="home">
      <div className="empty-state">
        <span>⏳</span>
        <p>Carregando suas festas...</p>
      </div>
    </div>
  );

  return (
    <div className="home">
      <div className="home-header">
        <h1>Suas <span>Festas</span></h1>
        <p>Organize e gerencie todos os seus eventos em um só lugar</p>
      </div>

        <div className="parties-container">
          {parties.map((party) => (
            <div className="party-card" key={party._id}>
              <div className="party-card-image">
                <img src={party.image} alt={party.title} />
              </div>
              <div className="party-card-body">
                <h3>{party.title}</h3>
                <div className="party-card-footer">
                  <Link to={`/party/${party._id}`} className="btn-secondary">
                    Ver detalhes →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Home;