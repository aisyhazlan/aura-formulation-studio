/* =========================================================
   AURA FORMULATION QUEST
   COMPLETE GAME SCRIPT
========================================================= */


/* =========================================================
   INGREDIENT DATABASE
========================================================= */

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


/* =========================================================
   GAME STATE
========================================================= */

let selectedIngredients = [];

let selectedClient = null;

let reflectionChoice = null;

const budget = 20;


/* =========================================================
   START MISSION
========================================================= */

function startMission() {

    const landing = document.getElementById("landing");
    const game = document.getElementById("game");

    if (!landing || !game) {

        console.error(
            "Landing or game section not found."
        );

        return;
    }


    /*
    Hide landing page
    */

    landing.classList.add("hidden");


    /*
    Show game
    */

    game.classList.remove("hidden");


    /*
    Scroll to top
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /*
    Update progress
    */

    updateMissionProgress();

}


/* =========================================================
   SELECT CLIENT
========================================================= */

function selectClient(button, clientName) {

    if (!button) {
        return;
    }


    /*
    Remove previous selection
    */

    document
        .querySelectorAll(".client-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    /*
    Select current client
    */

    button.classList.add("selected");


    selectedClient = clientName;


    /*
    Show feedback
    */

    const clientResult =
        document.getElementById("clientResult");


    if (clientResult) {

        let message = "";


        if (clientName === "Lightweight Botanical") {

            message =
                "Good choice. Focus on lightweight botanical oils and a clean, elegant sensory profile.";

        }

        else if (clientName === "Sustainability First") {

            message =
                "Excellent. Prioritise upcycled ingredients, responsible choices and minimal fragrance.";

        }

        else if (clientName === "Luxury Botanical") {

            message =
                "A premium direction. Consider botanical ingredients that create a refined sensory experience.";

        }


        clientResult.textContent = message;

        clientResult.classList.remove("hidden");

    }


    /*
    Update progress
    */

    updateMissionProgress();


    /*
    Smooth scroll to Ingredient Vault
    */

    setTimeout(() => {

        const ingredientSection =
            document.getElementById("ingredients");

        if (ingredientSection) {

            ingredientSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }, 500);

}


/* =========================================================
   CREATE INGREDIENT CARDS
========================================================= */

function createIngredientCards() {

    const container =
        document.getElementById("ingredients");


    if (!container) {

        console.error(
            "Ingredient container not found."
        );

        return;

    }


    container.innerHTML = "";


    ingredients.forEach(
        (ingredient, index) => {

            const card =
                document.createElement("div");


            card.className =
                "ingredient";


            card.dataset.id =
                ingredient.id;


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
            Click card to flip
            */

            card.addEventListener(
                "click",
                function(event) {

                    /*
                    Jangan flip semula apabila
                    tekan Add to Formula
                    */

                    if (
                        event.target.closest(".add-button")
                    ) {

                        return;

                    }


                    card.classList.toggle(
                        "flipped"
                    );

                }
            );


            container.appendChild(card);

        }
    );

}


/* =========================================================
   ADD INGREDIENT
========================================================= */

function addIngredient(id, event) {

    if (event) {

        event.stopPropagation();

    }


    const ingredient =
        ingredients.find(
            item => item.id === id
        );


    if (!ingredient) {

        console.error(
            "Ingredient not found:",
            id
        );

        return;

    }


    /*
    Check duplicate
    */

    const alreadyAdded =
        selectedIngredients.some(
            item => item.id === id
        );


    if (alreadyAdded) {

        alert(
            "This ingredient is already in your formula."
        );

        return;

    }


    /*
    Check budget
    */

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


    /*
    Add ingredient
    */

    selectedIngredients.push(
        ingredient
    );


    /*
    Mark ingredient card as used
    */

    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {

        card.classList.add("used");

    }


    /*
    Update formula
    */

    updateFormula();


    /*
    Sustainability boost
    */

    if (id === "tamarind") {

        const sustainability =
            document.getElementById(
                "sustainabilityCard"
            );


        if (sustainability) {

            sustainability.classList.remove(
                "hidden"
            );

        }

    }


    /*
    Update progress
    */

    updateMissionProgress();

}


/* =========================================================
   CALCULATE TOTAL
========================================================= */

function calculateTotal() {

    return selectedIngredients.reduce(
        (total, ingredient) => {

            return total + ingredient.cost;

        },
        0
    );

}


/* =========================================================
   UPDATE FORMULA
========================================================= */

function updateFormula() {

    const selectedList =
        document.getElementById(
            "selectedList"
        );


    const ingredientCount =
        document.getElementById(
            "ingredientCount"
        );


    const budgetText =
        document.getElementById(
            "budgetText"
        );


    const budgetFill =
        document.getElementById(
            "fill"
        );


    const budgetMessage =
        document.getElementById(
            "budgetMessage"
        );


    const total =
        calculateTotal();


    /* =====================================================
       INGREDIENT COUNT
    ===================================================== */

    if (ingredientCount) {

        ingredientCount.textContent =
            `${selectedIngredients.length} ingredient${
                selectedIngredients.length === 1
                    ? ""
                    : "s"
            }`;

    }


    /* =====================================================
       BUDGET TEXT
    ===================================================== */

    if (budgetText) {

        budgetText.textContent =
            `RM${total.toFixed(2)}`;

    }


    /* =====================================================
       BUDGET PROGRESS BAR
    ===================================================== */

    if (budgetFill) {

        const percentage =
            Math.min(
                (total / budget) * 100,
                100
            );


        budgetFill.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       REMAINING BUDGET
    ===================================================== */

    if (budgetMessage) {

        const remaining =
            budget - total;


        if (remaining >= 0) {

            budgetMessage.textContent =
                `You have RM${remaining.toFixed(2)} remaining.`;

        }

        else {

            budgetMessage.textContent =
                `You are RM${Math.abs(remaining).toFixed(2)} over budget.`;

        }

    }


    /* =====================================================
       SELECTED INGREDIENT LIST
    ===================================================== */

    if (!selectedList) {

        return;

    }


    /*
    Empty state
    */

    if (
        selectedIngredients.length === 0
    ) {

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


    /*
    Clear previous list
    */

    selectedList.innerHTML = "";


    /*
    Create selected items
    */

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


            selectedList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   REMOVE INGREDIENT
========================================================= */

function removeIngredient(id) {

    selectedIngredients =
        selectedIngredients.filter(
            ingredient =>
                ingredient.id !== id
        );


    /*
    Remove used state from card
    */

    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {

        card.classList.remove(
            "used"
        );

    }


    /*
    Update formula
    */

    updateFormula();


    /*
    Sustainability
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


    /*
    Update progress
    */

    updateMissionProgress();

}


/* =========================================================
   ACTIVATE FORMULA
========================================================= */

function activateFormula() {

    const warning =
        document.getElementById(
            "activationWarning"
        );


    /*
    Check client
    */

    if (!selectedClient) {

        if (warning) {

            warning.textContent =
                "Please select a client profile before activating your formulation.";

        }

        alert(
            "Please select a client profile first."
        );

        return;

    }


    /*
    Check ingredients
    */

    if (
        selectedIngredients.length === 0
    ) {

        if (warning) {

            warning.textContent =
                "Please select at least one ingredient for your formula.";

        }

        alert(
            "Please select at least one ingredient."
        );

        return;

    }


    /*
    Check budget
    */

    const total =
        calculateTotal();


    if (total > budget) {

        if (warning) {

            warning.textContent =
                "Your formulation is over the RM20 budget.";

        }

        alert(
            "Your formulation is over the RM20 budget."
        );

        return;

    }


    /*
    Clear warning
    */

    if (warning) {

        warning.textContent = "";

    }


    /*
    Generate formula identity
    */

    generateFormulaResult();


    /*
    Show result
    */

    const resultCard =
        document.getElementById(
            "resultCard"
        );


    if (resultCard) {

        resultCard.classList.remove(
            "hidden"
        );

    }


    /*
    Update progress
    */

    updateMissionProgress();


    /*
    Scroll to result
    */

    setTimeout(() => {

        if (resultCard) {

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 200);


    /*
    Reveal reflection
    */

    setTimeout(() => {

        const reflection =
            document.getElementById(
                "reflection"
            );


        if (reflection) {

            reflection.classList.remove(
                "hidden"
            );

        }

    }, 800);

}


/* =========================================================
   GENERATE FORMULA RESULT
========================================================= */

function generateFormulaResult() {

    const identityTitle =
        document.getElementById(
            "identityTitle"
        );


    const identityText =
        document.getElementById(
            "identityText"
        );


    const badgeName =
        document.getElementById(
            "badgeName"
        );


    const auraResultMessage =
        document.getElementById(
            "auraResultMessage"
        );


    const hasTamarind =
        selectedIngredients.some(
            ingredient =>
                ingredient.id === "tamarind"
        );


    const hasCarrier =
        selectedIngredients.some(
            ingredient =>
                ingredient.id === "almond"
        );


    const hasAntioxidant =
        selectedIngredients.some(
            ingredient =>
                ingredient.id === "vitaminE"
        );


    let identity =
        "Botanical Formulator";


    let description =
        "You created a thoughtful botanical formulation by balancing ingredient roles, client needs and budget.";


    let auraMessage =
        "Excellent formulation thinking! You considered the purpose of each ingredient instead of choosing randomly.";


    /*
    =========================================================
    SUSTAINABILITY IDENTITY
    =========================================================
    */

    if (
        selectedClient === "Sustainability First" &&
        hasTamarind
    ) {

        identity =
            "Green Innovator";


        description =
            "Your formulation demonstrates a strong sustainability mindset by incorporating an upcycled ingredient while keeping the formula within budget.";


        auraMessage =
            "Excellent! You connected cosmetic innovation with responsible ingredient choices.";

    }


    /*
    =========================================================
    LUXURY IDENTITY
    =========================================================
    */

    else if (
        selectedClient === "Luxury Botanical" &&
        (
            selectedIngredients.some(
                ingredient =>
                    ingredient.id === "geranium"
            )
            ||
            selectedIngredients.some(
                ingredient =>
                    ingredient.id === "vanilla"
            )
        )
    ) {

        identity =
            "Luxury Alchemist";


        description =
            "Your formulation focuses on creating a premium botanical identity with attention to sensory experience.";


        auraMessage =
            "Beautiful formulation direction! You considered not only function, but also the sensory identity of the final product.";

    }


    /*
    =========================================================
    LIGHTWEIGHT IDENTITY
    =========================================================
    */

    else if (
        selectedClient === "Lightweight Botanical" &&
        hasCarrier
    ) {

        identity =
            "Botanical Strategist";


        description =
            "Your formulation shows a clear understanding of building a lightweight botanical concept around a suitable carrier oil.";


        auraMessage =
            "Well done! You built your formulation around the client's desired lightweight botanical experience.";

    }


    /*
    =========================================================
    ANTIOXIDANT BONUS
    =========================================================
    */

    if (
        hasAntioxidant &&
        identity === "Botanical Formulator"
    ) {

        identity =
            "Formula Strategist";


        description =
            "You demonstrated thoughtful formulation strategy by combining botanical ingredients with an ingredient selected for formulation stability.";


        auraMessage =
            "Smart choice! Good formulation thinking means considering both the concept and the technical role of ingredients.";

    }


    /*
    =========================================================
    TAMARIND BONUS
    =========================================================
    */

    if (
        hasTamarind &&
        identity === "Botanical Formulator"
    ) {

        identity =
            "Green Innovator";


        description =
            "You identified an upcycling opportunity and incorporated it into your cosmetic innovation journey.";


        auraMessage =
            "Great sustainability thinking! You gave a discarded material a second life.";

    }


    /*
    UPDATE UI
    */

    if (identityTitle) {

        identityTitle.textContent =
            identity;

    }


    if (badgeName) {

        badgeName.textContent =
            identity;

    }


    if (identityText) {

        identityText.textContent =
            description;

    }


    if (auraResultMessage) {

        auraResultMessage.textContent =
            auraMessage;

    }

}


/* =========================================================
   REFLECTION
========================================================= */

function reflect(choice) {

    reflectionChoice =
        choice;


    const reflectionText =
        document.getElementById(
            "reflectionText"
        );


    if (!reflectionText) {

        return;

    }


    let message = "";


    switch (choice) {

        case "Reduce environmental impact":

            message =
                "Great reflection. Consider increasing upcycled ingredients, reducing unnecessary fragrance components and thinking about responsible sourcing.";

            break;


        case "Improve formulation strategy":

            message =
                "Good thinking. Revisit the functional role of every ingredient and ask whether each component contributes something meaningful to the final formula.";

            break;


        case "Reduce production cost":

            message =
                "Excellent commercial thinking. Look for ingredients that provide multiple benefits while keeping the total formulation cost within the target budget.";

            break;


        case "Better match the client":

            message =
                "Strong formulation mindset. The best formula is not simply the one with the most attractive ingredients — it is the one that best solves the client's needs.";

            break;


        default:

            message =
                "Reflection recorded. Keep thinking like a formulator.";

    }


    reflectionText.textContent =
        message;


    reflectionText.classList.remove(
        "hidden"
    );


    /*
    Update progress to complete
    */

    updateMissionProgress();


    /*
    Scroll reflection result into view
    */

    setTimeout(() => {

        reflectionText.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* =========================================================
   MISSION PROGRESS
========================================================= */

function updateMissionProgress() {

    const progressBar =
        document.getElementById(
            "missionProgress"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    let progress = 0;


    /*
    Client selected
    */

    if (selectedClient) {

        progress += 25;

    }


    /*
    Ingredients selected
    */

    if (
        selectedIngredients.length > 0
    ) {

        progress += 25;

    }


    /*
    Formula activated
    */

    const resultCard =
        document.getElementById(
            "resultCard"
        );


    if (
        resultCard &&
        !resultCard.classList.contains("hidden")
    ) {

        progress += 25;

    }


    /*
    Reflection completed
    */

    if (reflectionChoice) {

        progress += 25;

    }


    /*
    Update progress bar
    */

    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    /*
    Update percentage
    */

    if (progressText) {

        progressText.textContent =
            `${progress}%`;

    }

}


/* =========================================================
   INITIALISE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
        Create ingredient cards
        */

        createIngredientCards();


        /*
        Initialise formula
        */

        updateFormula();


        /*
        Initialise progress
        */

        updateMissionProgress();

    }
);
