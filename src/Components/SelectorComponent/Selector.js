import React from "react"
import Overlay from '../OverlayComponent/Overlay'
import Creator from "../CreatorComponent/Creator"
import Items from "../../Classes/Items"
import Sources from "../../Classes/Sources"
import './Selector.css'

class Selector extends React.Component {
    constructor() {
        super()

        this.state = {
            creating: false
        }
        this.defaultState = this.state

        this.create = this.create.bind(this)
        this.created = this.created.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.selectSource = this.selectSource.bind(this)
    }

    created(obj) {
        this.props.destination(obj)
        this.setState(this.defaultState)
    }

    selectItem(item) {
        this.props.destination(item)
        this.setState(this.defaultState)
    }

    selectSource(source) {
        this.props.destination(source)
        this.setState(this.defaultState)
    }

    create() {
        this.setState({
            creating: true
        })
    }

    render() {
        return (
            <div className="selector" style={{display: this.props.show ? 'block':'none'}}>
                <Overlay show={this.props.show && !this.state.creating} />
                <div className="selector-content">
                    <h3>Select {this.props.type === "item" ? "an":"a"} {this.props.type}</h3>
                    <div className="selector-grid">
                        {
                            this.props.type === "item" ? (
                                Items.getItems().map(item => {
                                    return <button key={item.getID()} onClick={() => this.selectItem(item)}>{item.getName()}</button>
                                })
                            ):(
                                Sources.getSources().map(source => {
                                    return <button key={source.getID()} onClick={() => this.selectSource(source)}>{source.getName()}</button>
                                })
                            )
                        }
                        <button onClick={this.create}><strong>New</strong></button>
                    </div>
                </div>
                <Creator destination={this.created} show={this.state.creating} type={this.props.type} />
            </div>
        )
    }
}

export default Selector