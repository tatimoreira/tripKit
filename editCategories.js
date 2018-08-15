const Card = (props) => {
	let icon;
	switch(props.editingFlag){
    case true :
      icon = 
      	<i className= "fa fa-minus-circle" onClick={()=>props.removeCategory(props.card) } style={{color: "red", cursor: 'pointer' }} ></i>
        
    break;
    default :
      icon = 
      <i className= "fa fa-circle" style={{color: props.color}} ></i>
      
    break;
  }

  return (
    <div style={ {margin: '1em'}} >
      {icon}
      <div style= {{display: 'inline-block', marginLeft: 10 }} >
        <div  style = {{fontSize: '0.70em', fontWeight: 'bold' }} > {props.categoryname} </div>
      </div>
    </div>
  );
}
const EditButton = (props) => {
	
  return (
  		<div> 
        <button onClick={props.editCategories} >Edit</button>
      </div>
  );
}


class Color extends React.Component {
  render() {
  	return(
    	<div> 
        {this.props.colorsAvailable.map (color => <i class="fas fa-circle" key={color.id} onClick={()=> this.props.onClick(color.color1)}  style={{color: color.color1, cursor: "pointer"}} />)}
      </div>
    )
  }
}


class Form extends React.Component{
  state = { 
  	categoryname : "", 
    color: "" ,
    colorsAvailable : 
    [
    	{color1: "#336699"}, 
      {color1:"#cc6699"},
      {color1:"#ffcc00"},
      {color1:"#009900"},
      {color1: "#33ccff"}, 
      {color1:"#ffa64d"},
      {color1:"#ff4d4d"},
      {color1:" #7070db"},
      {color1: "#ff704d"}, 
      {color1:"#ffff4d"},
      {color1:"#b32400"},
      {color1:"#ff6699"},
      {color1: "#00cc00"}, 
      {color1:"#0000ff"},
      {color1:"yellow"},
      {color1:"#666633"},
    ]
    }
  handleSubmit = (event) => {
    event.preventDefault();
    
  	let data = {
      	categoryname: this.state.categoryname,
        color: this.state.color
      }
    this.props.onSubmit(data);
    this.setState({categoryname: ""})

  }
  
  selectColor= (clickedColor) =>{
  	this.state.color= clickedColor;
  }
  
  editMode = () => {
  
  }
  render() {
  	const {selectColor, colorsAvailable} =this.state;
    return(
      <form onSubmit={this.handleSubmit} >
        <input type="text" 
        value = { this.state.categoryname}
        onChange = {(event) => this.setState({categoryname : event.target.value}) }
        placeholder="new category name"></input>
        <button type="submit">Add</button>
        <div> 
          <Color colorsAvailable={colorsAvailable} onClick={this.selectColor} />
        </div>
      </form>
    );  
  }
}

class App extends React.Component{
  state = {
    cards : [
    	{
      	categoryname: "Entertainment",
        color: "#ffcc00"
      },
      {
      	categoryname: "Souvenirs",
        color: "#666633"
      },
      {
      	categoryname: "Transport",
        color: "#b32400"
      },
      {
      	categoryname: "Accomodation",
        color: "#ff704d"
      },
      {
      	categoryname: "Food",
        color: "#cc6699"
      }
    ],
    editingFlag: false
  }
  
  addNewCard = (cardInfo)=>{
    this.setState(prevState => ({
      cards : prevState.cards.concat(cardInfo)
    }))
    
  }
  editCategories = (editingFlag)=>{
   	this.setState(prevState => ({
      editingFlag : true
    }))
  }
  removeCategory = (cardSelected)=>{
    this.setState(prevState=>({
      cards : 
        prevState.cards
          .filter(card => card !== cardSelected)
    }))
  }
  render(){
  	 
    return(
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards= {this.state.cards} editingFlag = {this.state.editingFlag} removeCategory={this.removeCategory} />
        <EditButton editCategories= {this.editCategories}/>
      </div>
    )
  }
}

const CardList = (props) => {
  return (
    <div> 
      {props.cards.map (card => <Card key={card.id} {...card} card={card} editingFlag={props.editingFlag} removeCategory={props.removeCategory}/>)}
    </div>
  );
}

ReactDOM.render(<App />,mountNode)
