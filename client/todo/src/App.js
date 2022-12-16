import "./App.css";
import { Fragment } from "react";

import CreateTask from "./components/CreateTask";
import ViewTasks from "./components/ViewTasks";
// import  UpdateTask from './components/UpdateTask';

function App() {
  return (
    <Fragment>
      <div className="update" >
        <CreateTask />
        <ViewTasks />
      </div>
    </Fragment>
  );
}
export default App;
