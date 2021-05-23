import React from 'react';
import Todo from './containers/Todo';
import { BrowserRouter, Switch, Route }from 'react-router-dom';

const App = () => {
  return(
   <BrowserRouter>
       <Switch>
         <Route path="optimization/1">
            <Todo />
          </Route>
       </Switch>
   </BrowserRouter>
  );
}

export default App;
