import React, { Component,useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import GoogleLogin from 'react-google-login';






var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;
var si = false;




class App extends React.Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      cuerpo: '',
      fecha:fechaYHora
    },
    data2: [],
    form1:{
      Usuario:'',
      pass:''
    },
    id: 0
  };

 

  peticionGet = () => {

    firebase.child("canales").on("value", (nombre) => {
      if (nombre.val() !== null) {
        this.setState({ ...this.state.data, data: nombre.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionGetRegistrar = () => {

    firebase.child("canales2").on("value", (nombre) => {
      if (nombre.val() !== null) {
        this.setState({ ...this.state.data2, data2: nombre.val() });
      } else {
        this.setState({ data2: [] });
      }
    });
  };


  peticionPost=()=>{
    firebase.child("canales").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
      this.setState({modalregistrar: false});

  }

  peticionPostRegistrar=()=>{
    firebase.child("canales2").push(this.state.form1,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
      this.setState({modalregistrar: false});
      

  }
  

  peticionPut=()=>{
    
    firebase.child(`canales/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

 

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  handleChange1=e=>{
    this.setState({form1:{
      ...this.state.form1,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form1);
  }

  seleccionarCanal=async(nombre, id, caso)=>{

    await this.setState({form: nombre, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  

  submit=()=>{
    {Object.keys(this.state.data2).map(i=>{

      if (this.state.data2[i].Usuario == this.state.form1.Usuario && this.state.data2[i].pass == this.state.form1.pass) {
      console.log("Si es");
      }
  })}
  }

  submit2=()=>{
    si = false;
  }

  render() {

  
    return (


      <div className="App">
     
      
    <button className="btn btn-success"  onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>{"      "}
    <button className="btn btn-success" onClick={()=>this.setState({modalsesion: true})}>Iniciar Sesion</button>
      <br/>
      <br/>
        
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                
                
                <div class="card">
                  
                  <div class="card-body">
                    
                    <p class="card-text">{this.state.data[i].cuerpo}</p>
                  </div>
                  <div class="card-footer text-muted">
                    {this.state.data[i].fecha }
                  </div>
                </div>  
                <br></br>
                <br></br>

              </tr>
            })}
        
        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
        
          <br />
          <label>Comentario: </label>
          <br />
          <textarea class="form-control" aria-label="With textarea" name="cuerpo" onChange={this.handleChange} ></textarea>

        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalsesion}>
      <ModalHeader ><div id="iniciarTexto">Iniciar Sesion</div></ModalHeader>
      <ModalBody>
    
      <div className="form-group">
                <label htmlFor="email">Correo Electronico</label>
                <br />
                <input type="email" className="form-control" id="Usuario" onChange={this.handleChange1} />
                <br />
                <label htmlFor="password">Contraseña</label>
                <br />
                <input type="password" className="form-control" id="password" onChange={this.handleChange1}/>
                <br />
                <button className="btn btn-primary" id="iniciar"  onClick={()=>this.submit()}>Iniciar</button>{"   "}
            </div>
      
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.setState({modalsesion: false, modalregistrar: true})}>Registrar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalsesion: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalregistrar}>
      <ModalHeader>Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          
          <label>Usuario</label>
          <br />
          <input type="email" className="form-control" name="Usuario" onChange={this.handleChange1}/>
          <br />
          <label>Password: </label>
          <br />
          <input type="password" className="form-control" name="pass" onChange={this.handleChange1}/>
         
          
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPostRegistrar()}>Guardar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalregistrar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>

      </div>
    );
  }
}



export default App;