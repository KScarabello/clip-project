import React, {Component} from 'react';
import axios from 'axios';




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


deleteSport = (name) => {
    for(let i of this.state.sports){
        if(i.name === name){           
            return this.exitAnimation(name, name => {
                const stateCopy = this.state.sports.filter(sport => sport.name !== name)
                this.setState({
                    sports: stateCopy
                })
                    
        }) 
    }
}
}

exitAnimation = (name, cb) => {
    document.getElementById(name).style.animation = "deleteAnimation .75s"    
    setTimeout(() => cb(name), 750)
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
                                    let imgPath = " ";
                                    if(/\s/g.test(sport.name.toLowerCase())){                                        
                                        imgPath = 'images/' + sport.name.replace(/\s/g, '').toLowerCase() + '.png'
                                    } else {
                                        imgPath = 'images/' + sport.name.toLowerCase() + '.png'
                                    }                   
                                    return(
                                        <div>
                                            <button className="sport-button" id={sport.name} onClick={() => this.deleteSport(sport.name)}>
                                                <img src={imgPath} className="sport-image" /> 
                                                {sport.name}
                                            </button>                         
                                        </div>
                                    )   
                                })                
                    }
                
                </div>
                <div className="reset-button-container">
                    <button className="reset-button" onClick={() => this.resetSports()}>Reset</button>
                </div>
                
            </div>
        )
    }
}

export default List;