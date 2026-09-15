/* =========================================
   NUGGETOLOGY - SCRIPT.JS
   ========================================= */


/* =========================================
   OPEN / CLOSE PUBLISH FORM
   ========================================= */

const publishToggle =
    document.getElementById("publishToggle");

const publishFormContainer =
    document.getElementById("publishFormContainer");


if (publishToggle && publishFormContainer) {

    publishToggle.addEventListener("click", function () {

        if (publishFormContainer.classList.contains("open")) {

            publishFormContainer.classList.remove("open");

            publishToggle.textContent =
                "📤 Publish Your Recipe";

        } else {

            publishFormContainer.classList.add("open");

            publishToggle.textContent =
                "✖ Close Recipe Form";

        }

    });

}


/* =========================================
   ELEMENTS
   ========================================= */

const publishForm =
    document.getElementById("publishForm");

const publishedRecipes =
    document.getElementById("publishedRecipes");


/* =========================================
   GET SAVED RECIPES
   ========================================= */

function getRecipes() {

    try {

        const savedRecipes =
            localStorage.getItem("nuggetologyRecipes");

        if (!savedRecipes) {
            return [];
        }

        const recipes =
            JSON.parse(savedRecipes);

        if (!Array.isArray(recipes)) {
            return [];
        }

        return recipes;

    } catch (error) {

        console.error(
            "Could not load recipes:",
            error
        );

        return [];

    }

}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   LOAD COMMUNITY RECIPES
   ========================================= */

function loadPublishedRecipes() {

    if (!publishedRecipes) {
        return;
    }


    const recipes =
        getRecipes();


    publishedRecipes.innerHTML = "";


    if (recipes.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "No community recipes yet. Be the first to publish one! 🍗";

        publishedRecipes.appendChild(message);

        return;

    }


    recipes.forEach(function (recipe, index) {

        const card =
            document.createElement("div");

        card.className =
            "published-recipe";


        /* IMAGE */

        const image =
            document.createElement("img");

        image.src =
            recipe.image || "images/nuggets.jpg";

        image.alt =
            recipe.name || "Recipe";

        image.onerror =
            function () {

                this.onerror = null;

                this.src =
                    "images/nuggets.jpg";

            };


        /* TITLE */

        const title =
            document.createElement("h2");

        title.textContent =
            "🍗 " + (recipe.name || "Untitled Recipe");


        /* TIME */

        const time =
            document.createElement("p");

        time.innerHTML =
            "<strong>Time:</strong> " +
            escapeHTML(recipe.time);


        /* DIFFICULTY */

        const difficulty =
            document.createElement("p");

        difficulty.innerHTML =
            "<strong>Difficulty:</strong> " +
            escapeHTML(recipe.difficulty);


        /* DESCRIPTION */

        const description =
            document.createElement("p");

        description.textContent =
            recipe.description || "";


        /* DETAILS WITH SMOOTH TRANSITION */

        const details =
            document.createElement("details");

        const summary =
            document.createElement("summary");

        summary.textContent =
            "View Recipe";

        const detailsContent =
            document.createElement("div");

        detailsContent.className =
            "details-content";

        const ingredientsTitle =
            document.createElement("p");

        ingredientsTitle.innerHTML =
            "<strong>Ingredients:</strong>";

        const ingredients =
            document.createElement("p");

        ingredients.innerHTML =
            escapeHTML(recipe.ingredients)
                .replace(/\n/g, "<br>");

        const instructionsTitle =
            document.createElement("p");

        instructionsTitle.innerHTML =
            "<strong>Instructions:</strong>";

        const instructions =
            document.createElement("p");

        instructions.innerHTML =
            escapeHTML(recipe.instructions)
                .replace(/\n/g, "<br>");

        // Assemble content wrapper
        detailsContent.appendChild(document.createElement("br"));
        detailsContent.appendChild(ingredientsTitle);
        detailsContent.appendChild(ingredients);
        detailsContent.appendChild(document.createElement("br"));
        detailsContent.appendChild(instructionsTitle);
        detailsContent.appendChild(instructions);

        details.appendChild(summary);
        details.appendChild(detailsContent);

        // Smooth Expand/Collapse Logic
        summary.addEventListener("click", function (event) {
            event.preventDefault();

            if (details.hasAttribute("open")) {
                detailsContent.style.height = detailsContent.scrollHeight + "px";
                detailsContent.offsetHeight; 
                detailsContent.style.height = "0px";
                
                setTimeout(() => {
                    details.removeAttribute("open");
                }, 300);
            } else {
                details.setAttribute("open", "true");
                detailsContent.style.height = "0px";
                detailsContent.offsetHeight; 
                detailsContent.style.height = detailsContent.scrollHeight + "px";
                
                setTimeout(() => {
                    detailsContent.style.height = "auto";
                }, 300);
            }
        });


        /* DELETE BUTTON */

        const deleteButton =
            document.createElement("button");

        deleteButton.type =
            "button";

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            "🗑️ Delete";


        deleteButton.addEventListener(
            "click",
            function () {

                deleteRecipe(index);

            }
        );


        /* ADD CARD CONTENT */

        card.appendChild(image);

        card.appendChild(title);

        card.appendChild(time);

        card.appendChild(difficulty);

        card.appendChild(description);

        card.appendChild(details);

        card.appendChild(deleteButton);


        publishedRecipes.appendChild(card);

  5 });

}


/* =========================================
   PUBLISH RECIPE
   ========================================= */

if (publishForm) {

    publishForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const recipeName =
                document
                .getElementById("recipeName")
                .value
                .trim();


            const recipeDescription =
                document
                .getElementById("recipeDescription")
                .value
                .trim();


            const recipeTime =
                document
                .getElementById("recipeTime")
                .value
                .trim();


            const recipeDifficulty =
                document
                .getElementById("recipeDifficulty")
                .value;


            const recipeIngredients =
                document
                .getElementById("recipeIngredients")
                .value
                .trim();


            const recipeInstructions =
                document
                .getElementById("recipeInstructions")
                .value
                .trim();


            const recipeImage =
                document
                .getElementById("recipeImage")
                .value
                .trim();


            const recipe = {

                name: recipeName,

                description: recipeDescription,

                time: recipeTime,

                difficulty: recipeDifficulty,

                ingredients: recipeIngredients,

                instructions: recipeInstructions,

                image:
                    recipeImage ||
                    "images/nuggets.jpg"

            };


            const recipes =
                getRecipes();


            recipes.push(recipe);


            try {

                localStorage.setItem(
                    "nuggetologyRecipes",
                    JSON.stringify(recipes)
                );

            } catch (error) {

                console.error(
                    "Could not save recipe:",
                    error
                );

                alert(
                    "❌ Could not save the recipe."
                );

                return;

            }


            /* Reset form */

            publishForm.reset();


            /* Close form BEFORE refreshing cards */

            if (publishFormContainer) {

                publishFormContainer.classList.remove(
                    "open"
                );

            }


            if (publishToggle) {

                publishToggle.textContent =
                    "📤 Publish Your Recipe";

            }


            /* Refresh recipes */

            loadPublishedRecipes();


            alert(
                "🍗 Recipe published successfully!"
            );

        }
    );

}


/* =========================================
   DELETE RECIPE
   ========================================= */

function deleteRecipe(index) {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this recipe?"
        );


    if (!confirmed) {
        return;
    }


    const recipes =
        getRecipes();


    if (
        index < 0 ||
        index >= recipes.length
    ) {

        return;

    }


    recipes.splice(index, 1);


    try {

        localStorage.setItem(
            "nuggetologyRecipes",
            JSON.stringify(recipes)
        );

    } catch (error) {

        console.error(
            "Could not delete recipe:",
            error
        );

        return;

    }


    loadPublishedRecipes();

}


/* =========================================
   INITIAL LOAD
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    loadPublishedRecipes();
});