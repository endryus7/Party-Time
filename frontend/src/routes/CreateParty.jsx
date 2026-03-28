import partyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import "./Form.css";

const CreateParty = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [partyServices, setPartyServices] = useState([]);
  const navigate = useNavigate();

  // load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data);
    };
    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setPartyServices((prev) => [...prev, filteredService[0]]);
    } else {
      setPartyServices((prev) => prev.filter((s) => s._id !== value));
    }
  };

  // Create a new party
  const createParty = async (e) => {
    e.preventDefault();
    try {
      const party = { 
        title, 
        author, 
        description, 
        budget, 
        image, 
        services: 
        partyServices 
    };
      const res = await partyFetch.post("/parties", party);
      if (res.status === 201) {
        navigate("/");
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <span>🎉</span>
        <h2>Crie sua próxima Festa</h2>
        <p>Defina o orçamento e escolha os serviços</p>
      </div>

      <div className="form-card">
        <form onSubmit={createParty}>
          <label>
            <span>Nome da festa</span>
            <input type="text" placeholder="Seja criativo..." required onChange={(e) => setTitle(e.target.value)} value={title} />
          </label>
          <label>
            <span>Anfitrião</span>
            <input type="text" placeholder="Quem está dando a festa?" required onChange={(e) => setAuthor(e.target.value)} value={author} />
          </label>
          <label>
            <span>Descrição</span>
            <textarea placeholder="Conte mais sobre a festa..." required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </label>
          <label>
            <span>Orçamento (R$)</span>
            <input type="number" placeholder="Quanto você pretende investir?" required onChange={(e) => setBudget(e.target.value)} value={budget} />
          </label>
          <label>
            <span>URL da imagem</span>
            <input type="text" placeholder="Cole o link de uma imagem..." required onChange={(e) => setImage(e.target.value)} value={image} />
          </label>

          <div className="services-section">
            <h2>🎪 Escolha os serviços</h2>
            <div className="services-container">
              {services.length === 0 && <p>Carregando serviços...</p>}
              {services.map((service) => (
                <div
                  className={`service ${partyServices.find((s) => s._id === service._id) ? "selected" : ""}`}
                  key={service._id}
                >
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R$ {service.price}</p>
                  <div className="checkbox-container">
                    <input type="checkbox" value={service._id} onChange={handleServices} />
                    <p>Solicitar</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-submit">
            <input type="submit" value="🎊 Criar Festa" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateParty;