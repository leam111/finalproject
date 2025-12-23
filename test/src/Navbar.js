import {Link} from 'react-router-dom'
import './navbar.css';
const Navbar=()=>{

return(<>

<div className="navbar">
    <div className='nav-links'>
<Link to = '/product'>Products</Link>
<Link to ="/productpage">Admin Page </Link>
</div>
</div>
</>);
}

export default Navbar;