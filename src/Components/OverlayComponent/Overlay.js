import React from "react"
import './Overlay.css'

class Overlay extends React.Component {
    render() {
        return(
            <div className="overlay" style={{display: this.props.show ? 'block':'none'}}>

            </div>
        )
    }
}

export default Overlay