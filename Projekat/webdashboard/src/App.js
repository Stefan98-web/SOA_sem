import Navbar from './navbar';
import './App.css';
import InputsData from './inputsData';
import SensorSpecs from './sensorSpecsInput';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        showForm:false,
        showGet:false
    }
}//onGet={()=>this.setState({showGet: true,showForm: false})}
render(){
  const {showForm}= this.state;
  const {showGet}= this.state;
  return (
    
    <div className="App">
      <Navbar onNewInput ={()=>this.setState({showForm: true,showGet:false})} onGet={()=>this.setState({showGet: true,showForm: false})}/>
      {showForm ? 
      <InputsData onClose={()=>this.setState({showForm:false})}/>
      : null}
      {showGet ? 
      <SensorSpecs onClose={()=>this.setState({showGet:false})}/>
      : null}
    </div>
  );
}
}

export default App;
