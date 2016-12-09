import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import View from 'view';
import Navbar from 'navbar';
import axios from 'axios';
import XML2jsobj from '../utils/xml2jsobj.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.client = axios.create({ baseURL: portalConfig.baseUrl});
        this.state = { ready: false };
    }
    getConfig(userApps){
        $.ajax(portalConfig.configUrl, {
            success: data => {
                let modConfig = XML2jsobj(data);
                this.publicApps = modConfig.config.modules.module.filter(m => m.appCode === 'STD');
                if (userApps){
                    this.privateApps = modConfig.config.modules.module.filter(m => {
                        return m.appCode !== 'STD' && userApps.includes(m.appCode);
                    });
                }
                this.allApps = this.publicApps.concat(this.privateApps || []);
                if(!window.location.hash)
                    hashHistory.push(this.publicApps[0].appId);
                this.setState({ ready: true });
            },
            error: () => {
                console.log(error)
            }
        })
    }
    componentDidMount() {
        try {
            let wshshell = new ActiveXObject("wscript.shell");
            this.username = wshshell.ExpandEnvironmentStrings("%username%");
        } catch (e) {
            console.warn('This system could not identify you...');
        }
        if (this.username){
            this.client.get(this.username)
            .then(res => {
                this.getConfig(res.data);
            });
        }else
            this.getConfig();

    }
    getContents() {
        if (this.state.ready) {
            return (
                <div>
                    <Router history={hashHistory}>
                        <Route path='/'>
                            <Route path='/:mapId' privateApps={this.privateApps} publicApps={this.publicApps} allApps={this.allApps} component={Navbar}/>
                        </Route>
                    </Router>
                    
                </div>
            )
        }
        return (
                <div className='loader-container'>
                    <div className='loader'></div>
                </div>
        )
    }
    render() {
        return (
            <div>{this.getContents()}</div>
        )
    }
}