import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import Alerta from "./Alerta"
import Spinner from "./Spinner"

const Formulario = ({cliente, cargando, setCargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El Nombre es muy corto')
                    .max(20, 'El Nombre es muy largo')
                    .required('El nombre del Cliente es Obligaotorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatoria'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('El numero no es positivo')
                    .integer('El numero puede contentener puntos')
                    .typeError('El numero no es valido'),
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if(cliente.id){
                // Editando registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                // Nuevo Registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    cargando ? <Spinner /> : (
        <div className="gb-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="tex-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                }} 
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => { 
                    // console.log(data)
                    return (
                    <Form className="mt-10">
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                            <Field 
                                type='text'
                                id='nombre'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre del Cliente'
                                name='nombre'
                            />
                            {
                                errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null
                            }
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                            <Field 
                                type='text'
                                id='empresa'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Empresa del Cliente'
                                name='empresa'
                            />
                            {
                                errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null
                            }
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="email">E-mail:</label>
                            <Field 
                                type='email'
                                id='email'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Email del Cliente'
                                name='email'
                            />
                            {
                                errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null
                            }
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="telefono">Teléfono:</label>
                            <Field 
                                type='tel'
                                id='telefono'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Teléfono del Cliente'
                                name='telefono'
                            />
                            {
                                errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : null
                            }
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="notas">Notas:</label>
                            <Field 
                                as='textarea'
                                type='text'
                                id='notas'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Notas del Cliente'
                                name='notas'
                            />
                        </div>

                        <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded cursor-pointer"/>
                    </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario