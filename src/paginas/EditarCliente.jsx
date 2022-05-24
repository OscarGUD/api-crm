import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"

const EditarClientes = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const {id} = useParams()

  useEffect(() => {
    const obeterClienteApi = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            setCargando(!cargando)
        }, 1000);
    }
    obeterClienteApi()
},[])

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar datos de un cliente</p>
      {
        cliente?.nombre ? (
          <Formulario 
            cliente={cliente}
            cargando={cargando}
            setCargando={setCargando}
          />
        ) : <p className="pt-3">Cliente Id no valido</p>
      }
    </>
  )
}

export default EditarClientes