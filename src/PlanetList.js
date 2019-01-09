import React, { Component } from "react";
import Header from './Header';
import Modal from 'react-responsive-modal';
export default class PlanetList extends Component {
    abortController = new window.AbortController();
    constructor() {
        super();
        this.state = {
            planets : [], 
            filterList: [],
            maxValue:0,
            open: false,
            activePlanet:"",
            nextPage:"",
            searchCount: 0,
            searchDate:0
        }
    }
    componentDidMount() {
        //this.removeLocalStorage()
        console.log("username " + localStorage.getItem('starwar_user'));
                        
        this.callAPI("https://swapi.co/api/planets/")
    }
    loadMorePlanet = () => {
        this.callAPI(this.state.nextPage)
    }
    callAPI = (url) => {
        console.log("data " + Date.now());
        this.setState({
            isLoading:true
        });
        console.log(url)
        this.abortController = new window.AbortController();
        fetch(url, {
            method: 'get',
            signal: this.abortController.signal,
        })
            .then(response => response.json())
            .then(data => {
                const maxValue = Math.max(...data.results.map((planet) => {
                    console.log(planet.name)
                    if (planet.population != 'unknown') {
                        return parseFloat(planet.population)
                    } 
                    return 0
                }))
                var planets = this.state.planets
                planets = planets.concat(data.results)
                console.log("state data")
                console.log(this.state.planets)
                console.log("response data")
                console.log(data.results)
                console.log("final data")
                console.log(planets)
                this.setState({ planets: planets, filterList: planets, maxValue: maxValue, isLoading: false, nextPage: data.next })
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
    removeLocalStorage = () => {
        localStorage.removeItem('searchDate');
        localStorage.removeItem('searchCount');
    }
    setStateToLocalStorage = () => {
        localStorage.setItem('searchDate', Date.now()/1000);
        localStorage.setItem('searchCount', 1);
    }
    filterResult = (searchText) => {
        this.abortController.abort();
        let username = localStorage.getItem('starwar_user').replace(/(^\")|("$)/gi, "")
        if(username !== "luke skywalker") {
            let searchCount = this.state.searchCount
            let storeSearchCount = localStorage.getItem('searchCount')
            console.log("search count = " + searchCount + " local storage " + storeSearchCount);
            if(storeSearchCount === null) {
                storeSearchCount = 1
                this.setStateToLocalStorage()            
            }
            storeSearchCount = parseInt(storeSearchCount)
            if(storeSearchCount >= 5) {
                let searchTime = parseInt(localStorage.getItem('searchDate'))
                let endDate = Date.now() / 1000
                if((endDate - searchTime) <= 60) {
                    alert("You cannot search more than 5 in 1 Minutes");
                    return
                } else {
                    this.setStateToLocalStorage()
                }
            }
            localStorage.setItem('searchCount', storeSearchCount + 1);
        }
        this.setState({
            planets: [], filterList: []
        })
        this.callAPI("https://swapi.co/api/planets/?search="+searchText);
        // if (searchText.length != 0) {
        //     let newFilterData = this.state.planets.filter((item) => {
        //         return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        //     })
        //     this.setState({
        //         filterList : newFilterData
        //     })
        // } else {
        //     this.setState({
        //         filterList : this.state.planets
        //     })  
        // }
    }
    
    render() {
        const { open, nextPage } = this.state;
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
                    <div style={{marginTop:60, marginBottom: 30}}>
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
                    <div style={{display: `${!nextPage?'none':'block'}`}} onClick={() => this.loadMorePlanet()}>
                        <p  style={{backgroundColor:'yellow', width:'10%', fontWeight:600}}>Load More...</p>
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
