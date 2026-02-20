import partyFetch from "../axios/config"

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import useToast from "../hooks/useToast"

import "./Form.css"
import Party from "./Party"

const EditParty = () => {
    const [party, setParty] = useState(null)

    const [services, setServices] = useState([])

    const {id} = useParams()

    // Load services
    useEffect(() => {
            const loadServices = async() => {
                const res = await partyFetch.get("/services")
    
                setServices(res.data)

                loadParty()
            }

        const loadParty = async() => {
            const res = await partyFetch.get(`/parties/${id}`)

            console.log(res.data)
            
            setParty(res.data)
        }
    
            loadServices()
        }, [])

    const updateParty = (e) => {
        e.preventDefault()
    }

    if(!party) return <p>Carregando...</p>

  return (
    <div className='form-page'>
        <h2>Editando: {partyFetch.title}</h2>
        <p>Ajuste as informações da sua festa</p>
        <form onSubmit={(e) => updateParty(e)}>
            <label>
                <span>Nome da festa:</span>
                <input 
                type="text" 
                placeholder='Seja criativo...' 
                required 
                onChange={(e) => setTitle(e.target.value)} 
                value={party.title}
                />
            </label>
            <label>
                <span>Anfitrião:</span>
                <input 
                type="text" 
                placeholder='Quem está dando a festa?' 
                required
                onChange={(e) => setAuthor(e.target.value)} 
                value={party.author}
                />
            </label>
            <label>
                <span>Descrição:</span>
                <textarea 
                placeholder='Conte mais sobre a festa...' 
                required
                onChange={(e) => setDescription(e.target.value)} 
                value={party.description}
                ></textarea>
            </label>
            <label>
                <span>Orçamento:</span>
                <input 
                type="number" 
                placeholder='Quanto você pretende investir?' 
                required
                onChange={(e) => setBudget(e.target.value)} 
                value={party.budget}
                />
            </label>
            <label>
                <span>Imagem:</span>
                <input 
                type="text" 
                placeholder='Insira a URL de uma imagem' 
                required
                onChange={(e) => setImage(e.target.value)} 
                value={party.image}
                />
            </label>
            <label>
                <div>
                    <h2>Escolha os serviços</h2>
                    <div className="services-container">
                        {services.length === 0 && <p>Carregando...</p>}
                        {services.length > 0 && services.map((service) => (
                            <div className="service" key={service._id}>
                                <img src={service.image} alt={service.name} />
                                <p className="service-name">{service.name}</p>
                                <p className="service-price">R${service.price}</p>
                                <div className="checkbox-container">
                                    <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)}/>
                                    <p>Marque para solicitar</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </label>
            <input type="submit" value="Criar Festa" className='btn'/>
        </form>
    </div>
  )
}

export default EditParty