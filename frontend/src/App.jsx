import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/login/Login";
import ChooseRole from "./pages/auth/register/ChooseRole";
import HomePage from "./pages/home/HomePage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import JobDetails from "./pages/jobs/JobDetails";
import Register from "./pages/auth/register/Register";
import ChooseLoginRole from "./pages/auth/login/ChooseLoginRole";
import Jobs from "./pages/jobs/Jobs";
import CompaniesList from "./pages/company/CompaniesList";
import CompanyDetails from "./pages/company/CompanyDetails";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateCompany from "./pages/recruiter/company/CreateCompany";
import MyCompany from "./pages/recruiter/company/MyCompany";
import EditCompany from "./pages/recruiter/company/EditCompany";
import CreateJob from "./pages/recruiter/job/CreateJob";
import MyJobs from "./pages/recruiter/job/MyJobs";
import EditJob from "./pages/recruiter/job/EditJob";
import RecruiterApplications from "./pages/recruiter/application/RecruiterApplications";
import JobApplicants from "./pages/recruiter/application/JobApplicants";
import SavedJobs from "./pages/jobseeker/jobs/SavedJobs";
import Profile from "./pages/jobseeker/profile/Profile";
import JobseekerDashboard from "./pages/jobseeker/dashboard/JobseekerDashboard";
import MyApplications from "./pages/jobseeker/jobs/MyApplications";
import EditProfile from "./pages/jobseeker/profile/edits/EditProfile";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
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
            path="/companies/all"
            element={<CompaniesList />}
          />

          <Route
            path="/companies/details/:id"
            element={<CompanyDetails />}
          />

          <Route
            path="/jobs/details/:id"
            element={<JobDetails />}
          />
          {/* Public Routes Ends Here */}

          {/* Recruiter Routes */}
          <Route element={<ProtectedRoute allowedRole="recruiter" />}>

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
              element={<CreateJob/>}
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
              path="/recruiter/recruiter-application"
              element={<RecruiterApplications />}
            />

            <Route
              path="/recruiter/job-applicants/:jobId"
              element={<JobApplicants />}
            />

          </Route>
          {/* Recruiter Routes Ends Here */}

          {/* Jobseeker Routes */}
          <Route element={<ProtectedRoute allowedRole="jobseeker" />}>

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
              path="/jobseeker/profile/edit"
              element={<EditProfile />}
            />

          </Route>
          {/* Jobseeker Routes Ends Here  */}

        </Routes>

      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </>

  )
}

export default App;