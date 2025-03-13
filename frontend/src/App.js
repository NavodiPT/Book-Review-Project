import './App.css';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Views from './pages/Views';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (

    <Router>
    <div className="App">

     <Routes>
        <Route exact path= "/create" element={<CreatePost/>}></Route>
        <Route exact path= "/update/:id" element={<UpdatePost/>}></Route>
        <Route exact path= "/views" element={<Views/>}></Route>
        <Route exact path="/" element={<Register/>}></Route>
        <Route exact path="/signin" element={<Login />}></Route>
     </Routes>

    </div>
    </Router>
  );
}

export default App;
