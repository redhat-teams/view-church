import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../../features/home/pages/HomePage";
import CCMPage from "../../features/ccm/pages/CCMPage";
import PrayerWinnerPage from "../../features/prayer-winner/pages/PrayerWinnerPage";
import MinistriesPage from "../../features/ministries/pages/MinistriesPage";
import EvangelisationPage from "../../features/evangelisation/pages/EvangelisationPage";
import EventsPage from "../../features/events/pages/EventsPage";
import EventDetailPage from "../../features/events/pages/EventDetailPage";
import TeachingsPage from "../../features/teachings/pages/TeachingsPage";
import DonationsPage from "../../features/donations/pages/DonationsPage";
import ContactPage from "../../features/contact/pages/ContactPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import AboutPage from "../../features/about/pages/AboutPage";
import PrayerCellPage from "../../features/cell/pages/PrayerCellPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ccm" element={<CCMPage />} />
        <Route path="prayer-winner" element={<PrayerWinnerPage />} />
        <Route path="ministries" element={<MinistriesPage />} />
        <Route path="evangelisation" element={<EvangelisationPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="teachings" element={<TeachingsPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cellule" element={<PrayerCellPage />} />
        <Route path="apropos" element={<AboutPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}
