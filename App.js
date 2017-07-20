import React, { Component } from 'react';
import './App.css';

function Display(props){
  // var res = props.result;
  // res = res.split('.');
  // while(res[0].length + res[1].length >= 8 && props.decimalPoint)
  // {
  //   res[1].pop();
  // }
  // if(res[1].length >= 8 && !props.decimalPoint)
  // {
  //   res = "Number too big";
  // }
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
  numbers.map((num,i) => numArray.push(<button key={i} className="button number-button" onClick={()=>props.handleNumber(num)}>{num}</button>));
  return (
    <div className="numbers">
      {numArray}
    </div>
  )
}

function Operators(props){
  var operators = ['+','-','*','/','='];
  var opArray = [];
  operators.map((oper,i) => opArray.push(<button key={i} className="button operator-button" onClick={()=>props.handleOperator(oper)}>{oper}</button>))
  return (
    <div className="operators">
      {opArray}
     </div>
  )
}
function SpecialKeys(props){
  var specialkeys = ['AC','<-',];
  var specialArray = [];
  specialkeys.map((sp,i)=>specialArray.push(<button key={i} className="button special-button" onClick={()=> props.handleSpecial(sp)}>{sp}</button>))
  return (
    <div className="specialkeys">
      {specialArray}
    </div>
  )
}
class Calculator extends Component {
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
    this.state = Calculator.initialize();
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.computeResult = this.computeResult.bind(this);
    this.handleSpecial = this.handleSpecial.bind(this);
  }
  handleSpecial(sp){
    switch(sp){
      case 'AC' : {
        this.setState(Calculator.initialize());
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
      default : break;
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
    if(this.state.value.split('.').join('').length <= 8){
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
  }
  render() {
    const {result,op,value,decimalPoint} = this.state;
    return (
      <div className="Calculator">
        <Display result={result} op={op} value={value} decimalPoint={decimalPoint}/>
        <div className="main-keys">
          <Numbers handleNumber={this.handleNumber} />
          <div className="side-keys">
            <SpecialKeys handleSpecial={this.handleSpecial}/>
            <Operators handleOperator={this.handleOperator}/>
        </div>
        </div>
      </div>
    );
  }
}

class App extends Component{
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    )
  }
}
export default App;
