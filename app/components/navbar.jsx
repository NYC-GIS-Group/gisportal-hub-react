import React from 'react';
import View from 'view';
import {Link, hashHistory} from 'react-router';

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {title:''};
    }
    setTitle = (id)=>{
        let title = this.props.route.allApps.filter(a=>a.appId===id)[0].name;
        this.setState({title:title});
    }
    handleClick = (id)=>{
        if (!id){
            alert('Map not found!');
            return;
        }
        hashHistory.push(id);
        this.setTitle(id);
    }
    componentDidMount(){
        this.setTitle(this.props.params.mapId);
    }
    render(){
        let {privateApps, publicApps, allApps} = this.props.route;
        let mapId = this.props.params.mapId;
        let privateAppElem;
            if(privateApps){
                let appElems = privateApps.map((app,i)=>{
                    return <li key={i}><a onClick={()=>this.handleClick(app.appId)}>{app.name}</a></li>
                });
                privateAppElem = (
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Private tabs <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            {appElems}
                        </ul>
                    </li>
                );
            }
            let publicAppElem = publicApps.map((app,i)=>{
                return <li key={i}><a onClick={()=>this.handleClick(app.appId)}>| {app.name} |</a></li>
            })
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img src='public/logo.gif' className='navbar-brand logo'/>
                            <a className="navbar-brand app-title" href="#">{this.state.title}</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            {publicAppElem}
                            {privateAppElem}
                        </ul>
                        </div>
                    </div>
                </nav>
                <View mapId={mapId}/>
            </div>

        );
    }
}