/* =========================================================
   AURA FORMULATION QUEST
   COMPLETE SCRIPT
   PRODUCT FORMULATION SYSTEM
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
        clue: "Rich in essential fatty acids, Vitamin A, and Vitamin E. It deeply moisturizes dry skin, soothes irritation (such as eczema or psoriasis), and improves skin tone and complexion.",
        role: "Primary carrier Oil"
    },

    {
        id: "hibiscus sabdariffa",
        name: "hibiscus sabdariffa Oil",
        icon: "🌺",
        cost: 3.50,
        clue: "Often called the "natural botox plant" oil, it is packed with antioxidants, natural alpha-hydroxy acids (AHAs), and omega-6 fatty acids. It boosts skin elasticity, encourages cellular turnover, and combats signs of aging.",
        role: "Serves as a premium anti-aging active and brightening agent in facial oils, anti-aging serums, and luxury moisturizers."
    },

    {
        id: "gromwell",
        name: "Gromwell Root Powder",
        icon: "🌿",
        cost: 2.50,
        clue: "Highly revered in traditional herbal skincare for its potent anti-inflammatory, antibacterial, and wound-healing properties. It calms acne, reduces redness, and naturally imparts a beautiful pink-to-red hue to formulations.",
        role: "Acts as a soothing agent and natural colorant in acne treatments, healing salves, and calming balms."
    },

    {
        id: "tamarind",
        name: "Tamarind Seed Extract",
        icon: "♻️",
        cost: 1.50,
        clue: "An upcycled ingredient that gives a discarded material a second life. Contains polysaccharides that mimic (and some studies suggest, outperform) Hyaluronic Acid. It binds moisture to the skin, plumps out fine lines, and significantly improves skin hydration and texture.",
        role: "Upcycled Ingredient. Functions as a powerful hydrating active in water-based formulations like serums, toners, and gel moisturizers."
    },

    {
        id: "vitaminE",
        name: "Vitamin E Acetate",
        icon: "✨",
        cost: 2.00,
        clue: "A highly stable, oil-soluble antioxidant. It protects skin cells from free radical damage caused by UV rays and pollution while helping the skin retain its natural moisture.",
        role: "Serves as an anti-aging active and skin protectant. It also acts as an antioxidant for the formulation, extending the shelf life of the botanical oils by preventing them from going rancid."
    },

    {
        id: "geranium",
        name: "Rose Geranium",
        icon: "🌹",
        cost: 4.00,
        clue: "Balances sebum (oil) production, acts as a natural astringent to tighten skin tissues, and promotes cell regeneration while offering a deeply relaxing, balancing floral aroma.",
        role: "Serves as a balancing active and natural fragrance for oily, dry, or combination skincare products."
    },

    {
        id: "vanilla",
        name: "Vanilla",
        icon: "🍦",
        cost: 3.00,
        clue: "Rich in antioxidants that reverse skin damage. Its sweet, warm scent is known for its therapeutic, stress-relieving properties on the nervous system.",
        role: "Functions as a fragrance agent and soothing aromatic in lip cosmetics, body creams, and spa products."
    },


    /* =====================================================
       NEW INGREDIENTS
    ===================================================== */

    {
        id: "cocoaButter",
        name: "Cocoa Butter",
        icon: "🧈",
        cost: 3.50,
        clue: "A rich plant-based butter commonly used to create a nourishing solid balm texture.",
        role: "Butter / Balm Base"
    },

    {
        id: "pandan",
        name: "Pandan Essential Oil",
        icon: "🌿",
        cost: 4.00,
        clue: "Offers mild antibacterial and antifungal benefits alongside a unique, refreshing green aroma.",
        role: "Acts as an exotic fragrance agent, widely popular in localized, traditional, or tropical spa-concept body care lines."
    },

    {
        id: "peppermint",
        name: "Peppermint Essential Oil",
        icon: "🌱",
        cost: 2.50,
        clue: "High in menthol, which provides an instant cooling and tingling sensation. It relieves itching, controls excess oil, and stimulates blood flow.",
        role: "Serves as a cooling and stimulating agent in foot creams, lip plumpers, clarifying shampoos, or cooling muscle balms."
    },

    {
        id: "coffee",
        name: "Coffee Grounds",
        icon: "☕",
        cost: 2.00,
        clue: "Contains caffeine, which temporarily tightens the skin, reduces puffiness, and stimulates blood circulation (helping to minimize the appearance of cellulite). The physical particles efficiently slough away dead skin cells.",
        role: "Natural Exfoliant"
    }

];


/* =========================================================
   GAME STATE
========================================================= */

let selectedIngredients = [];

let selectedClient = null;

let reflectionChoice = null;

let formulaActivated = false;

const budget = 20;


/* =========================================================
   HELPER
========================================================= */

function hasIngredient(id) {

    return selectedIngredients.some(
        ingredient => ingredient.id === id
    );

}


/* =========================================================
   START MISSION
========================================================= */

function startMission() {

    const landing =
        document.getElementById("landing");

    const game =
        document.getElementById("game");


    if (!landing || !game) {

        console.error(
            "Landing or game section not found."
        );

        return;

    }


    landing.classList.add("hidden");

    game.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateMissionProgress();

}


/* =========================================================
   SELECT CLIENT
========================================================= */

function selectClient(button, clientName) {

    if (!button) {
        return;
    }


    document
        .querySelectorAll(".client-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    button.classList.add("selected");


    selectedClient = clientName;


    const clientResult =
        document.getElementById("clientResult");


    if (clientResult) {

        let message = "";


        if (
            clientName ===
            "Lightweight Botanical"
        ) {

            message =
                "A lightweight botanical direction. Consider oils and ingredients that create an elegant, lightweight sensory experience.";

        }


        else if (
            clientName ===
            "Sustainability First"
        ) {

            message =
                "A sustainability-led direction. Look for upcycled and responsible ingredient choices.";

        }


        else if (
            clientName ===
            "Luxury Botanical"
        ) {

            message =
                "A premium botanical direction. Think about botanical character, sensory experience and formulation identity.";

        }


        clientResult.textContent =
            message;


        clientResult.classList.remove(
            "hidden"
        );

    }


    updateMissionProgress();


    setTimeout(() => {

        const ingredientSection =
            document.getElementById(
                "ingredients"
            );


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
        document.getElementById(
            "ingredients"
        );


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

                    <div class="ingredient-front">

                        <div class="ingredient-icon">
                            ${ingredient.icon}
                        </div>

                        <span class="ingredient-number">
                            INGREDIENT ${String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>
                            ${ingredient.name}
                        </h3>

                        <p>
                            Tap to Discover
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

                        <p>
                            <strong>Role:</strong>
                            ${ingredient.role}
                        </p>

                        <p>
                            <strong>Cost:</strong>
                            RM${ingredient.cost.toFixed(2)}
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


            card.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target.closest(
                            ".add-button"
                        )
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


    const currentTotal =
        calculateTotal();


    if (
        currentTotal + ingredient.cost >
        budget
    ) {

        alert(
            "This ingredient would exceed your RM20 formulation budget."
        );

        return;

    }


    selectedIngredients.push(
        ingredient
    );


    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {

        card.classList.add("used");

    }


    updateFormula();


    /*
    TAMARIND SUSTAINABILITY
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


    /*
    BUDGET BAR
    */

    if (budgetFill) {

        const percentage =
            Math.min(
                (total / budget) * 100,
                100
            );


        budgetFill.style.width =
            `${percentage}%`;

    }


    /*
    REMAINING
    */

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


    if (!selectedList) {

        return;

    }


    /*
    EMPTY STATE
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


    selectedList.innerHTML = "";


    /*
    SELECTED INGREDIENTS
    */

    selectedIngredients.forEach(
        ingredient => {

            const item =
                document.createElement(
                    "div"
                );


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


    const card =
        document.querySelector(
            `.ingredient[data-id="${id}"]`
        );


    if (card) {

        card.classList.remove(
            "used"
        );

    }


    updateFormula();


    /*
    SUSTAINABILITY CARD
    */

    const hasTamarind =
        hasIngredient("tamarind");


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


    updateMissionProgress();

}


/* =========================================================
   DETERMINE PRODUCT
=========================================================

   PRODUCT PRIORITY:

   1. Coffee Grounds
      → Body Scrub

   2. Pandan + Peppermint
      → Body Massage Oil

   3. Cocoa Butter
      → Balm

   4. Everything else
      → Nail Oil

========================================================= */

function determineProduct() {


    /*
    ========================================================
    COFFEE GROUNDS
    ========================================================
    */

    if (
        hasIngredient("coffee")
    ) {

        return {

            type: "Body Scrub",

            name:
                "Aura Coffee Glow Body Scrub",

            icon:
                "☕",

            description:
                "An exfoliating botanical body scrub concept featuring coffee grounds as a natural exfoliating ingredient.",

            category:
                "Exfoliating Body Care",

            benefit:
                "Designed around a refreshing exfoliation concept with a natural coffee-inspired identity."

        };

    }


    /*
    ========================================================
    PANDAN + PEPPERMINT
    ========================================================
    */

    if (
        hasIngredient("pandan") &&
        hasIngredient("peppermint")
    ) {

        return {

            type: "Body Massage Oil",

            name:
                "Aura Pandan Massage Oil",

            icon:
                "🌿",

            description:
                "A refreshing botanical body massage oil concept with aromatic pandan for a revitalising sensory experience.",

            category:
                "Body Care",

            benefit:
                "Designed for a refreshing and relaxing body massage experience."

        };

    }


    /*
    ========================================================
    COCOA BUTTER
    ========================================================
    */

    if (
        hasIngredient("cocoaButter")
    ) {

        return {

            type: "Botanical Balm",

            name:
                "Aura Cocoa Nourish Balm",

            icon:
                "🧈",

            description:
                "A rich botanical balm concept built around cocoa butter as the nourishing solid base.",

            category:
                "Solid Body Care",

            benefit:
                "Designed around a rich, nourishing balm texture for intensive moisturising care."

        };

    }


    /*
    ========================================================
    DEFAULT
    ========================================================
    */

    return {

        type: "Nail & Cuticle Oil",

        name:
            "Aura Botanical Nail Oil",

        icon:
            "✨",

        description:
            "A botanical nail and cuticle oil concept created from your selected ingredients.",

        category:
            "Nail Care",

        benefit:
            "Designed around a lightweight botanical oil experience for nail and cuticle care."

    };

}


/* =========================================================
   GENERATE PRODUCT RESULT
========================================================= */

function generateFormulaResult() {

    const product =
        determineProduct();


    /*
    Existing result elements
    */

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


    /*
    ========================================================
    PRODUCT RESULT CONTAINER
    ========================================================
    */

    const resultCard =
        document.getElementById(
            "resultCard"
        );


    if (resultCard) {

        /*
        Check if product result already exists
        */

        let productResult =
            document.getElementById(
                "dynamicProductResult"
            );


        /*
        Create it if HTML doesn't already have it
        */

        if (!productResult) {

            productResult =
                document.createElement(
                    "div"
                );


            productResult.id =
                "dynamicProductResult";


            productResult.className =
                "dynamic-product-result";


            /*
            Put product result at the beginning
            */

            resultCard.insertBefore(
                productResult,
                resultCard.firstChild
            );

        }


        productResult.innerHTML = `

            <div class="product-result-icon">
                ${product.icon}
            </div>

            <span class="ingredient-number">
                FORMULATION RESULT
            </span>

            <h2>
                ${product.name}
            </h2>

            <p class="product-type">
                ${product.type}
            </p>

            <p>
                ${product.description}
            </p>

            <div class="product-profile">

                <div>
                    <strong>Product Category</strong>
                    <span>${product.category}</span>
                </div>

                <div>
                    <strong>Formula Cost</strong>
                    <span>RM${calculateTotal().toFixed(2)}</span>
                </div>

                <div>
                    <strong>Ingredients</strong>
                    <span>${selectedIngredients.length}</span>
                </div>

            </div>

            <div class="product-benefit">

                <strong>Formula Concept</strong>

                <p>
                    ${product.benefit}
                </p>

            </div>

            <div class="selected-formula-list">

                <strong>Your Formula</strong>

                ${selectedIngredients.map(
                    ingredient => `
                        <div>
                            ${ingredient.icon}
                            ${ingredient.name}
                        </div>
                    `
                ).join("")}

            </div>

        `;

    }


    /*
    ========================================================
    FORMULA IDENTITY
    ========================================================
    */

    let identity =
        "Botanical Formulator";


    let description =
        "You created a thoughtful botanical formulation by balancing ingredients, client needs and budget.";


    let auraMessage =
        "Excellent formulation thinking! You considered the purpose of your ingredients instead of choosing randomly.";


    /*
    ========================================================
    SUSTAINABILITY CLIENT
    ========================================================
    */

    if (
        selectedClient ===
            "Sustainability First" &&
        hasIngredient("tamarind")
    ) {

        identity =
            "Green Innovator";


        description =
            "Your formulation demonstrates a strong sustainability mindset by incorporating an upcycled ingredient.";


        auraMessage =
            "Excellent sustainability thinking! You gave an ingredient a second life while considering the client's needs.";

    }


    /*
    ========================================================
    LUXURY CLIENT
    ========================================================
    */

    else if (
        selectedClient ===
            "Luxury Botanical" &&
        (
            hasIngredient("geranium") ||
            hasIngredient("vanilla") ||
            hasIngredient("hibiscus")
        )
    ) {

        identity =
            "Luxury Alchemist";


        description =
            "Your formulation focuses on creating a premium botanical identity with attention to sensory experience.";


        auraMessage =
            "Beautiful formulation direction! You considered both function and sensory identity.";

    }


    /*
    ========================================================
    LIGHTWEIGHT CLIENT
    ========================================================
    */

    else if (
        selectedClient ===
            "Lightweight Botanical" &&
        hasIngredient("almond")
    ) {

        identity =
            "Botanical Strategist";


        description =
            "Your formulation shows a clear understanding of building a lightweight botanical concept around a carrier oil.";


        auraMessage =
            "Well done! Your ingredient selection matches the lightweight botanical brief.";

    }


    /*
    ========================================================
    PRODUCT-SPECIFIC IDENTITY
    ========================================================
    */

    if (
        product.type ===
        "Body Scrub"
    ) {

        identity =
            "Exfoliation Innovator";


        auraMessage =
            "Great product thinking! You recognised that Coffee Grounds can transform the formulation into an exfoliating scrub concept.";

    }


    else if (
        product.type ===
        "Body Massage Oil"
    ) {

        identity =
            "Aromatic Wellness Creator";


        auraMessage =
            "Excellent combination! Pandan and Peppermint create a strong aromatic body-care direction.";

    }


    else if (
        product.type ===
        "Botanical Balm"
    ) {

        identity =
            "Balm Alchemist";


        auraMessage =
            "Excellent formulation choice! Cocoa Butter shifts your formulation toward a rich solid balm concept.";

    }


    /*
    ========================================================
    TAMARIND BONUS
    ========================================================
    */

    if (
        hasIngredient("tamarind") &&
        product.type !== "Body Scrub"
    ) {

        if (
            selectedClient ===
            "Sustainability First"
        ) {

            identity =
                "Green Innovator";

        }


        auraMessage +=
            " Tamarind Seed Extract also strengthens the sustainability story of your formulation.";

    }


    /*
    ========================================================
    UPDATE EXISTING UI
    ========================================================
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
   ACTIVATE FORMULA
========================================================= */

function activateFormula() {

    const warning =
        document.getElementById(
            "activationWarning"
        );


    /*
    CHECK CLIENT
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
    CHECK INGREDIENTS
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
    CHECK BUDGET
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
    CLEAR WARNING
    */

    if (warning) {

        warning.textContent = "";

    }


    /*
    FORMULA ACTIVATED
    */

    formulaActivated = true;


    /*
    GENERATE PRODUCT
    */

    generateFormulaResult();


    /*
    SHOW RESULT CARD
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


    updateMissionProgress();


    /*
    SCROLL RESULT
    */

    setTimeout(() => {

        if (resultCard) {

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 250);


    /*
    REVEAL REFLECTION
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

        updateMissionProgress();

        return;

    }


    let message = "";


    switch (choice) {

        case "Reduce environmental impact":

            message =
                "Great reflection. Consider increasing upcycled ingredients, reducing unnecessary components and thinking about responsible sourcing.";

            break;


        case "Improve formulation strategy":

            message =
                "Good thinking. Revisit the functional role of every ingredient and ask whether each component contributes something meaningful.";

            break;


        case "Reduce production cost":

            message =
                "Excellent commercial thinking. Look for ingredients that provide multiple benefits while keeping the formulation within budget.";

            break;


        case "Better match the client":

            message =
                "Strong formulation mindset. The best formula is the one that solves the client's needs while maintaining a clear product concept.";

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


    updateMissionProgress();


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
    CLIENT
    */

    if (selectedClient) {

        progress += 25;

    }


    /*
    INGREDIENT
    */

    if (
        selectedIngredients.length > 0
    ) {

        progress += 25;

    }


    /*
    FORMULA
    */

    if (formulaActivated) {

        progress += 25;

    }


    /*
    REFLECTION
    */

    if (reflectionChoice) {

        progress += 25;

    }


    /*
    UPDATE BAR
    */

    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }


    /*
    UPDATE TEXT
    */

    if (progressText) {

        progressText.textContent =
            `${progress}%`;

    }

}


/* =========================================================
   RESET MISSION
========================================================= */

function resetMission() {

    selectedIngredients = [];

    selectedClient = null;

    reflectionChoice = null;

    formulaActivated = false;


    /*
    Reset client cards
    */

    document
        .querySelectorAll(".client-card")
        .forEach(card => {

            card.classList.remove(
                "selected"
            );

        });


    /*
    Reset ingredient cards
    */

    document
        .querySelectorAll(".ingredient")
        .forEach(card => {

            card.classList.remove(
                "used",
                "flipped"
            );

        });


    /*
    Hide sustainability
    */

    const sustainability =
        document.getElementById(
            "sustainabilityCard"
        );


    if (sustainability) {

        sustainability.classList.add(
            "hidden"
        );

    }


    /*
    Hide result
    */

    const resultCard =
        document.getElementById(
            "resultCard"
        );


    if (resultCard) {

        resultCard.classList.add(
            "hidden"
        );

    }


    /*
    Hide reflection
    */

    const reflection =
        document.getElementById(
            "reflection"
        );


    if (reflection) {

        reflection.classList.add(
            "hidden"
        );

    }


    updateFormula();

    updateMissionProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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
