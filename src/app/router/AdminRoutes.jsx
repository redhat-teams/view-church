import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../features/admin/components/AdminLayout";
import RequireAdmin from "../../features/admin/components/RequireAdmin";
import AdminDashboard from "../../features/admin/dashboard/AdminDashboard";
import UsersAdmin from "../../features/admin/users/UsersAdmin";
import EventsAdmin from "../../features/admin/events/EventsAdmin";
import TeachingsAdmin from "../../features/admin/teachings/TeachingsAdmin";
import DonationsAdmin from "../../features/admin/donations/DonationsAdmin";
import PrayersAdmin from "../../features/admin/prayers/PrayersAdmin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="teachings" element={<TeachingsAdmin />} />
          <Route path="donations" element={<DonationsAdmin />} />
          <Route path="prayers" element={<PrayersAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}
