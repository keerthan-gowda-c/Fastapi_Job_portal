import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Jobs from "./pages/jobseeker/Jobs";
import HomePage from "./pages/HomePage";
import ChooseRole from "./pages/register/ChooseRole";
import ChooseLoginRole from "./pages/login/ChooseLoginRole";
import SavedJobs from "./pages/jobseeker/SavedJobs";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateCompany from "./pages/recruiter/company/CreateCompany";
import CreateJob from "./pages/recruiter/job/CreateJob";
import MyJobs from "./pages/recruiter/job/MyJobs";
import EditJob from "./pages/recruiter/job/EditJob";
import Profile from "./pages/jobseeker/Profile";
import JobseekerDashboard from "./pages/jobseeker/JobseekerDashboard";
import EditProfile from "./pages/jobseeker/EditProfile";
import MyApplications from "./pages/jobseeker/MyApplications";
import RecruiterApplications from "./pages/recruiter/application/RecruiterApplications";
import JobApplicants from "./pages/recruiter/application/JobApplicants";
import MyCompany from "./pages/recruiter/company/MyCompany";
import EditCompany from "./pages/recruiter/company/EditCompany";
import CompaniesList from "./pages/search/CompaniesList";
import CompanyDetails from "./pages/company/CompanyDetails";



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
          path="/company/my-company"
          element={<MyCompany />}
        />

        <Route
          path="/company/edit-company"
          element={<EditCompany />}
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
          path="/jobseeker/applications"
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

        <Route
          path="/recruiter/recruiter-application"
          element={<RecruiterApplications />}
        />

        <Route
          path="/recruiter/job-applicants/:jobId"
          element={<JobApplicants />}
        />

        <Route
          path="/companies/all"
          element={<CompaniesList />}
        />

        <Route
          path="/companies/details/:id"
          element={<CompanyDetails />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App;