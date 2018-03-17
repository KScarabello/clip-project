import React, {Component} from 'react';
import axios from 'axios';


class List extends Component {
    constructor(props){
        super(props)

        this.state = {
            sports: [] 
        }

    }

componentWillMount(){
    axios.get('https://clip-front-end-assessment.herokuapp.com/sports')
        .then((response) => {
             this.setState({sports:response.data})
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
            <div>
                {
                 this.state.sports.length === 0 ?
                    <p>Oh no, you deleted all the sports :(</p>
                 :   
                    this.state.sports.map((sport) => {                    
                         return(
                             <div>
                                <button onClick={() => this.deleteSport(sport.id)}>{sport.name}</button>                         
                             </div>
                        )
                })                
                }
                <button onClick={() => this.resetSports()}>Reset</button>

            </div>
        )
    }
}

export default List;