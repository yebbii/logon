import LogonMain from "./diary/LogonMain";
import * as React from 'react'
import { Reset } from 'styled-reset'
import { Route } from "react-router-dom";
import LogonWrite from "./diary/LogonWrite";

function App() {
  return (
    <>
      <React.Fragment>
        <Reset />
      </React.Fragment>

      <Route path='/comon/logon' component={(props) => <LogonMain {...props}  />} exact={true} />
      <Route path='/comon/logon/write' component={ (props) => <LogonWrite {...props}  /> } exact={true} />
    </>
  );
}

export default App;
