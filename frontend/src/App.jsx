import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import HomePage from "./pages/HomePage";
import ChooseRole from "./pages/ChooseRole";
import ChooseLoginRole from "./pages/ChooseLoginRole";
import SavedJobs from "./pages/jobseeker/SavedJobs";
import MyApplications from "./pages/jobseeker/MyApplications";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateCompany from "./pages/recruiter/company/CreateCompany";
import CreateJob from "./pages/recruiter/job/CreateJob";
import MyJobs from "./pages/recruiter/job/MyJobs";
import EditJob from "./pages/recruiter/job/EditJob";
import Profile from "./pages/jobseeker/Profile";
import JobseekerDashboard from "./pages/jobseeker/JobseekerDashboard";
import EditProfile from "./pages/jobseeker/EditProfile";



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/choose-role"
          element={<ChooseRole />}
        />

        <Route
          path="/register/:role"
          element={<Register />}
        />

        <Route
          path="/choose-login-role"
          element={<ChooseLoginRole />}
        />

        <Route
          path="/login/:role"
          element={<Login />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/company/create"
          element={<CreateCompany />}
        />

        <Route
          path="/job/create"
          element={<CreateJob />}
        />

        <Route
          path="/saved-jobs"
          element={<SavedJobs />}
        />

        <Route
          path="/jobseeker/profile"
          element={<Profile />}
        />

        <Route
          path="/jobseeker/dashboard"
          element={<JobseekerDashboard />}
        />

        <Route
          path="/applications"
          element={<MyApplications />}
        />

        <Route
          path="/my-jobs"
          element={<MyJobs />}
        />

        <Route
          path="/job/edit/:id"
          element={<EditJob />}
        />

        <Route
          path="/jobseeker/profile/edit"
          element={<EditProfile />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App;