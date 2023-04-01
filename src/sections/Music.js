import WebPlayback from "../WebPlayback"
import Login from "../components/Login"

const Music = ({ token }) => {
  	return (
		<>
			<div className="music">
				{ (token === "") ? <Login/> : <WebPlayback token={ token }/> }
			</div>
		</>
  	);
}

export default Music;
