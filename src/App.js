import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Gallery from './component/Gallery'
import './App.css';


class App extends Component {

    render() {

        return (

          <MuiThemeProvider>
            <div>
              <div style={{
                                position: 'fixed',
                                top: 0,
                                width: '100%'
                          }}>
                          <AppBar position="sticky"  />

              </div>
              <Gallery />
            </div>
        </MuiThemeProvider>

        );
    }
}


export default App;
