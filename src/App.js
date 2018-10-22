import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import image from './quote.jpg'
import image2 from './philo.jpg'


class App extends Component {
  constructor() {
    
    super();
    this.state= {
      randomQuotes: "",
      category: "",
      quotes: [],
      input: '',
    };
    this.deleteQuote = this.deleteQuote.bind(this)
  }
   componentDidMount(){
     axios.get("/api/quotes").then(res => {

       this.setState({quotes: res.data})
     })
    }

    updateInput(e){
      this.setState({
        input: e.target.value
      })
    }

    getRandomQuote(){
      axios.get("/api/quotes").then(res => {
        this.setState({quotes: res.data})
        console.log(this.state.quotes[0])
      })
    }

     deleteQuote(id){
       axios.delete(`/api/quotes/${id}`).then(res =>
       {
         console.log(id)
         this.setState({quotes: res.data})
       })
     }

     editQuote(id){
       console.log(id);
       axios.put(`/api/quotes/${id}`, {text : this.state.input}).then(res =>
        {this.setState({quotes: res.data})
      });
     }
  
  render() {
    let {quotes} = this.state
    let randomnNum = Math.floor(Math.random() * 10)
    console.log(this.state.quotes)
    var quote= quotes.map((ele, i) => {
      return (
        <div>
          <link href='https://fonts.googleapis.com/css?family=Farsan' rel='stylesheet'></link>
          <link href='https://fonts.googleapis.com/css?family=Italianno' rel='stylesheet'></link>
        <p>{ele.text}</p>
        <input onChange={(e)=>this.updateInput(e)} />
        <span>
          <button onClick={()=>this.editQuote(ele.id)}>Edit</button>
          <button onClick={()=> this.deleteQuote(ele.id)}>Delete</button>
          </span>
        </div>
      )
    })
    return (
      <div className="App">
    
      <img style = {{
        width: '800px',
        height: '300px'
      }} src={image} /> 
      
       
      {/* <h1>Dont like this quote, delete it to get a new one</h1> */}
      {/* <button onClick= {() => this.quotes}> Click Here </button>
      {this.state.quotes[0]}

      <button onClick={() => this.deleteQuote(this.state.quotes[0])}>Delete</button> */}
      {quote}
      
      </div>
    );
  }
}
export default App;
