import React, { Component } from "react";
import Header from './Header';
import Modal from 'react-responsive-modal';
export default class PlanetList extends Component {
    constructor() {
        super();
        this.state = {
            planets : [], 
            filterList: [],
            maxValue:0,
            open: false,
            activePlanet:""
        }
    }

    componentDidMount() {
        fetch("https://swapi.co/api/planets/")
            .then(response => response.json())
            .then(data => {
                const maxValue = Math.max(...data.results.map((planet) => {
                    console.log(planet.name)
                    if (planet.population != 'unknown') {
                        return parseFloat(planet.population)
                    } 
                    return 0
                }))
                this.setState({ planets: data.results, filterList: data.results, maxValue: maxValue, isLoading: false })
                console.log("float arrry ", maxValue)
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    onOpenModal = () => {
        //
        this.setState({ open: true });
    };
    onClickPlanet = (planet) => {
        console.log(planet)
        this.setState({
            open: true,
            activePlanet: planet
        })
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    filterResult = (searchText) => {
        if (searchText.length != 0) {
            let newFilterData = this.state.planets.filter((item) => {
                return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
            })
            this.setState({
                filterList : newFilterData
            })
        } else {
            this.setState({
                filterList : this.state.planets
            })  
        }
    }
    
    render() {
        const { open } = this.state;
        return (
            <div style={containerStyle}>
                <Header />
                <div style={searchStyle}>
                    <div> 
                        <input style={inputStyle} type="text" onChange={(event) => this.filterResult(event.target.value)} />
                    </div>
                    <div>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <div style={{width: 600}}>
                                <div style={{marginLeft: 20}}><h2>{this.state.activePlanet.name}</h2></div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Rotation Period</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.rotation_period}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Orbital Period</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.orbital_period}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Diameter</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.diameter}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Climate</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.climate}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Gravity</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.gravity}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Terrain</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.terrain}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Surface Water</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.surface_water}</div>
                                </div>
                                <div style={modelStyle}>
                                    <div style={modelKeyStyle}>Population</div>
                                    <div style={modelValueStyle}>{this.state.activePlanet.population}</div>
                                </div>
                                
                            </div>
                        </Modal>
                    </div>
                    <div style={{marginTop:60, marginBottom: 60}}>
                        {
                            this.state.filterList.map((planet) => {
                                return (
                                    <div value={planet} onClick={() => this.onClickPlanet(planet)}>
                                        <Filler maxValue={this.state.maxValue} planet={planet} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const Filler = (props) => {
    console.log(props.planet.population)
    console.log(props.planet.population/(props.maxValue/100))
    const width = (props.planet.population/(props.maxValue)) * 100
    console.log(width)
    return (
        <div style={fillStyle} >
            <label style={{marginTop:12, marginLeft:20, position:'absolute'}}>{props.planet.name}</label>
            <div style={{display:'inline-block', borderRadius:8, backgroundColor:'#f1c40f',height:'100%', width: `${width}%` }} />
            <div style={{display:'inline-block', right:0, marginTop:12, marginRight:150, color:'white', position:'absolute'}}><label>{props.planet.population}</label></div>
        </div>
    )
}
const modelStyle = {
    width: '100%',
    padding: 8,
}
const modelKeyStyle = {
    display: 'inline-block',
    float: 'left',
    width: '50%',
    padding: 10,
}
const modelValueStyle = {
    display: 'inline-block',
    float: 'right',
    width: '50%',
    padding: 10,
}
const nameStyle = {
    display: 'inline-block',
}
const searchStyle = {
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10
}
const containerStyle = {
    backgroundColor:'#3498db',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'top',
    borderWidth: 1,
    borderRadius: 8,   
}
const headerStyle = {
    fontWeight: 'bold',
    fontSize: 36,
    padding: 20,
    marginBottom: 20,
}
const inputStyle = {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 8,
    fontSize: 17,
    fontWeight: 500,
    borderRadius: 8,
}
const fillStyle = {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    height: 44,
    backgroundColor:'#2980b9',
}
