import { Link } from "react-router-dom"

export default function FloatingSettings() {

    return (

        <Link
            to="/settings"
            style={buttonStyle}
        >
            ⚙️
        </Link>

    )
}

const buttonStyle = {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: 28,
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
    zIndex: 9999
}