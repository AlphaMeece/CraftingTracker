import React from "react"
import Items from "../../Classes/Items"
import Resource from "../ResourceComponent/Resource"
import './ResourceBar.css'

class ResourceBar extends React.Component {
    constructor() {
        super()

        this.state = {
            visible: false
        }

        this.toggleVisible = this.toggleVisible.bind(this)
    }

    toggleVisible() {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        return (
            <div className="resource-bar">
                <div className="resource-bar-sidebar" style={{display: this.state.visible ? 'block':'none'}}>
                {
                    this.props.resources.getResources().map(x => {
                        return (
                            <Resource key={x.id} resources={this.props.resources} item={x}></Resource>
                        )
                    })
                }
                </div>
                <button className="resource-bar-button" style={{left: this.state.visible ? "15%":"0"}} onClick={this.toggleVisible}>Resources</button>
            </div>
        )
    }
}

export default ResourceBar