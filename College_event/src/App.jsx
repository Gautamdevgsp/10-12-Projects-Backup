import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMaster from "./components/layout/userlayout/UserMaster";
import Home from "./components/pages/userpages/Home";
import Register from "./components/pages/userpages/Register";
import Login from "./components/pages/userpages/Login";
import BrowseEvents from "./components/pages/userpages/BrowseEvents";
import EventDetails from "./components/pages/userpages/EventDetails";
import CompetitionEnrollment from "./components/pages/userpages/CompetitionEnrollment";
import MyEnrollments from "./components/pages/userpages/MyEnrollments";
import MyCertificates from "./components/pages/userpages/MyCertificates";
import ManageProfile from "./components/pages/userpages/ManageProfile";
import AdminMaster from "./components/layout/adminlayout/AdminMaster";
import Createevent from "./components/pages/adminpages/Createevent";
import CreateCompetition from "./components/pages/adminpages/CreateCompetition";
import AllEvents from "./components/pages/adminpages/AllEvents";
import EditEvent from "./components/pages/adminpages/EditEvent";
import EditCompetition from "./components/pages/adminpages/EditCompetition";
import ManageCompetitions from "./components/pages/adminpages/ManageCompetitions";
import ViewEnrollments from "./components/pages/adminpages/ViewEnrollments";
import ManageResults from "./components/pages/adminpages/ManageResults";
import IssueCertificates from "./components/pages/adminpages/IssueCertificates";
import Reports from "./components/pages/adminpages/Reports";
import Dashboard from "./components/pages/adminpages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserMaster />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse-events" element={<BrowseEvents />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/enroll-competition/:id" element={<CompetitionEnrollment />} />
            <Route path="/my-enrollments" element={<MyEnrollments />} />
            <Route path="/my-certificates" element={<MyCertificates />} />
            <Route path="/manage-profile" element={<ManageProfile />} />
          </Route>

          <Route path="/admin" element={<AdminMaster />}>
            <Route index element={<Dashboard/>}/>
            <Route path="/admin/createevent" element={<Createevent />} />
            <Route path="/admin/allevents" element={<AllEvents />} />
            <Route path="/admin/edit-event/:id" element={<EditEvent/>} />
            <Route path="/admin/createcompetition" element={<CreateCompetition />} />
            <Route path="/admin/competitions" element={<ManageCompetitions/>} />
            <Route path="/admin/competitions/:eventId" element={<ManageCompetitions/>} />
            <Route path="/admin/edit-competition/:id" element={<EditCompetition/>} />
            <Route path="/admin/enrollments" element={<ViewEnrollments/>}/>
            <Route path="/admin/results" element={<ManageResults/>}/>
            <Route path="/admin/certificates" element={<IssueCertificates/>}/>
            <Route path="/admin/reports" element={<Reports/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
