import partyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import "./Party.css";

const Party = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const navigate = useNavigate();

  // Load party
  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };
    loadParty();
  }, []);

  const handleDelete = async () => {
    const res = await partyFetch.delete(`/parties/${id}`);
    if (res.status === 200) {
      navigate("/");
      useToast(res.data.msg);
    }
  };

  if (!party) return (
    <div className="party-page">
      <p>Carregando...</p>
    </div>
  );

  return (
    <div className="party-page">

      <div className="party-hero">
        <img src={party.image} alt={party.title} />
        <div className="party-hero-overlay">
          <h1>{party.title}</h1>
        </div>
      </div>

      <div className="party-actions">
        <Link to={`/party/edit/${party._id}`} className="btn">✏️ Editar festa</Link>
        <button className="btn-secondary" onClick={handleDelete}>🗑️ Excluir</button>
      </div>

      <div className="party-info-card">
        <h3>Anfitrião</h3>
        <p>{party.author}</p>
      </div>

      <div className="party-info-card">
        <h3>Descrição</h3>
        <p>{party.description}</p>
      </div>

      <div className="party-info-card">
        <h3>Orçamento</h3>
        <p className="budget-value">R$ {Number(party.budget).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>

      {party.services.length > 0 && (
        <>
          <p className="party-services-title">🎪 Serviços contratados</p>
          <div className="services-grid">
            {party.services.map((service) => (
              <div className="service-card" key={service._id}>
                <img src={service.image} alt={service.name} />
                <p>{service.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Party;