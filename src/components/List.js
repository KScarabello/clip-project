import React, {Component} from 'react';


export default class List extends Component {
    constructor(props){
        super(props)

        this.state = {
            sports: []
        }


    }

componentWillMount(){
    fetch('https://clip-front-end-assessment.herokuapp.com/sports')
         .then(function(response) {
              this.setState({
                sports: response
             })
         .then(function(myJson) {
              console.log(myJson);
         });
    }


    render(){
        return(
           <p>{this.state.sports} </p>
        )
    }
}