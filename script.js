/* =========================================
   AURA FORMULATION QUEST
   MISSION 01
========================================= */


/* =========================================
   INGREDIENT DATABASE
========================================= */

const ingredients = [

    {
        id: "almond",
        name: "Sweet Almond Oil",
        icon: "🌰",
        cost: 3.00,
        clue: "I am a lightweight botanical oil commonly used as a carrier oil.",
        role: "Carrier Oil"
    },

    {
        id: "hibiscus",
        name: "Hibiscus Oil",
        icon: "🌺",
        cost: 3.50,
        clue: "I bring a botanical character to a premium nail-care concept.",
        role: "Botanical Oil"
    },

    {
        id: "gromwell",
        name: "Gromwell Root",
        icon: "🌿",
        cost: 2.50,
        clue: "I come from a botanical root and can contribute to a plant-based beauty concept.",
        role: "Botanical Ingredient"
    },

    {
        id: "tamarind",
        name: "Tamarind Seed Extract",
        icon: "♻",
        cost: 1.50,
        clue: "I give a discarded material a second life through upcycling.",
        role: "Upcycled Ingredient"
    },

    {
        id: "vitaminE",
        name: "Vitamin E",
        icon: "✨",
        cost: 2.00,
        clue: "I am commonly associated with supporting the stability of oil-based cosmetic formulations.",
        role: "Antioxidant"
    },

    {
        id: "geranium",
        name: "Rose Geranium",
        icon: "🌹",
        cost: 4.00,
        clue: "I contribute to the sensory and aromatic experience of a formulation.",
        role: "Essential Oil"
    },

    {
        id: "vanilla",
        name: "Vanilla",
        icon: "🍦",
        cost: 3.00,
        clue: "I contribute a warm and comforting aromatic character.",
        role: "Fragrance Note"
    }

];


/* =========================================
   VARIABLES
========================================= */

let selectedIngredients = [];

let selectedClient = "";

const budget = 20;


/* =========================================
   PAGE ELEMENTS
========================================= */

const ingredientContainer =
    document.getElementById("ingredients");

const selectedList =
    document.getElementById("selectedList");

const budgetText =
    document.getElementById("budgetText");

const budgetFill =
    document.getElementById("fill");

const budgetMessage =
    document.getElementById("budgetMessage");

const ingredientCount =
    document.getElementById("ingredientCount");

const missionProgress =
    document.getElementById("missionProgress");

const progressText =
    document.getElementById("progressText");


/* =========================================
   CREATE INGREDIENT CARDS
========================================= */

function createIngredientCards() {

    ingredientContainer.innerHTML = "";

    ingredients.forEach((ingredient, index) => {

        const card = document.createElement("div");

        card.className = "ingredient";

        card.dataset.id = ingredient.id;

        card.innerHTML = `

            <div class="ingredient-inner">

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
                        Click to discover
                    </p>

                </div>


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

                    <button
                        class="add-button"
                        onclick="addIngredient('${ingredient.id}', event)">
                        + Add to Formula
                    </button>

                </div>

            </div>

        `;


        card.addEventListener("click", function () {

            card.classList.toggle("flipped");

        });


        ingredientContainer.appendChild(card);

    });

}


/* =========================================
   START MISSION
========================================= */

function startMission() {

    document.getElementById("landing")
        .classList.add("hidden");

    document.getElementById("game")
        .classList.remove("hidden");

    updateProgress(10);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   SELECT CLIENT
========================================= */

function selectClient(element, clientName) {

    document
        .querySelectorAll(".client-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    element.classList.add("selected");

    selectedClient = clientName;


    const result =
        document.getElementById("clientResult");


    result.classList.remove("hidden");


    result.innerHTML = `

        <strong>✦ Aura Study Buddy</strong>

        <br>

        Excellent choice.

        Your formulation should now consider:

        <strong>${clientName}</strong>.

    `;


    updateProgress(25);

}


/* =========================================
   ADD INGREDIENT
========================================= */

function addIngredient(id, event) {

    event.stopPropagation();


    const ingredient =
        ingredients.find(item => item.id === id);


    if (!ingredient) {
        return;
    }


    const alreadyAdded =
        selectedIngredients.some(item => item.id === id);


    if (alreadyAdded) {

        showTemporaryMessage(
            "This ingredient is already in your formula."
        );

        return;

    }


    const currentTotal =
        calculateTotal();


    if (currentTotal + ingredient.cost > budget) {

        showTemporaryMessage(
            "Your formulation budget would be exceeded. Try another ingredient."
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


    if (id === "tamarind") {

        document
            .getElementById("sustainabilityCard")
            .classList.remove("hidden");

    }


    updateProgress(55);

}


/* =========================================
   REMOVE INGREDIENT
========================================= */

function removeIngredient(id) {

    selectedIngredients =
        selectedIngredients.filter(
            ingredient => ingredient.id !== id
        );


    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {
        card.classList.remove("used");
    }


    updateFormula();


    const hasTamarind =
        selectedIngredients.some(
            ingredient => ingredient.id === "tamarind"
        );


    if (!hasTamarind) {

        document
            .getElementById("sustainabilityCard")
            .classList.add("hidden");

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

    const total =
        calculateTotal();


    ingredientCount.textContent =
        `${selectedIngredients.length} ingredient${selectedIngredients.length === 1 ? "" : "s"}`;


    budgetText.textContent =
        `RM${total.toFixed(2)}`;


    const percentage =
        Math.min((total / budget) * 100, 100);


    budgetFill.style.width =
        `${percentage}%`;


    if (total === 0) {

        budgetMessage.textContent =
            "You have RM20.00 remaining.";

    }

    else if (total < budget) {

        const remaining =
            budget - total;

        budgetMessage.textContent =
            `You have RM${remaining.toFixed(2)} remaining.`;

    }

    else {

        budgetMessage.textContent =
            "Your budget is fully allocated.";

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


    selectedIngredients.forEach(ingredient => {

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
                    onclick="removeIngredient('${ingredient.id}')">
                    REMOVE
                </button>

            </span>

        `;


        selectedList.appendChild(item);

    });


    updateBeaker();

}


/* =========================================
   UPDATE BEAKER
========================================= */

function updateBeaker() {

    const beaker =
        document.getElementById("beaker");


    const count =
        selectedIngredients.length;


    if (count === 0) {

        beaker.style.boxShadow =
            "0 0 40px rgba(117, 84, 173, 0.7)";

    }

    else if (count <= 2) {

        beaker.style.boxShadow =
            "0 0 50px rgba(201, 166, 75, 0.5)";

    }

    else {

        beaker.style.boxShadow =
            "0 0 80px rgba(117, 84, 173, 0.9)";

    }

}


/* =========================================
   ACTIVATE FORMULATION
========================================= */

function activateFormula() {

    const warning =
        document.getElementById("activationWarning");


    if (selectedClient === "") {

        warning.textContent =
            "Please select a client profile first.";

        return;

    }


    if (selectedIngredients.length < 2) {

        warning.textContent =
            "Please discover and select at least 2 ingredients.";

        return;

    }


    const total =
        calculateTotal();


    if (total > budget) {

        warning.textContent =
            "Your formulation is over budget.";

        return;

    }


    warning.textContent = "";


    const resultCard =
        document.getElementById("resultCard");


    const reflection =
        document.getElementById("reflection");


    const hasTamarind =
        selectedIngredients.some(
            ingredient => ingredient.id === "tamarind"
        );


    const hasGeranium =
        selectedIngredients.some(
            ingredient => ingredient.id === "geranium"
        );


    const hasGromwell =
        selectedIngredients.some(
            ingredient => ingredient.id === "gromwell"
        );


    let identityTitle;

    let identityText;

    let auraMessage;


    if (hasTamarind) {

        identityTitle =
            "Green Innovator";

        identityText =
            "You prioritised sustainability while building a botanical formulation.";

        auraMessage =
            "You identified an opportunity to connect cosmetic innovation with upcycling. That's strong sustainability thinking!";

    }

    else if (
        hasGeranium &&
        selectedClient === "Luxury Botanical"
    ) {

        identityTitle =
            "Botanical Formulator";

        identityText =
            "You created a formulation direction focused on botanical character and premium sensory experience.";

        auraMessage =
            "Your choices show strong awareness of the sensory side of cosmetic product development.";

    }

    else if (hasGromwell) {

        identityTitle =
            "Creative Formulator";

        identityText =
            "You explored botanical ingredients to create a distinctive formulation concept.";

        auraMessage =
            "Creative formulation starts with curiosity. You explored your ingredients thoughtfully.";

    }

    else {

        identityTitle =
            "Client-Centred Formulator";

        identityText =
            "You focused on creating a formulation that responds to the needs of your chosen client.";

        auraMessage =
            "You kept your client's needs at the centre of your formulation decisions. Excellent!";

    }


    document.getElementById("identityTitle")
        .textContent = identityTitle;


    document.getElementById("identityText")
        .textContent = identityText;


    document.getElementById("badgeName")
        .textContent = identityTitle;


    document.getElementById("auraResultMessage")
        .textContent = auraMessage;


    resultCard.classList.remove("hidden");


    reflection.classList.remove("hidden");


    updateProgress(80);


    setTimeout(() => {

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* =========================================
   REFLECTION
========================================= */

function reflect(choice) {

    const reflectionText =
        document.getElementById("reflectionText");


    reflectionText.classList.remove("hidden");


    reflectionText.innerHTML = `

        <strong>✦ Aura Study Buddy</strong>

        <br><br>

        Excellent reflection.

        Your second iteration focuses on:

        <strong>${choice}</strong>.

        <br><br>

        Remember:

        great formulation is not about getting
        everything right on the first attempt.

        It is about making informed decisions,
        evaluating the result and improving it.

    `;


    updateProgress(100);


    setTimeout(() => {

        reflectionText.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress(value) {

    missionProgress.style.width =
        `${value}%`;

    progressText.textContent =
        `${value}%`;

}


/* =========================================
   TEMPORARY MESSAGE
========================================= */

function showTemporaryMessage(message) {

    const warning =
        document.getElementById("activationWarning");


    warning.textContent =
        message;


    setTimeout(() => {

        warning.textContent = "";

    }, 3000);

}


/* =========================================
   INITIALISE
========================================= */

createIngredientCards();

updateProgress(0);
