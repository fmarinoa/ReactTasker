import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './styles/style.css'; 

const App = () => {

  const [tarea, setTareas] = useState([])
  const [descripcion, setDescripcion] = useState("");


  const mostrarTareas = async () => {
    const response = await fetch("api/tarea/lista");

    if (response.ok) {
      const data = await response.json();
      setTareas(data);
    } else {
      console.log("status code:" + response.status);
    }
  }

  //metodo para formatear fecha
  const formatDate = (string) => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fecha = new Date(string).toLocaleDateString("es-PE", options);
    let hora = new Date(string).toLocaleDateString();
    return fecha + " | " + hora
  }

  useEffect(() => {
    mostrarTareas();
  }, [])

  const guardarTarea =async(e)=>{
    e.preventDefault()

    const response = await fetch("api/tarea/Guardar",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify({descripcion:descripcion})
    })

    if (response.ok){
      setDescripcion("");
      await mostrarTareas();
    }
  }

  const cerrarTarea =async(id)=>{

    const response = await fetch("api/tarea/Cerrar/"+id,{
      method:"DELETE",
    })

    if (response.ok){
      await mostrarTareas();
    }
  }

  useEffect(() => {
    document.body.classList.add('background-container');
    return () => {
      document.body.classList.remove('background-container');
    };
  }, []);
  
  return (
    <div className="container mt-5">
      <h1 className="text-center ">Lista de Tareas</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={guardarTarea}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese la descripción de la tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-success" type="submit">
                  AGREGAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-4 justify-content-center min-vh-100">
        <div className="col-md-6">
            {tarea.map((item) => (
              <div key={item.idTarea} className="list-group-item list-group-item-action">
                <h5 className="text-primary">{item.descripcion}</h5>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                  <button onClick={() => cerrarTarea(item.idTarea)} className="btn btn-sm btn-outline-danger">
                    Cerrar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <br></br>
      <footer className="text-start text-light ">
      <div className="container">
        <p>
          Un proyecto de Franco Mariño -{' '}
          <a
            href="https://github.com/francoedson"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{' '}
          |{' '}
          <a
            href="https://www.linkedin.com/in/franco-mari%C3%B1o-2a289620a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
    </div>
  );
}

export default App;