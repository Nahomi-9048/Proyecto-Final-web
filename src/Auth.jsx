import React, {useState} from "react";
import 'firebase/auth'
import {useFirebaseApp } from 'react-fire';




export default (props) => {

    

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    
    return(
            <div className="form-group">
                <label htmlFor="email">Correo Electronico</label>
                <br />
                <input type="email" className="form-control" id="email" onChange={(ev)=> setEmail(ev.target.value) } />
                <br />
                <label htmlFor="password">Contraseña</label>
                <br />
                <input type="password" className="form-control"  id="password" onChange={(ev)=> setPassword(ev.target.value) } />
                <br />
                <button className="btn btn-primary" id="iniciar" onClick={submit}>Inicar</button>{"   "}
            </div>
        
    )
}