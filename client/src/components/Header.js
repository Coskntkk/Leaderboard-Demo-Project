import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="header col-lg-6 offset-lg-3 col-md-12">
            <img className="img-fluid" src="./header.png"alt="logo" />

            <form className="search d-flex" onSubmit={(e) => {navigate(`./${e.target.children[0].value}`);}}>
                <input className="form-control me-2" type="text" placeholder="Username" autoComplete="off" />
                <button className="btn btn-secondary" type="submit">Search</button>
            </form>
        </div>
    )
};

export default Header;