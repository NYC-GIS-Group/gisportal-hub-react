import React from 'react';
import Navbar from 'navbar';

export default class View extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let url = portalConfig.basePortalUrl + this.props.mapId;
        return (
            <div>
                <iframe className='map-view' src={url}></iframe>
            </div>
        )
    }
}