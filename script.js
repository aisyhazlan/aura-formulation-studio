const ingredients = [
    {
        id: "almond",
        name: "Sweet Almond Oil",
        icon: "🌰",
        cost: 3.00,
        clue: "A lightweight botanical carrier oil commonly used in cosmetic formulations.",
        role: "Carrier Oil"
    },

    {
        id: "hibiscus",
        name: "Hibiscus Oil",
        icon: "🌺",
        cost: 3.50,
        clue: "A botanical oil that can contribute to a premium botanical beauty concept.",
        role: "Botanical Oil"
    },

    {
        id: "gromwell",
        name: "Gromwell Root",
        icon: "🌿",
        cost: 2.50,
        clue: "A botanical root ingredient that supports a plant-based cosmetic concept.",
        role: "Botanical Ingredient"
    },

    {
        id: "tamarind",
        name: "Tamarind Seed Extract",
        icon: "♻️",
        cost: 1.50,
        clue: "An upcycled ingredient that gives a discarded material a second life.",
        role: "Upcycled Ingredient"
    },

    {
        id: "vitaminE",
        name: "Vitamin E",
        icon: "✨",
        cost: 2.00,
        clue: "An ingredient commonly associated with supporting the stability of oil-based cosmetic formulations.",
        role: "Antioxidant"
    },

    {
        id: "geranium",
        name: "Rose Geranium",
        icon: "🌹",
        cost: 4.00,
        clue: "An aromatic botanical ingredient that contributes to the sensory experience of a formulation.",
        role: "Essential Oil"
    },

    {
        id: "vanilla",
        name: "Vanilla",
        icon: "🍦",
        cost: 3.00,
        clue: "A warm aromatic note that can contribute to the sensory identity of a cosmetic product.",
        role: "Fragrance Note"
    }
];


let selectedIngredients = [];

const budget = 20;


/* =========================================
   CREATE INGREDIENT CARDS
========================================= */

function createIngredientCards() {

    const container = document.getElementById("ingredients");

    if (!container) {
        console.error("Ingredient container not found.");
        return;
    }

    container.innerHTML = "";

    ingredients.forEach((ingredient, index) => {

        const card = document.createElement("div");

        card.className = "ingredient";

        card.dataset.id = ingredient.id;

        card.innerHTML = `

            <div class="ingredient-inner">

                <!-- FRONT -->

                <div class="ingredient-front">

                    <div class="ingredient-icon">
                        ${ingredient.icon}
                    </div>

                    <span class="ingredient-number">
                        INGREDIENT 0${index + 1}
                    </span>

                    <h3>
                        ${ingredient.name}
                    </h3>

                    <p>
                        Tap to Discover
                    </p>

                </div>


                <!-- BACK -->

                <div class="ingredient-back">

                    <span class="ingredient-number">
                        INGREDIENT CLUE
                    </span>

                    <h3>
                        ${ingredient.name}
                    </h3>

                    <p>
                        ${ingredient.clue}
                    </p>

                    <p>
                        <strong>Role:</strong>
                        ${ingredient.role}
                    </p>

                    <button
                        type="button"
                        class="add-button"
                        onclick="addIngredient('${ingredient.id}', event)">
                        + Add to Formula
                    </button>

                </div>

            </div>
        `;


        /*
        =========================================
        TAP / CLICK TO DISCOVER
        =========================================
        */

        card.addEventListener("click", function(event) {

            // Jangan flip semula apabila tekan Add to Formula
            if (
                event.target.classList.contains("add-button")
            ) {
                return;
            }

            card.classList.toggle("flipped");

        });


        container.appendChild(card);

    });

}


/* =========================================
   ADD INGREDIENT
========================================= */

function addIngredient(id, event) {

    if (event) {
        event.stopPropagation();
    }

    const ingredient =
        ingredients.find(item => item.id === id);

    if (!ingredient) {
        return;
    }


    const alreadyAdded =
        selectedIngredients.some(
            item => item.id === id
        );


    if (alreadyAdded) {

        alert("This ingredient is already in your formula.");

        return;

    }


    const currentTotal =
        calculateTotal();


    if (
        currentTotal + ingredient.cost > budget
    ) {

        alert(
            "This ingredient would exceed your RM20 formulation budget."
        );

        return;

    }


    selectedIngredients.push(ingredient);


    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {
        card.classList.add("used");
    }


    updateFormula();


    /*
    =========================================
    SUSTAINABILITY
    =========================================
    */

    if (id === "tamarind") {

        const sustainability =
            document.getElementById(
                "sustainabilityCard"
            );

        if (sustainability) {
            sustainability.classList.remove("hidden");
        }

    }

}


/* =========================================
   CALCULATE TOTAL
========================================= */

function calculateTotal() {

    return selectedIngredients.reduce(
        (total, ingredient) => {

            return total + ingredient.cost;

        },
        0
    );

}


/* =========================================
   UPDATE FORMULA
========================================= */

function updateFormula() {

    const selectedList =
        document.getElementById("selectedList");

    const ingredientCount =
        document.getElementById("ingredientCount");

    const budgetText =
        document.getElementById("budgetText");

    const budgetFill =
        document.getElementById("fill");

    const budgetMessage =
        document.getElementById("budgetMessage");


    const total =
        calculateTotal();


    /*
    INGREDIENT COUNT
    */

    if (ingredientCount) {

        ingredientCount.textContent =
            `${selectedIngredients.length} ingredient${
                selectedIngredients.length === 1
                    ? ""
                    : "s"
            }`;

    }


    /*
    BUDGET
    */

    if (budgetText) {

        budgetText.textContent =
            `RM${total.toFixed(2)}`;

    }


    if (budgetFill) {

        const percentage =
            Math.min(
                (total / budget) * 100,
                100
            );

        budgetFill.style.width =
            `${percentage}%`;

    }


    if (budgetMessage) {

        const remaining =
            budget - total;

        budgetMessage.textContent =
            `You have RM${remaining.toFixed(2)} remaining.`;

    }


    /*
    SELECTED INGREDIENT LIST
    */

    if (!selectedList) {
        return;
    }


    if (selectedIngredients.length === 0) {

        selectedList.innerHTML = `

            <div class="empty-state">

                <span>+</span>

                <p>
                    Select ingredients<br>
                    from the Ingredient Vault
                </p>

            </div>

        `;

        return;

    }


    selectedList.innerHTML = "";


    selectedIngredients.forEach(
        ingredient => {

            const item =
                document.createElement("div");

            item.className =
                "selected-item";


            item.innerHTML = `

                <span>
                    ${ingredient.icon}
                    ${ingredient.name}
                </span>

                <span>
                    RM${ingredient.cost.toFixed(2)}

                    <button
                        type="button"
                        onclick="removeIngredient('${ingredient.id}')">
                        REMOVE
                    </button>
                </span>

            `;


            selectedList.appendChild(item);

        }
    );

}


/* =========================================
   REMOVE INGREDIENT
========================================= */

function removeIngredient(id) {

    selectedIngredients =
        selectedIngredients.filter(
            ingredient =>
                ingredient.id !== id
        );


    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {
        card.classList.remove("used");
    }


    updateFormula();


    /*
    Hide sustainability card
    if Tamarind is removed
    */

    const hasTamarind =
        selectedIngredients.some(
            ingredient =>
                ingredient.id === "tamarind"
        );


    if (!hasTamarind) {

        const sustainability =
            document.getElementById(
                "sustainabilityCard"
            );

        if (sustainability) {

            sustainability.classList.add(
                "hidden"
            );

        }

    }

}


/* =========================================
   INITIALISE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createIngredientCards();

    }
);
