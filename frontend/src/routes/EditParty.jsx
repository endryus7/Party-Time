import partyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import "./Form.css";

const EditParty = () => {
  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data);
      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };

    loadServices();
  }, []);

  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value);
    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }

    setParty({ ...party, services: partyServices });
  };

  const updateParty = async (e) => {
    e.preventDefault();
    try {
      const res = await partyFetch.put(`parties/${party._id}`, party);
      if (res.status === 200) navigate(`/party/${id}`);
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  if (!party) return <div className="form-page"><p>Carregando...</p></div>;

  return (
    <div className="form-page">
      <div className="form-header">
        <span>✏️</span>
        <h2>Editando: {party.title}</h2>
        <p>Ajuste as informações da sua festa</p>
      </div>

      <div className="form-card">
        <form onSubmit={updateParty}>
          <label>
            <span>Nome da festa</span>
            <input type="text" placeholder="Seja criativo..." required onChange={(e) => setParty({ ...party, title: e.target.value })} value={party.title} />
          </label>
          <label>
            <span>Anfitrião</span>
            <input type="text" placeholder="Quem está dando a festa?" required onChange={(e) => setParty({ ...party, author: e.target.value })} value={party.author} />
          </label>
          <label>
            <span>Descrição</span>
            <textarea placeholder="Conte mais sobre a festa..." required onChange={(e) => setParty({ ...party, description: e.target.value })} value={party.description}></textarea>
          </label>
          <label>
            <span>Orçamento (R$)</span>
            <input type="number" placeholder="Quanto você pretende investir?" required onChange={(e) => setParty({ ...party, budget: e.target.value })} value={party.budget} />
          </label>
          <label>
            <span>URL da imagem</span>
            <input type="text" placeholder="Cole o link de uma imagem..." required onChange={(e) => setParty({ ...party, image: e.target.value })} value={party.image} />
          </label>

          <div className="services-section">
            <h2>🎪 Escolha os serviços</h2>
            <div className="services-container">
              {services.length === 0 && <p>Carregando...</p>}
              {services.map((service) => (
                <div
                  className={`service ${party.services.find((s) => s._id === service._id) ? "selected" : ""}`}
                  key={service._id}
                >
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R$ {service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={handleServices}
                      checked={party.services.find((s) => s._id === service._id) || false}
                    />
                    <p>Solicitar</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-submit">
            <input type="submit" value="✅ Salvar alterações" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditParty;