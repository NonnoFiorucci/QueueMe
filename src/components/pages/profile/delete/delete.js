import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import firebase from 'firebase';
import { Button } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import * as ROUTES from '../../../../constants/routes';

import '../../../../styles/style.css';

class deleteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      email: null,
      ruolo: null
    }
    this.deleteaccount = this.deleteaccount.bind(this);
  }

  readUserData() {
    console.log(this.props.userID)
    const rootUtente = fire.database().ref('users/' + this.props.userID);
    rootUtente.on('value', snap => { 
      if (snap.val() !== null) { 
        this.setState({
          nome: snap.val().nome,
          email: snap.val().email,
          ruolo: snap.val().role
        })
        //imposto ruolo e state App
        
       // this.props.setLocalRole(this.state.ruolo)
       // this.props.setStateUser()
      } else if (snap.val() === null) {  
        alert('problemi lettura dati account')
      }
    })
  }



  deleteaccount(event) {
    var userDeleted = firebase.auth().currentUser;
    userDeleted.delete()



    fire.database().ref('users/' + this.props.userID).remove();
   


    fire.auth().signOut()
    this.deleteStorage()
    event.preventDefault();
  }

  deleteStorage() {
    let keysToRemove = ["userID", "email", "role", "username",];
    keysToRemove.forEach(k => localStorage.removeItem(k))
  }

  componentDidMount() {
   if(this.props.userID) this.readUserData();
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant='secondary' href={ROUTES.PROFILE}>
            <FaAngleLeft />
          </Button>
        </div>

        <h1>Elimina il tuo profilo</h1>

<div className="Elimina">
        <OverlayTrigger
          trigger="click"
          key='bottom' placement='bottom'
          overlay={
            <Popover
              id={`popover-positioned-bottom`}
              title={`Elimina`}
            >
              <strong>Eliminare Definitivamnte ?</strong>  <br />
              <br />
              <br />
              <div className="btn-toolbar" style={{ display: 'felx' }}>

                <Button variant="danger" href={ROUTES.LANDING} onClick={this.deleteaccount} > Elimina</Button>  {}
                <Button style={{ marginLeft: 50 }} href={ROUTES.DELPRO} variant="secondary">Annulla</Button>
              </div>
            </Popover>
          }
        >
          <Button variant="secondary">Elimina account </Button>
        </OverlayTrigger>
        </div>
      </div>
    );
  }
}

export default deleteProfile;