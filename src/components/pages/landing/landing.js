import React from 'react';
import { Button } from 'react-bootstrap';


//eslint-disable-next-line
import Style from '../../style.css';

function Landing() {
    return (
        <div>
            <h3 >Benvenuto!</h3>
            <br></br>
             <h2>Non sprecare il tuo tempo, la vita è troppo breve!</h2>
            <br/> <br/> <br/> <br/> <br/>
            <Button variant="danger" type="submit" href="/login" style={{fontWeight:'bold'}}>
                ENTRA !
            </Button>
        </div>
    );
}

export default Landing;