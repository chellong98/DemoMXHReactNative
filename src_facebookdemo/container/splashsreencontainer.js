import React, { Component } from 'react';
import SplashScreen from './../screens/splashscreen';
import LoginContainer from './../container/logincontainer';
export interface Props {
    navigation: any,
}
export default class splashcontainer extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            currentscreen: 'splashscreen'
        }
        setTimeout(() => {
            this.setState({currentscreen: 'loginscreen'})
        }, 1000);
    }
    render() {
        const currentscreen = this.state.currentscreen;
        let mainscreen = currentscreen==='splashscreen' ? <SplashScreen/> : <LoginContainer navigation={this.props.navigation}/>
        return (
            mainscreen
        )
    }
};
