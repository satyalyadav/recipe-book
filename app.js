class Recipe {
    constructor(name, ingredients, instructions) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.id = Date.now();
    }
}

class RecipeBook {
    constructor() {
        this.recipes = [];
        this.loadRecipes();
        this.setupEventListeners();
        this.renderRecipes();
    }

    loadRecipes() {
        const savedRecipes = localStorage.getItem('recipes');
        if (savedRecipes) {
            this.recipes = JSON.parse(savedRecipes);
        }
    }

    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    addRecipe(name, ingredients, instructions) {
        const recipe = new Recipe(name, ingredients, instructions);
        this.recipes.push(recipe);
        this.saveRecipes();
        this.renderRecipes();
    }

    deleteRecipe(id) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.saveRecipes();
        this.renderRecipes();
    }

    renderRecipes() {
        const recipesDiv = document.getElementById('recipes');
        recipesDiv.innerHTML = '';

        this.recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <h4>Ingredients:</h4>
                <p>${recipe.ingredients}</p>
                <h4>Instructions:</h4>
                <p>${recipe.instructions}</p>
                <button onclick="recipeBook.deleteRecipe(${recipe.id})">Delete Recipe</button>
            `;
            recipesDiv.appendChild(recipeCard);
        });
    }

    setupEventListeners() {
        const form = document.getElementById('recipe-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('recipe-name').value;
            const ingredients = document.getElementById('recipe-ingredients').value;
            const instructions = document.getElementById('recipe-instructions').value;
            
            this.addRecipe(name, ingredients, instructions);
            form.reset();
        });
    }
}

const recipeBook = new RecipeBook();