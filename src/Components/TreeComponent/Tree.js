import React from "react"
import TreeNode from "../TreeNodeComponent/TreeNode"
import ResourceBar from "../ResourceBarComponent/ResourceBar"
import Resources from "../../Classes/Resources"
import "./Tree.css"

class Tree extends React.Component {
    constructor() {
        super()

        this.state = {
            resources: new Resources(),
            ref: React.createRef()
        }
    }

    render() {
        return (
            <div className="tree">
                <ResourceBar resources={this.state.resources}></ResourceBar>
                <TreeNode ref={this.state.ref} resources={this.state.resources} mult={1} req={1} modable={true} item={null}></TreeNode>
            </div>
        )
    }
}

export default Tree