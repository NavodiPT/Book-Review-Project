import './App.css';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Views from './pages/Views';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (

    <Router>
    <div className="App">

     <Routes>
        <Route exact path= "/create" element={<CreatePost/>}></Route>
        <Route exact path= "/update/:id" element={<UpdatePost/>}></Route>
        <Route exact path= "/" element={<Views/>}></Route>
     </Routes>

    </div>
    </Router>
  );
}

export default App;
