import React from "react";
import Items from "../../Classes/Items";
import Resources from "../../Classes/Resources";
import './Resource.css'

class Resource extends React.Component {
    constructor() {
        super()

        this.state = {
            count: 0
        }

        this.updateCount = this.updateCount.bind(this)
    }

    

    updateCount(e) {
        this.setState({
            count: e.target.value
        })
    }

    render() {
        return (
            <div className="resource">
                <h4>{Items.getItem(this.props.item.id).getName()}</h4>
                <input type={"number"} min={0} onChange={this.updateCount} value={this.state.count}></input>/{this.props.resources.getRequirement(this.props.item.id) !== undefined ? this.props.resources.getRequirement(this.props.item.id).required:0}
            </div>
        )
    }
}

export default Resource