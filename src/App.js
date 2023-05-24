
import * as React from 'react'
import { Reset } from 'styled-reset'
import { Route } from "react-router-dom";
import LogonWrite from "./diary/LogonWrite";
import LogonDetail from "./diary/LogonDetail";
import LogonMain from './diary/LogonMain';

function App() {
  return (
    <>
      <React.Fragment>
        <Reset />
      </React.Fragment>

      <Route path='/' component={(props) => <LogonMain {...props}  />} exact={true} />
      <Route path='/comon/logon/write' component={ (props) => <LogonWrite {...props}  /> } exact={true} />
      <Route path='/comon/logon/page/:diaryid' component={ (props) => <LogonDetail {...props} /> } exact={true} />
    </>
  );
}

export default App;
