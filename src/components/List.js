import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';


class List extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            sports: [] 
        }

    }

componentWillMount(){
    axios.get('https://clip-front-end-assessment.herokuapp.com/sports')
        .then((response) => {
            this.setState({
                isLoading: false,
                sports:response.data
            })
        })
}

deleteSport = (id) => {
    for(let i of this.state.sports){
        if(i.id === id){
            let stateCopy = this.state.sports.filter(sport => sport.id !== i.id)
            this.setState({
                sports: stateCopy
            })            
        } else {
            console.log('no match')
        }
    }
}

resetSports = () => {
    axios.get('https://clip-front-end-assessment.herokuapp.com/sports')
        .then((response) => {
            this.setState({sports:response.data})
        })
}
    
    render(){
        return(
            <div className="list-container">
                <div className="buttons-container">
                    {
                        this.state.isLoading ?
                            <p className="list-text">loading...</p>
                            :
                            this.state.sports.length === 0 ?
                                <p className="list-text">Oh no, you deleted all the sports :(</p>
                                :   
                                this.state.sports.map((sport) => {                    
                                    return(
                                        <div>
                                            <Button className="btn-lg btn-outline-primary" onClick={() => this.deleteSport(sport.id)}>{sport.name}</Button>                         
                                        </div>
                                    )   
                                })                
                    }
                
                </div>
                <div className="reset-button-container">
                    <button onClick={() => this.resetSports()}>Reset</button>
                </div>
                
            </div>
        )
    }
}

export default List;