// ==========================================
// ZUNO — INTERACTIVE PET HERO
// ==========================================

const hero = document.getElementById("interactive-hero");
const bowl = document.getElementById("food-target");

const cat = document.getElementById("cat");
const dog = document.getElementById("dog");

const catThought = document.getElementById("cat-thought");
const dogThought = document.getElementById("dog-thought");


// ==========================================
// BOWL POSITION
// ==========================================

let mouseX = 0;
let mouseY = 0;

let bowlX = 0;
let bowlY = 0;

let dragging = false;


// ==========================================
// START POSITION
// ==========================================

function startHero() {

    if (!hero || !bowl) return;

    const rect = hero.getBoundingClientRect();

    mouseX = rect.width / 2;
    mouseY = rect.height * 0.55;

    bowlX = mouseX;
    bowlY = mouseY;
}

startHero();


// ==========================================
// CURSOR MOVEMENT
// ==========================================

hero.addEventListener("pointermove", (event) => {

    // On phones only move while touching
    if (
        event.pointerType === "touch" &&
        !dragging
    ) {
        return;
    }

    const rect = hero.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;


    // Prevent bowl going too far
    const sideLimit = 140;
    const topLimit = 250;
    const bottomLimit = 150;


    x = Math.max(
        sideLimit,
        Math.min(
            rect.width - sideLimit,
            x
        )
    );


    y = Math.max(
        topLimit,
        Math.min(
            rect.height - bottomLimit,
            y
        )
    );


    mouseX = x;
    mouseY = y;

});


// ==========================================
// MOBILE / DRAG
// ==========================================

bowl.addEventListener(
    "pointerdown",
    (event) => {

        dragging = true;

        bowl.setPointerCapture(
            event.pointerId
        );

        event.preventDefault();

    }
);


bowl.addEventListener(
    "pointerup",
    (event) => {

        dragging = false;

        if (
            bowl.hasPointerCapture(
                event.pointerId
            )
        ) {

            bowl.releasePointerCapture(
                event.pointerId
            );
        }

    }
);


bowl.addEventListener(
    "pointercancel",
    () => {

        dragging = false;

    }
);


// ==========================================
// DISTANCE
// ==========================================

function getDistance(
    x1,
    y1,
    x2,
    y2
) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


// ==========================================
// ANIMAL REACTION
// ==========================================

function updateAnimal(
    animal,
    bowlCenterX,
    bowlCenterY,
    type
) {

    if (!animal) return;

    const heroRect =
        hero.getBoundingClientRect();

    const animalRect =
        animal.getBoundingClientRect();


    const animalX =
        animalRect.left -
        heroRect.left +
        animalRect.width / 2;


    const animalY =
        animalRect.top -
        heroRect.top +
        animalRect.height / 2;


    const dx =
        bowlCenterX - animalX;

    const dy =
        bowlCenterY - animalY;


    const distance =
        getDistance(
            animalX,
            animalY,
            bowlCenterX,
            bowlCenterY
        );


    // ======================================
    // HOW EXCITED IS THE ANIMAL?
    // ======================================

    let excitement =
        1 - distance / 700;

    excitement =
        Math.max(
            0,
            Math.min(
                1,
                excitement
            )
        );


    // ======================================
    // MOVE TOWARD BOWL
    // ======================================

    const moveX =
        Math.max(
            -38,
            Math.min(
                38,
                dx * 0.07
            )
        ) * excitement;


    const moveY =
        Math.max(
            -18,
            Math.min(
                12,
                dy * 0.035
            )
        ) * excitement;


    // ======================================
    // TILT TOWARD BOWL
    // ======================================

    let rotate =
        dx * 0.012;

    rotate =
        Math.max(
            -7,
            Math.min(
                7,
                rotate
            )
        );


    // ======================================
    // SLIGHTLY GROW WHEN EXCITED
    // ======================================

    const scale =
        1 +
        excitement * 0.025;


    // ======================================
    // EXTRA LITTLE MOVEMENT
    // WHEN FOOD IS CLOSE
    // ======================================

    let wiggle = 0;

    if (distance < 300) {

        wiggle =
            Math.sin(
                performance.now() / 100
            ) * 2;

    }


    // ======================================
    // CAT
    // ======================================

    if (type === "cat") {

        animal.style.transform = `
            translate(
                ${moveX + wiggle}px,
                ${moveY}px
            )
            rotate(${rotate}deg)
            scale(${scale})
        `;

    }


    // ======================================
    // DOG
    // ======================================

    if (type === "dog") {

        animal.style.transform = `
            translate(
                ${moveX + wiggle}px,
                ${moveY}px
            )
            rotate(${rotate}deg)
            scale(${scale})
        `;

    }


    return distance;
}


// ==========================================
// MAIN ANIMATION
// ==========================================

function animateHero() {

    // Smooth bowl movement
    bowlX +=
        (mouseX - bowlX) * 0.11;

    bowlY +=
        (mouseY - bowlY) * 0.11;


    // Move bowl
    bowl.style.left =
        bowlX + "px";

    bowl.style.top =
        bowlY + "px";


    // ======================================
    // CAT REACTION
    // ======================================

    const catDistance =
        updateAnimal(
            cat,
            bowlX,
            bowlY,
            "cat"
        );


    // ======================================
    // DOG REACTION
    // ======================================

    const dogDistance =
        updateAnimal(
            dog,
            bowlX,
            bowlY,
            "dog"
        );


    // ======================================
    // CAT SPEECH
    // ======================================

    if (
        catDistance < 330 &&
        catDistance < dogDistance
    ) {

        cat.classList.add(
            "wants-food"
        );

    } else {

        cat.classList.remove(
            "wants-food"
        );

    }


    // ======================================
    // DOG SPEECH
    // ======================================

    if (
        dogDistance < 330 &&
        dogDistance < catDistance
    ) {

        dog.classList.add(
            "wants-food"
        );

    } else {

        dog.classList.remove(
            "wants-food"
        );

    }


    requestAnimationFrame(
        animateHero
    );
}


// START ANIMATION

requestAnimationFrame(
    animateHero
);


// ==========================================
// RETURN BOWL TO CENTER
// ==========================================

hero.addEventListener(
    "pointerleave",
    () => {

        if (dragging) return;

        const rect =
            hero.getBoundingClientRect();

        mouseX =
            rect.width / 2;

        mouseY =
            rect.height * 0.55;

    }
);


// ==========================================
// MOBILE MENU
// ==========================================

const mobileMenuButton =
    document.getElementById(
        "mobile-menu-button"
    );

const mobileMenu =
    document.getElementById(
        "mobile-menu"
    );


if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );

}


// ==========================================
// NEWSLETTER
// ==========================================

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const button =
                newsletterForm.querySelector(
                    "button"
                );

            button.textContent =
                "YOU'RE IN ✓";

        }
    );

}


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
    "resize",
    () => {

        const rect =
            hero.getBoundingClientRect();

        mouseX =
            rect.width / 2;

        mouseY =
            rect.height * 0.55;

    }
);