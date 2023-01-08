let allRecipes = []

class Recipe {
    constructor(ingredientNumber, yields) {
        this.ingredientNumber = ingredientNumber
        this.yields = yields
        this.ingredients = []
        allRecipes.push(this)
    }

    getIngredients() {
        return this.ingredients
    }

    getYields() {
        return this.yields
    }

    addIngredient(item, count) {
        this.ingredients.push({
            "item": item,
            "count": count
        })
    }
}

export { Recipe, allRecipes }