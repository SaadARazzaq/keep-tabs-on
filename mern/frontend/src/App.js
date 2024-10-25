import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp'; // Import your SignUp component
import ForgotPassword from './components/Auth/ForgotPassword';
import CreateDigest from './components/Auth/CreateDigest';
import AllDigests from './components/Auth/AllDigests';
import Instagram from './components/Auth/instagram';
import Twitter from './components/Auth/twitter';
import Facebook from './components/Auth/facebook';
import Podcasts from './components/Auth/podcasts';
import YouTubePage from './components/Auth/youtube';
import ProfileCard from './components/Auth/ProfileCard';
import UnderConstruction from './components/Auth/UnderConstruction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add this route */}
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/createdigest" element={<CreateDigest />} /> 
        <Route path="/all-digests" element={<AllDigests />} />
        {/* <Route path="/Instagram" element={<Instagram />} />
        <Route path="/Facebook" element={<Facebook />} /> */}
        <Route path="/Instagram" element={<UnderConstruction />} />
        <Route path="/Facebook" element={<UnderConstruction />} />
        <Route path="/Twitter" element={<Twitter />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/podcast" element={<Podcasts />} />
        <Route path="/profile/:userId" element={<ProfileCard />} />
      </Routes>
    </Router>
  );
}

export default App;
