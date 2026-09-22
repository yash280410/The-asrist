/* =========================================================
   GAURI BHAGWAT — ARTIST WEBSITE
   JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");

const mobileNav = document.getElementById("mobileNav");

const mobileLinks = document.querySelectorAll(
    ".mobile-nav a"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);

const artCards = document.querySelectorAll(
    ".art-card"
);

const lightbox = document.getElementById(
    "lightbox"
);

const lightboxImage = document.getElementById(
    "lightboxImage"
);

const lightboxTitle = document.getElementById(
    "lightboxTitle"
);

const lightboxNumber = document.getElementById(
    "lightboxNumber"
);

const lightboxClose = document.getElementById(
    "lightboxClose"
);

const currentYear = document.getElementById(
    "currentYear"
);


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER NAVIGATION
========================================================= */

mobileLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            mobileNav.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

let previousScroll = window.scrollY;


window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }


        /*
         * Hide header while scrolling down.
         * Show it again while scrolling up.
         */

        if (
            currentScroll > previousScroll &&
            currentScroll > 150
        ) {

            siteHeader.classList.add(
                "hidden"
            );

        } else {

            siteHeader.classList.remove(
                "hidden"
            );

        }


        previousScroll = currentScroll;

    },
    {
        passive: true
    }
);


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(
    image,
    title,
    number
) {

    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;

    lightboxNumber.textContent = number;

    lightbox.classList.add(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lightbox-open"
    );


    /*
     * Clear image after transition.
     */

    setTimeout(
        () => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                lightboxImage.src = "";

            }

        },
        300
    );

}


/* =========================================================
   ARTWORK CLICK
========================================================= */

artCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.dataset.image;

            const title =
                card.dataset.title;

            const number =
                card.querySelector(
                    ".art-info > span"
                )?.textContent || "01";


            openLightbox(
                image,
                title,
                number
            );

        }
    );

});


/* =========================================================
   LIGHTBOX CLOSE BUTTON
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* =========================================================
   CLICK OUTSIDE IMAGE TO CLOSE
========================================================= */

lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document
    .querySelectorAll(".art-image-wrap img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const wrapper =
                    image.closest(
                        ".art-image-wrap"
                    );

                if (wrapper) {

                    wrapper.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    });


/* =========================================================
   PREVENT HASH JUMP FLASH
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });