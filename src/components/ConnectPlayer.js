import config from "../config.json";

const ConnectPlayer = () => {
    // Pulled directly from Spotify web player
    const iconData = ["M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z", "M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"];

    return (
        <div className="player-connected">
            <h1 id="connected">You're connected!</h1>

            {/* Fight me */}
            <br /> 

            <p> 
                To start the player, click on the 
                
                <svg id="connect-icon">
                    <path d={ iconData[0] } />
                    <path d={ iconData[1] } />
                </svg>  
                
                icon and select "{ config.sdk_player_name }".
            </p>
            <p>Once that's done, start listening to any playlist or album!</p>
        </div>
    );
}

export default ConnectPlayer;