import React, { Component } from 'react';
import './App.css';
function Display(props){
  return (
    <div className="display">
      <label className="operator">{props.op}</label>
      <label className="value">{props.value}</label>
      <label className="result">{props.result}</label>
    </div>
  )
}

function Numbers(props){
  var numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
  var numArray = [];
  numbers.map((num,i) => numArray.push(<button key={i} onClick={()=>props.handleNumber(num)}>{num}</button>));
  return (
    <div className="numbers">
      {numArray}
    </div>
  )
}

function Operators(props){
  var operators = ['+','-','*','/','='];
  var opArray = [];
  operators.map((oper,i) => opArray.push(<button key={i} onClick={()=>props.handleOperator(oper)}>{oper}</button>))
  return (
    <div className="operators">
      {opArray}
     </div>
  )
}
function SpecialKeys(props){
  var specialkeys = ['AC','<-',];
  var specialArray = [];
  specialkeys.map((sp,i)=>specialArray.push(<button key={i} onClick={()=> props.handleSpecial(sp)}>{sp}</button>))
  return (
    <div className="'special-keys">
      {specialArray}
    </div>
  )
}
class App extends Component {
  static initialize() {
    return {
      result : '0',
      value : '0',
      op : '=',
      decimalPoint : false,
      computed : false,

    }
  }
  constructor()
  {
    super();
    this.state = App.initialize();
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.computeResult = this.computeResult.bind(this);
    this.handleSpecial = this.handleSpecial.bind(this);
  }
  handleSpecial(sp){
    switch(sp){
      case 'AC' : {
        this.setState(App.initialize());
        break;
      }
      case '<-' : {
        var val = this.state.value;
        if(val[val.length-1] === '.')
         {
           this.setState({
             decimalPoint : false,
           })
         }
        if(val.length===1)
          val = '0';
        else
          val = val.substring(0,val.length-1);
        this.setState({
          value : val,
        })
        break;
      }
      default : console.log("No way this will print"); break;
    }
  }
  computeResult(op){
    var res = this.state.result;
    var oper = op;
    switch(oper){
      case '+' : {
        res = parseFloat(this.state.result,10)+parseFloat(this.state.value,10);
        break;
      }
      case '-' : {
        res = parseFloat(this.state.result,10)-parseFloat(this.state.value,10);
        break;
      }
      case '*' : {
        res = parseFloat(this.state.result,10)*parseFloat(this.state.value,10);
        break;
      }
      case '/' : {
        res = parseFloat(this.state.result,10)/parseFloat(this.state.value,10);
        break;
      }
      case '=' : {
        if(oper !== '='){
          this.computeResult(oper);
        }
        else {
          res = this.state.value;
        }
        break;
      }
      default : console.log("hAHa i'm 12 bTw");break;
    }
    this.setState({
          result : res+'',
          value : '0',
          decimalPoint : false,
          computed : true,
        })
  }
  handleOperator(oper){
    if(!this.state.computed)
      if(this.state.op !== null)
        this.computeResult(this.state.op);
      else
        {
          this.setState({
            result : this.state.value,
            value : '0',
          })
        }
    this.setState(prevState => ({
      op : oper,
      mode : 'operator',
    }))
    
  }
  handleNumber(num){
    if(num === '.'){
      this.setState({
        decimalPoint : true,
      })
    }
    if(this.state.decimalPoint && num === '.'){
      num = '';
    }
    this.setState(prevState => ({
      value : prevState.value === '0' && num!== '.'? num : prevState.value.concat(num),
      computed :false,
    }))
  }
  render() {
    const {result,op,value,} = this.state;
    return (
      <div className="App">
        <Display result={result} op={op} value={value}/>
        <SpecialKeys handleSpecial={this.handleSpecial}/>
        <div className="buttons">
          <Numbers handleNumber={this.handleNumber} />
          <Operators handleOperator={this.handleOperator}/>
        </div>
      </div>
    );
  }
}

export default App;
