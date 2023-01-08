import React from "react"
import Overlay from '../OverlayComponent/Overlay'
import Selector from "../SelectorComponent/Selector"
import Items from "../../Classes/Items"
import Sources from "../../Classes/Sources"
import { Recipe } from "../../Classes/Recipe"
import './Creator.css'

class Creator extends React.Component {
    constructor() {
        super()

        this.state = {
            source: null,
            selecting: false,
            yields: 1,
            ingredientCount: 0,
            type: "None",
            ingredients: [],
            ingredientNum: -1,
            name: "",
            passdown: this.setSource
        }
        this.defaultState = this.state

        this.setYield = this.setYield.bind(this)
        this.selectSource = this.selectSource.bind(this)
        this.setSource = this.setSource.bind(this)
        this.selectIngredient = this.selectIngredient.bind(this)
        this.setIngredientCount = this.setIngredientCount.bind(this)
        this.setIngredientAmount = this.setIngredientAmount.bind(this)
        this.finishItem = this.finishItem.bind(this)
        this.finishSource = this.finishSource.bind(this)
        this.setName = this.setName.bind(this)
        this.setIngredient = this.setIngredient.bind(this)
    }

    setYield(e) {
        this.setState({
            yields: e.target.value
        })
    }

    setName(e) {
        this.setState({
            name: e.target.value
        })
    }

    finishSource() {
        let { name } = this.state
        if(name === "") {
            alert("Source must have a name!")
            return
        }

        let id = Sources.addSource(name)
        this.props.destination(Sources.getSource(id))
        this.setState(this.defaultState)
    }

    finishItem() {
        let { yields, name, source, ingredients, ingredientCount } = this.state

        if(yields <= 0) {
            alert("Recipe must produce at least 1 item!")
            return
        }
        if(name === "") {
            alert("Item must have a name!")
            return
        }
        if(source === null) {
            alert("Please select a source!")
            return
        }
        if(ingredients.length !== 0) {
            for(let i = 0; i < ingredients.length; i++) {
                let { id, count } = ingredients[i]
                if(count <= 0) {
                    alert(`Recipe can't require 0 or less of an ingredient(Ingredient ${i+1})!`)
                    return
                }
                if(id === -1) {
                    alert(`All ingredients must have an item selected(Ingredient ${i+1})!`)
                    return
                }
            }
        }

        let recipe = new Recipe(
            +ingredientCount,
            yields
        )

        ingredients.forEach(ingredient => {
            recipe.addIngredient(ingredient.id, ingredient.num)
        })

        let id = Items.addItem(name, recipe, ingredientCount, source.getID())
        this.props.destination(Items.getItem(id))
        this.setState(this.defaultState)
    }

    selectIngredient(e) {
        this.setState({
            selecting: true,
            type: "item",
            passdown: this.setIngredient,
            ingredientNum: e.target.id
        })
    }

    setIngredientCount(e) {
        this.setState({
            ingredientCount: e.target.value,
            ingredients: e.target.value > this.state.ingredientCount ? (
                [...this.state.ingredients, {"id": -1, "num": 1}]
            ):(
                this.state.ingredients.slice(0, e.target.value)
            )
        })
    }

    setIngredient(item) {
        this.setState({
            ingredients: this.state.ingredients.map((x, i) => i === +this.state.ingredientNum ? {"id": item.getID(), "num": x.num}:x),
            selecting: false
        })
    }

    setIngredientAmount(e) {
        this.setState({
            ingredients: this.state.ingredients.map((x, i) => i === +e.target.id ? {"id": x.id, "num": +e.target.value}:x)
        })
    }

    selectSource() {
        this.setState({
            selecting: true,
            type: "source",
            passdown: this.setSource
        })
    }

    setSource(source) {
        this.setState({
            source: source,
            selecting: false
        })
    }

    render() {
        return (
            <div className="creator" style={{display: this.props.show ? 'block':'none'}}>
                <Overlay show={this.props.show && !this.state.selecting} />
                <div className="creator-content">
                    <h3>Creating {this.props.type === "item" ? "an":"a"} {this.props.type}</h3>
                    {
                        this.props.type === "item" ? (
                            <div className="creator-fields">
                                <span>Name: <input type={"text"} value={this.state.name} onChange={this.setName}></input></span>
                                <span>Source: <button onClick={this.selectSource}>{this.state.source === null ? "None":this.state.source.getName()}</button></span>
                                <span>Yield: <input type={"number"} min={1} onChange={this.setYield} value={this.state.yields}/></span>
                                <span>Ingredients: <input type={"number"} min={0} onChange={this.setIngredientCount} value={this.state.ingredientCount}/></span>
                                {
                                    Array.from(Array(+this.state.ingredientCount).keys()).reduce((a, i) => a.concat(i, i), []).map((ingredientNo, i) => {
                                        return i % 2 === 0 ? (
                                            <span key={ingredientNo}>Ingredient {ingredientNo+1}: <button id={ingredientNo} onClick={this.selectIngredient}>{this.state.ingredients[ingredientNo].id === -1 ? "None":Items.getItem(this.state.ingredients[ingredientNo].id).getName()}</button></span>
                                        ):(
                                            <span key={`${ingredientNo}-1`}>Amount: <input type={"number"} id={ingredientNo} min={0} onChange={this.setIngredientAmount} defaultValue={1}/></span>
                                        )                                       
                                    })
                                }
                                <span></span>
                                <span><button onClick={this.finishItem}>Done</button></span>
                            </div>
                        ):(
                            <div className="creator-fields">
                                <span>Name: <input type={"text"} value={this.state.name} onChange={this.setName}></input></span>
                                <span><button onClick={this.finishSource}>Done</button></span>
                            </div>
                        )
                    }
                </div>
                {this.props.type === "item" ? <Selector destination={this.state.passdown} show={this.state.selecting} type={this.state.type} />:null}
            </div>
        )
    }
}

export default Creator