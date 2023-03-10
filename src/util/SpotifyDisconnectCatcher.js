// src: https://reactjs.org/docs/error-boundaries.html

import React from "react";

class SpotifyDisconnectCatcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p>Spotify player disconnected</p>
        }

        return this.props.children;
    }
}

export default SpotifyDisconnectCatcher;