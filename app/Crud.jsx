'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './crud.module.css'
import Image from 'next/image'
import UpdateImg from '../public/update.png'
import DeleteImg from '../public/delete.png'
import SetActualizar from './SetActualizar'
import 'bootstrap/dist/css/bootstrap.min.css';


//Datos ficticios.............

const usuarios = [
    { id: 1, nombre: 'Arturo López', fechaActual: '10/8/2025', estado: 'Pagado', importeUSD: 45543.00},
    { id: 2, nombre: 'Judith Acosta', fechaActual: '15/8/2025', estado: 'Pagado', importeUSD: 433349.00 },
    { id: 3, nombre: 'Mara Herrera', fechaActual: '2/8/2025', estado: 'Pagado', importeUSD: 5533888.00  },
    { id: 4, nombre: 'Marco Medina', fechaActual: '25/8/2025', estado: 'No pagado',  importeUSD: 5445.00  },
]


export default function Crud() {   

    const [data, setData] = useState(usuarios) // fusionamos el arreglo "usuarios" a la variable de estado "data"
    const [editData, setEditData] = useState({ nombre: "", fechaActual: "", estado: "", importeUSD: "" }); // Creamos variable de estado para actualizar datos
    const [editId, setEditId] = useState(null);
    const [nombre, setNombre] = useState(false)
    /* const [fecha, setfecha] = useState(new Date()) */
    
    const [estado, setEstado] = useState("Pagado")
    const [importeUSD, setImporteUSD] = useState(false)
    
    const [fechaActual, setFechaActual] = useState(new Date());
    
    
/*     useEffect(() => {
    const timerID = setInterval(() => {
      setFechaActual(new Date());
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);   */

  //Filtrador por fecha...............
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');


  //Filtrador por estado (Pagado / No pagado)
  const [filter, setFilter] = useState('Todos'); // 'Todos' es el valor inicial

// Variable para los datos filtrados
const filteredData = data.filter(item => {
    // Filtro por estado
    const isStatusMatch = (filter === 'Todos' || item.estado === filter);

    // Convertimos las fechas a un formato comparable (objetos Date)
    const parts = item.fechaActual.split('/');
    const itemDate = new Date(parts[2], parts[1] - 1, parts[0]);

    // Las fechas de los inputs ya son de un formato que Date puede entender
    const startDate = fechaInicio ? new Date(fechaInicio) : null;
    const endDate = fechaFin ? new Date(fechaFin) : null;

    // Filtro por rango de fechas
    const isDateInRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

    // Retornamos true si ambos filtros coinciden
    return isStatusMatch && isDateInRange;
});


 // Agregar nueva factura.............

    const Agregar = (id) => {
        (nombre == false) ? alert('Campo Nombre vacío...') :
            (fechaActual == false) ? alert('Campo Fecha vacío...') :
            
            (estado == false) ? alert('Campo estado vacío...') :
            (importeUSD == false) ? alert('Campo importe(USD) vacío...') :
            (importeUSD <= 0) ? alert('El importe debe ser un número positivo...') :
                setData([...data, { id, nombre, fechaActual: fechaActual.toLocaleDateString(), estado, importeUSD }])
        setEditId(null)
}

 // Eliminar factura.............

    const Eliminar = (datID) => {
        const eliminar = data.filter(dato => (dato.id !== datID))
        const confirmar = confirm('Seguroo que desea eliminar al usuario:')

        confirmar === true ? setData(eliminar) :
            null

    }

    
 // Actualiza factura.............

    const Update = (dat) => {
        setEditId(dat.id);
        const formValues = { inputNombre: dat.nombre, inputFechaActual: dat.fechaActual, inputEstado: dat.estado, inputImporteUSD: dat.importeUSD }
        setEditData(formValues); // FILA COMPONENTE DE ARREGLO
    };

    const EditChange = (event) => {
        event.preventDefault()
        const newFormData = { ...editData };  // PASAMOS VALORES DE EDITDATA(setEditData)  A NEWFORMDATA
        const InputName = event.target.getAttribute('name')
        const INameValue = event.target.value
        newFormData[InputName] = INameValue

        setEditData(newFormData)//NUEVO ARRAY EDITADO

    }
    const FormSubmit = (event) => {
        event.preventDefault();
        const index = data.findIndex((da) => da.id === editId);
        const editedData = { id: editId, nombre: editData.inputNombre, fechaActual: editData.inputFechaActual, estado: editData.inputEstado, importeUSD: editData.inputImporteUSD }
        const newData = [...data];
        newData[index] = editedData;
        setData(newData);
        setEditId(null)
        console.log(newData)
    }
     
    // Para mostrar y ocultar formulario.........   

    const [mostrarForm, setMostrarForm] = useState(false);      

  
 const agregarFactura = () =>{
    setMostrarForm(!mostrarForm);
}






 //-------------------------------------F R O N T E N D--------------------------------------------
    return (
        //Obtenemos la fecha actual...............
        <div className={styles.main_section}>        
          {/*   <div className={styles.fecha}>
                  <h2>{fechaActual.toLocaleTimeString()}</h2>
                  <p>{fechaActual.toLocaleDateString()}</p><br />                
            </div> */}
            <h2 className={styles.newUser}>Facturación:</h2> <hr />
            <div className={styles.fact_flex}>
              <div>
              <button id='agregar' className={`btn p3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 `} onClick={() => agregarFactura()}>Agregar</button><br />
              </div>
        
 

    </div>
            <br />        
        {/* Agregamos nueva factura--------  */}           
            <form id='addForm' name='addForm' onSubmit={FormSubmit} className='addForm' >  
               {/*----------- Formulario se muestra si la variable de estado "mostrarForm " es true"---------- */}
              
              {mostrarForm && (
                  <div id='formInputs' className={styles.formInputs}>
                    <input type="text" className={styles.input_text} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' /><br /><br />
                  <label htmlFor="estado">Estado: &nbsp;
                       <select name="estado" id="estado" onChange={(e) => setEstado(e.target.value)} placeholder="Estado" className='form-select'>
                        <option value="pagado" selected>Pagado</option>
                        <option value="No pagado">No pagado</option>
                    </select>
                  </label><br /><br />
                    <input type="text" className={styles.input_text} onChange={(e) => setImporteUSD(e.target.value)} placeholder='importe(USD)' /><br /><br />
                    
            <button className={`${styles.btn_add} btn btn-control`} type='submit' id='add' onClick={() => Agregar()}>Subir</button><br />
                </div>

 )}
     {/* ----------Filtrador por fecha----------- */}
    <div className={styles.filtroEstado}>

    <div>
  <label htmlFor="filter-fecha-inicio">Fecha de inicio: &nbsp;</label><br />
  <input className='form-control'  id="filter-fecha-inicio"  type="date"  onChange={(e) => setFechaInicio(e.target.value)} value={fechaInicio}
    />
</div>

<div>
  <label htmlFor="filter-fecha-fin">Fecha de fin: &nbsp;</label><br />
  <input className='form-control' id="filter-fecha-fin"  type="date" onChange={(e) => setFechaFin(e.target.value)}
    value={fechaFin}
    />
</div>
       {/* --------Filtrador por estado------------- */}
         <div>
              <label htmlFor="filter-estado">Filtrar por estado: &nbsp;<br />
    <select id="filter-estado" onChange={(e) => setFilter(e.target.value)} value={filter} className='form-select'>       
          <option value="Todos">Todos</option>
        <option value="Pagado">Pagado</option>
        <option value="No pagado">No pagado</option>
    </select>

    </label>
    </div>
    </div>
    
                    <br />
                <div className='table-responsive'>

                <table className="table">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nombre</td>
                            <td>Fecha</td>
                            <td>Estado</td>
                            <td>Importe(USD)</td>
                            <td>Acción</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((dat, index) => (
                            editId === dat.id ?
                            
                            <SetActualizar key={dat.id} dat={dat.id} data={data} index={index + 1}
                            editData={editData} setData={setData} EditChange={EditChange} />
                            :
                            <tr key={dat.id} index={dat.id = index}>
                                    <td>{index + 1}</td>
                                    <td>{dat.nombre}</td>
                                    <td>{dat.fechaActual}</td>
                                    <td>{dat.estado}</td>
                                    <td>$ {dat.importeUSD}</td>
                                    
                                    <td>
                                        <Image className={styles.action_icons} src={UpdateImg} alt='Update data' onClick={() => Update(dat)} style={{ width: '25px', height: '25px' }} />&nbsp;&nbsp;
                                        <Image className={styles.action_icons} src={DeleteImg} alt='Delete data' onClick={() => Eliminar(dat.id)} style={{ width: '25px', height: '25px' }} />
                                    </td>
                                </tr>
                        )
                    )}
                    </tbody>
                </table>
                    </div>
            </form>
        </div>
    )
}

