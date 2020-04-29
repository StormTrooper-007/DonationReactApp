import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import Completed from '../settings/Completed'


class Clients extends Component {
    state = {
        totalOwed:null,
    }
   

    static getDerivedStateFromProps(props, state){
        //get the clients from the props
        const{clients} = props

        if(clients){
            //add balances
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString())
            }, 0) //we start from 0
            return{totalPayed: total}
        }
        return null
    }

    

       
    render() {
        const {clients} = this.props
        const {totalPayed} = this.state

        if(clients){
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                {' '}
                        <i className="fas fa-users"></i>Clients{' '}</h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary">
                                Total Payed{' '}
                                <span className='text-primary'>
                                    ${parseFloat(totalPayed).toFixed(2)}
                                </span>
                            </h5>

                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th>Completed?</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index) => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                            <i className="fas fa-arrow-circle-right"></i>Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )
        }else{
            return <Spinner/>
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients:PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'clients'}]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients,
    }))
)(Clients)

