import React from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ForgotPass from "./pages/login/ForgotPass";
// import Candidate from "./pages/candidate/Candidate";
import Single from "./pages/candidate/single/Single";
// import CandidateNew from "./pages/candidate/candidateForms/CandidateNew";
import CandidateMap from "./pages/candidate/candidateForms/CandidateMap";
import Jobs from "./components/jobs/Jobs";
import JobNew from "./components/jobs/JobNew";
import JobsEdit from "./components/jobs/jobsEdit";
import JobsView from "./components/jobs/JobsView";
import JobMap from "./pages/candidate/candidateForms/JobMap";
import NewJob from './components/jobs/JobNew';

import CountryMaster from "./pages/CountryMaster/CountryMaster";

import Client from "./components/Client/Client";
import AddNewClient from "./components/Client/AddNewClient"
import ClientEdit from "./components/Client/ClientEdit"
import ViewClient from "./components/Client/ViewClient"
// import CandidateView from "./pages/candidate/CandidateView" 
import Candy from "./pages/Candy";
import FormikData from "./pages/Formik/FormikData"
import FormikData1 from "./pages/Formik/FormikData1"
import Totexp from "./pages/Formik/ProfSum"
import Exp from "./pages/Formik/Exp"
import Charg from "./pages/Formik/Charg"
// import Emp from "./pages/Emp/employee"

// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CandidateEdit from './pages/candidate/candidateForms/CandidateEdit';
import Welcome from './pages/welcome/Welcome';
import NewCandidate from './components/Candidate/NewCandidate';
import AddNewCandidate from './components/Candidate/AddNewCandidate';
import EditCandidate from "./components/Candidate/EditCandidate"
import ViewCandidate from "./components/Candidate/ViewCandidate"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="Forgotpass" element={<ForgotPass />} />
            {/* candidate component and routing */}

            <Route path="NewCandidate" element={<NewCandidate />} />
            <Route path="addNewCandidate" element={<AddNewCandidate />} />
            <Route path="/EditCandidate/:id" element={<EditCandidate />} />
            <Route path="/ViewCandidate/:id" element={<ViewCandidate />} />

            {/* <Route path="candidates">
                <Route index element={<Candidate/>}/>
                <Route path=":userId" element={<Single/>}/>
                <Route path="new" elment={<New/>}/>
              </Route> */}
            {/* <Route path="candidates">
                <Route index element={<Candidate/>}/>
                <Route path="new" element={<CandidateNew/>}/>
                <Route path="edit/:candidateId" element={<CandidateEdit/>}/>
                <Route path=":candidateId" element={<Single/>} />
                <Route path="map/:candidateId" element={<CandidateMap/>}/>
              </Route> */}
            <Route path="jobs">
              <Route index element={<Jobs />} />
              <Route path="JobNew" element={<JobNew />} />
              <Route path="/jobs/jobsEdit/:id" element={<JobsEdit />} />
              <Route path="/jobs/JobsVIew/:id" element={<JobsView />} />
              <Route path="mapjo" element={<JobMap />} />
            </Route>
            <Route path="CountryMaster">
              <Route index element={<CountryMaster />} />
            </Route>

            <Route path="Client" element={<Client />} />
            <Route path="AddNewClient" element={<AddNewClient />} />
            <Route path="/ClientEdit/:id" element={<ClientEdit />} />
            <Route path="/ViewClient/:id" element={<ViewClient />} />

            <Route index element={<Client />} />
            {/* <Route path="/jobs/JobsVIew/:id" element={<JobsView />} /> */}

            {/* <Route path="/CandidateView/:id">
                <Route index element={<CandidateView/>}/>
              </Route> */}
            <Route path="Candy">
              <Route index element={<Candy />} />
            </Route>
            <Route path="FormikData">
              <Route index element={<FormikData />} />
            </Route>
            <Route path="FormikData1">
              <Route index element={<FormikData1 />} />
            </Route>
            <Route path="NewJob">
              <Route index element={<NewJob />} />
            </Route>
            <Route path="Totexp">
              <Route index element={<Totexp />} />
            </Route>
            <Route path="Exp">
              <Route index element={<Exp />} />
            </Route>
            <Route path="Charg">
              <Route index element={<Charg />} />
            </Route>
            {/* <Route path="Emp">
                <Route index element={<Emp/>}/>
              </Route> */}
            <Route path="home" element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
