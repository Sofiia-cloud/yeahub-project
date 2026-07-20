import Header from "../../../widgets/Header/Header";
import Footer from "../../../widgets/Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
