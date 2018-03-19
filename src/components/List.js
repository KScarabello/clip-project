import React, {Component} from 'react';
import axios from 'axios';
import {TweenMax} from  'gsap';



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

// exitAnimation = (name) => {
//     document.getElementById(name.toString()).style.animation = "deleteAnimation 2s"
// }

// deleteSport = (name) => {
//     for(let i of this.state.sports){
//         if(i.name === name){
//             // let stateCopy = this.state.sports.filter(sport => sport.name !== i.name)            
//             this.exitAnimation(name)
//             // console.log(name)
//             // this.setState({
//             //     sports: stateCopy
//             // })            
//         } 
//     }
// }

deleteSport = (name) => {
    for(let i of this.state.sports){
        if(i.name === name){
            const stateCopy = this.state.sports.filter(sport => sport.name !== i.name)            
            return this.exitAnimation(name, name => {
                this.setState({
                    sports: stateCopy
                })
            })         
        } 
    }
}

exitAnimation = (name, cb) => {
    document.getElementById(name.toString()).style.animation = "deleteAnimation .5s"
    // called when animation completes after 2s
    setTimeout(() => cb(name), 500)
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