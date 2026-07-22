import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import { Outlet } from "react-router-dom";

function UserMaster() {
  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
      <Link
        to="/ai-travel-planner"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#FF4A52",
          color: "#fff",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
          textDecoration: "none",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        title="AI Travel Planner"
      >
        🤖
      </Link>
    </>
  );
}

export default UserMaster