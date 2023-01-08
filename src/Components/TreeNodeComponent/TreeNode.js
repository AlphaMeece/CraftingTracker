import React from "react"
import Selector from "../SelectorComponent/Selector"
import Sources from "../../Classes/Sources"
import Items from "../../Classes/Items"
import './TreeNode.css'

class TreeNode extends React.Component {
    constructor() {
        super()

        this.state = {
            children: [],
            source: null,
            picking: false,
            item: null,
            quantity: 1,
            checked: false,
        }
        this.defaultState = this.state

        this.pickItem = this.pickItem.bind(this)
        this.picked = this.picked.bind(this)
        this.newQuantity = this.newQuantity.bind(this)
        this.check = this.check.bind(this)
    }

    check(e) {
        this.setState({
            checked: e.target.checked
        })
    }

    pickItem() {
        this.props.resources.clearRequirements()
        this.props.resources.clearResources()
        this.setState({
            children: [],
            picking: true
        })
    }

    newQuantity(e) {
        this.setState({
            quantity: +e.target.value
        })
    }

    picked(item) {
        this.setState({
            picking: false,
            item: item,
            source: Sources.getSource(item.getSource()),
            children: item.getIngredientCount() === 0 ? []:item.getRecipe().getIngredients().map(x => { return { ...x, ref: React.createRef() } }),
            quantity: 1
        })

        if(item.getIngredientCount === 0) this.props.resources.addRequirement(item.getID(), 1)
    }

    componentDidMount() {
        if(this.props.item !== null && this.props.item !== undefined) {
            let item = Items.getItem(+this.props.item)
            if(item.getIngredientCount() !== 0) {
                this.setState({
                    children: item.getRecipe().getIngredients().map(x => { return { ...x, ref: React.createRef() } }),
                })
            } else {
                this.props.resources.addRequirement(item.getID(), this.props.mult * this.props.req)
            }
            this.setState({
                item: item,
                source: Sources.getSource(item.getSource()),
                quantity: this.props.mult * this.props.req,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.mult !== this.props.mult) {
            if(this.props.item !== null && this.props.item !== undefined) {
                let item = Items.getItem(+this.props.item)
                if(item.getIngredientCount() !== 0) {
                    this.setState({
                        children: item.getRecipe().getIngredients().map(x => { return { ...x, ref: React.createRef() } }),
                    })
                } else {
                    this.props.resources.addRequirement(item.getID(), this.props.mult * this.props.req - prevProps.mult * prevProps.req)
                }
                this.setState({
                    item: item,
                    source: Sources.getSource(item.getSource()),
                    quantity: this.props.mult * this.props.req,
                })
            }
        }
    }

    render() {
        return (
            <div className="tree-node">
                <Selector destination={this.picked} show={this.state.picking} type="item" />
                <div className="tree-node-value">
                    <label className="b-contain">
                        <input type="checkbox" checked={this.state.checked} onChange={this.check} />
                        <div className="b-input"></div>
                    </label>
                    <button className="tree-node-item-name" onClick={this.pickItem}>{this.state.item === null ? "None":this.state.item.getName()}</button>
                    <br />
                    <span>Source: {this.state.source === null ? "None":this.state.source.getName()}</span>
                    <br />
                    {
                        <span className="tree-node-quantity">X{this.props.modable ? <input type={"number"} min={1} onChange={this.newQuantity} value={this.state.quantity} />:this.state.quantity}</span>
                    }
                </div>
                <div className="tree-node-children">
                    {this.state.children.length > 0 ? (
                        this.state.children.map((child, i) => {
                            return <TreeNode ref={child.ref} resources={this.props.resources} modable={false} req={child.count} mult={this.state.quantity} key={`${child.item}-${i}`} item={child.item}></TreeNode>
                        })
                    ):null
                    }
                </div>  
            </div>
        )
    }
}

export default TreeNode