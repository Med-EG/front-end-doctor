import { Link } from "react-router-dom";

function NavLink({ to, label }) {
  return (
    <>
      <Link to={to} className="primary-color primary-text-semibold">
        {label}
      </Link>
    </>
  );
}

export default NavLink;
