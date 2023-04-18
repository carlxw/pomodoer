import WebPlayback from "../WebPlayback"
import Login from "../components/Login"

const Music = ({ token, setToken }) => {
  	return (
		<>
			<div className="music">
				{ (token === "") ? <Login /> : <WebPlayback token={ token } setToken={ setToken } /> }
			</div>
		</>
  	);
}

export default Music;
