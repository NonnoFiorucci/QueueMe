import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

class MyQueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            //code 
            queues: [],
            favorite:[],
            limit: 5
        }
        this.onShowQueue = this.onShowQueue.bind(this);
        
        // this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
        this.onShowQueue();
    }
    
    
    onShowQueue() {

        let ref = fire.database().ref().child('users/'+ this.props.userID +'/favoriteQueues');
        ref.on('value', snapshot => {
          var fav = snapshot.val();
          const allFavGetted = Object.keys(fav).map(function(key) {
            

            // DENTRO ALLFAV C'è la roba giusta....
           const allFav = fav[key].queueId
           console.log(allFav)

           fire.database().ref().child('queues/'+fav[key].queueId).on(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).map(key => ({
                    ...queueProps[key],
                    queueId: key
                }));
                this.setState({
                    queues: allQueuesGetted,
                    loading: false
                })                
            }
        )
        
        
        })





          
        });
       

        this.setState({ loading: true });
       
    }
    
    onRemoveUser = quId => {        
        const remUserFromQueue = fire.database().ref('queues/' + quId + '/userList/')
        remUserFromQueue.orderByChild('userId').equalTo(this.props.userID).once('value', snap=> {
            snap.forEach ( n =>{
                remUserFromQueue.child(n.key).remove();
            })
        })
        const remQueueFromUser = fire.database().ref('users/'+this.props.userID+'/queuesStatus/')
        remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s =>{
            s.forEach ( n =>{
                remQueueFromUser.child(n.key).remove();
            })

        })
           
    
    }

    onAddUser = quId => {
        fire.database().ref('queues/'+ quId + '/userList/').push({
            userId: (this.props.userID)
        });
        fire.database().ref('users/'+this.props.userID+'/queuesStatus').push({
            queueId: quId
        })

    }

    onAddFavorite = quId => {
       
      fire.database().ref('users/'+this.props.userID+'/favoriteQueues').push({
          queueId: quId
      })

  }


  onRemoveFavorite = quId => {        
    
      const remQueueFromUser = fire.database().ref('users/'+this.props.userID+'/favoriteQueues/')
      remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s =>{
          s.forEach ( n =>{
              remQueueFromUser.child(n.key).remove();
          })

      })
         
  
  }



  render() {
      const { queues, loading } = this.state;
      return(
          <div>
              <h2 style={{textAlign:'center',marginTop:20}}>Preferiti</h2>
              {/*durante il caricamento da realtimedb*/}
              {loading && (<Spinner color="secondary" />)}
              {/*se ci sono code*/}
              {queues && 
                  this.state.queues.map( queue => (
                      <SimpleCard 
                          queue={queue}
                          userId={this.props.userID}
                          onRemoveUser={this.onRemoveUser}
                          onAddUser={this.onAddUser}
                          onAddFavorite={this.onAddFavorite}
                          onRemoveFavorite={this.onRemoveFavorite}
                          
                          
                          />
                  ) )       
          
                      
              }          
          
          </div>
        )
    }
}
export default MyQueueView;