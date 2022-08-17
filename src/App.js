
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
//Clients
import Clients from './components/clients';
import AddClient from './components/addClients';
import UpdateClient from './components/updateClients';

//Banques
import Banques from './components/Banques';
import AddBanque from './components/AddBanque';
import UpdateBanque from './components/UpdateBanque';

//Pret
import Prets from './components/Prets';
import AddPret from './components/Addpret';
import UpdatePret from './components/UpdatePret';
import DetailsBanque from './components/DetailsBanque';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client */}
        <Route path="/" element={<Clients/>}></Route>
        <Route path="/Client" element={<Clients/>}></Route>
        <Route path="/AddClient" element={<AddClient/>}></Route>
        <Route path="/Client/update/:id" element={<UpdateClient/>}/>

        {/* Banque */}
        <Route path="/Banque" element={<Banques/>}></Route>
        <Route path="/AddBanque" element={<AddBanque/>}></Route>
        <Route path="/Banque/Detail/:id" element={<DetailsBanque/>}></Route>
        <Route path="/Banque/update/:id" element={<UpdateBanque/>}/>

        {/* Pret */}
        <Route path="/Pret" element={<Prets/>}></Route>
        <Route path="/AddPret/:id" element={<AddPret/>}></Route>
        <Route path="/Pret/update/:id" element={<UpdatePret/>}/>

      </Routes>
  </BrowserRouter>
  );
}

export default App;
