/* =========================================================
   AIKO.DEV — PERSONAL PORTFOLIO
   SCRIPT.JS
   FINAL FIXED VERSION
========================================================= */

"use strict";

/* =========================================================
   0. GLOBAL ERROR SAFETY
========================================================= */

window.addEventListener("error", function (event) {

    console.error(
        "AIKO.DEV JavaScript Error:",
        event.error || event.message
    );

    /*
       Jika terjadi error pada JavaScript,
       pastikan konten .reveal tetap terlihat.
    */

    document.querySelectorAll(".reveal").forEach(
        function (element) {

            element.classList.add("active");

        }
    );

});


window.addEventListener(
    "unhandledrejection",
    function (event) {

        console.error(
            "AIKO.DEV Promise Error:",
            event.reason
        );

    }
);


/* =========================================================
   1. DOM CONTENT LOADED
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =================================================
           INITIALIZATION
        ================================================= */

        const loader =
            document.getElementById("loader");

        const menuBtn =
            document.getElementById("menuBtn");

        const mobileNav =
            document.getElementById("mobileNav");

        const themeBtn =
            document.getElementById("themeBtn");

        const typingText =
            document.getElementById("typingText");

        const header =
            document.getElementById("header");

        const backTop =
            document.getElementById("backTop");

        const contactForm =
            document.getElementById("contactForm");

        const toast =
            document.getElementById("toast");

        const year =
            document.getElementById("year");


        const mobileLinks =
            document.querySelectorAll(
                ".mobile-link"
            );


        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );


        const sections =
            document.querySelectorAll(
                "main section[id]"
            );


        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const statNumbers =
            document.querySelectorAll(
                "[data-count]"
            );


        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );


        const progressBars =
            document.querySelectorAll(
                ".progress span"
            );


        /* =================================================
           2. REVEAL SAFETY
        ================================================= */

        function revealAllContent() {

            document
                .querySelectorAll(".reveal")
                .forEach(
                    function (element) {

                        element.classList.add(
                            "active"
                        );

                    }
                );

        }


        /*
           Fallback.
           Jika observer gagal atau browser mengalami
           masalah, seluruh konten tetap ditampilkan.
        */

        window.setTimeout(
            revealAllContent,
            1800
        );


        /* =================================================
           3. LOADING SCREEN
        ================================================= */

        function hideLoader() {

            if (!loader) {
                return;
            }

            loader.classList.add(
                "hide"
            );

            window.setTimeout(
                function () {

                    loader.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                },
                600
            );

        }


        window.addEventListener(
            "load",
            function () {

                window.setTimeout(
                    hideLoader,
                    500
                );

            }
        );


        /*
           Emergency loader fallback.
        */

        window.setTimeout(
            hideLoader,
            2500
        );


        /* =================================================
           4. MOBILE MENU
        ================================================= */

        function closeMobileMenu() {

            if (mobileNav) {

                mobileNav.classList.remove(
                    "open"
                );

            }


            if (menuBtn) {

                menuBtn.classList.remove(
                    "open"
                );


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuBtn.setAttribute(
                    "aria-label",
                    "Buka menu"
                );

            }

        }


        function openMobileMenu() {

            if (
                !mobileNav ||
                !menuBtn
            ) {
                return;
            }


            mobileNav.classList.add(
                "open"
            );


            menuBtn.classList.add(
                "open"
            );


            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );


            menuBtn.setAttribute(
                "aria-label",
                "Tutup menu"
            );

        }


        if (
            menuBtn &&
            mobileNav
        ) {

            menuBtn.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const isOpen =
                        mobileNav.classList.contains(
                            "open"
                        );


                    if (isOpen) {

                        closeMobileMenu();

                    } else {

                        openMobileMenu();

                    }

                }
            );

        }


        mobileLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                    }
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileNav ||
                    !menuBtn
                ) {
                    return;
                }


                const target =
                    event.target;


                if (
                    !(target instanceof Node)
                ) {
                    return;
                }


                const insideMenu =
                    mobileNav.contains(
                        target
                    );


                const insideButton =
                    menuBtn.contains(
                        target
                    );


                if (
                    !insideMenu &&
                    !insideButton
                ) {

                    closeMobileMenu();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMobileMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 1000
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           5. THEME SYSTEM
        ================================================= */

        function getSavedTheme() {

            try {

                return localStorage.getItem(
                    "aiko-theme"
                );

            } catch (error) {

                console.warn(
                    "Theme storage unavailable."
                );

                return null;

            }

        }


        function setSavedTheme(theme) {

            try {

                localStorage.setItem(
                    "aiko-theme",
                    theme
                );

            } catch (error) {

                console.warn(
                    "Theme could not be saved."
                );

            }

        }


        function updateThemeButton() {

            if (!themeBtn) {
                return;
            }


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            if (isLight) {

                themeBtn.textContent =
                    "🌙";


                themeBtn.setAttribute(
                    "aria-label",
                    "Aktifkan mode gelap"
                );


                themeBtn.setAttribute(
                    "title",
                    "Mode gelap"
                );

            } else {

                themeBtn.textContent =
                    "☀️";


                themeBtn.setAttribute(
                    "aria-label",
                    "Aktifkan mode terang"
                );


                themeBtn.setAttribute(
                    "title",
                    "Mode terang"
                );

            }

        }


        const savedTheme =
            getSavedTheme();


        if (
            savedTheme === "light"
        ) {

            document.body.classList.add(
                "light-mode"
            );

        }


        updateThemeButton();


        if (themeBtn) {

            themeBtn.addEventListener(
                "click",
                function () {

                    const isLight =
                        document.body.classList.toggle(
                            "light-mode"
                        );


                    setSavedTheme(
                        isLight
                            ? "light"
                            : "dark"
                    );


                    updateThemeButton();


                    showToast(
                        isLight
                            ? "Mode terang aktif ☀️"
                            : "Mode gelap aktif 🌙"
                    );

                }
            );

        }


        /* =================================================
           6. TYPING ANIMATION
        ================================================= */

        const typingWords = [

            "Junior Web Developer",

            "RPL Student",

            "Frontend Learner",

            "Web Design Enthusiast"

        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;

        let typingTimer = null;


        function runTypingAnimation() {

            if (!typingText) {
                return;
            }


            if (
                !typingWords.length
            ) {
                return;
            }


            const currentWord =
                typingWords[wordIndex];


            if (!deleting) {

                characterIndex += 1;


                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex >=
                    currentWord.length
                ) {

                    deleting = true;


                    typingTimer =
                        window.setTimeout(
                            runTypingAnimation,
                            1400
                        );


                    return;

                }

            } else {

                characterIndex -= 1;


                typingText.textContent =
                    currentWord.substring(
                        0,
                        Math.max(
                            characterIndex,
                            0
                        )
                    );


                if (
                    characterIndex <= 0
                ) {

                    characterIndex = 0;

                    deleting = false;

                    wordIndex += 1;


                    if (
                        wordIndex >=
                        typingWords.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            const speed =
                deleting
                    ? 45
                    : 85;


            typingTimer =
                window.setTimeout(
                    runTypingAnimation,
                    speed
                );

        }


        if (typingText) {

            typingTimer =
                window.setTimeout(
                    runTypingAnimation,
                    600
                );

        }


        /* =================================================
           7. TOAST NOTIFICATION
        ================================================= */

        let toastTimer = null;


        function showToast(message) {

            if (!toast) {
                return;
            }


            toast.textContent =
                message;


            toast.classList.add(
                "show"
            );


            if (toastTimer) {

                window.clearTimeout(
                    toastTimer
                );

            }


            toastTimer =
                window.setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    2800
                );

        }


        /* =================================================
           8. HEADER + BACK TO TOP
        ================================================= */

        function handleScroll() {

            const scrollPosition =
                window.scrollY;


            if (header) {

                header.classList.toggle(
                    "scrolled",
                    scrollPosition > 40
                );

            }


            if (backTop) {

                backTop.classList.toggle(
                    "show",
                    scrollPosition > 500
                );

            }

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        handleScroll();


        if (backTop) {

            backTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* =================================================
           9. ACTIVE NAVIGATION
        ================================================= */

        function updateActiveNavigation() {

            if (
                !sections.length
            ) {
                return;
            }


            const marker =
                window.scrollY + 180;


            let activeId =
                sections[0]
                    ? sections[0].id
                    : "home";


            sections.forEach(
                function (section) {

                    const top =
                        section.offsetTop;


                    const bottom =
                        top +
                        section.offsetHeight;


                    if (
                        marker >= top &&
                        marker < bottom
                    ) {

                        activeId =
                            section.id;

                    }

                }
            );


            navLinks.forEach(
                function (link) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    link.classList.toggle(
                        "active",
                        href ===
                        "#" + activeId
                    );

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateActiveNavigation
        );


        updateActiveNavigation();


        /* =================================================
           10. SCROLL PROGRESS BAR
        ================================================= */

        let scrollProgress =
            document.getElementById(
                "scrollProgress"
            );


        if (!scrollProgress) {

            scrollProgress =
                document.createElement(
                    "div"
                );


            scrollProgress.id =
                "scrollProgress";


            scrollProgress.setAttribute(
                "aria-hidden",
                "true"
            );


            scrollProgress.style.position =
                "fixed";


            scrollProgress.style.top =
                "0";


            scrollProgress.style.left =
                "0";


            scrollProgress.style.width =
                "0%";


            scrollProgress.style.height =
                "3px";


            scrollProgress.style.zIndex =
                "10001";


            scrollProgress.style.pointerEvents =
                "none";


            scrollProgress.style.background =
                "linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)";


            scrollProgress.style.transformOrigin =
                "left center";


            document.body.appendChild(
                scrollProgress
            );

        }


        function updateScrollProgress() {

            if (!scrollProgress) {
                return;
            }


            const scrollTop =
                window.scrollY;


            const scrollable =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            if (
                scrollable <= 0
            ) {

                scrollProgress.style.width =
                    "0%";

                return;

            }


            const progress =
                Math.min(
                    Math.max(
                        (
                            scrollTop /
                            scrollable
                        ) * 100,
                        0
                    ),
                    100
                );


            scrollProgress.style.width =
                progress + "%";

        }


        window.addEventListener(
            "scroll",
            updateScrollProgress,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateScrollProgress
        );


        updateScrollProgress();


        /* =================================================
           11. REVEAL ANIMATION — FIXED
        ================================================= */

        /*
           PENTING:

           CSS portfolio menggunakan:

           .reveal.active

           BUKAN:

           .reveal.visible

           Jadi JavaScript harus menambahkan
           class "active".
        */


        function activateReveal(
            element
        ) {

            if (!element) {
                return;
            }


            element.classList.add(
                "active"
            );


            /*
               Jika CSS lama menggunakan visible,
               kita juga tambahkan visible agar kompatibel.
            */

            element.classList.add(
                "visible"
            );

        }


        if (
            "IntersectionObserver" in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                activateReveal(
                                    entry.target
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.08,

                        rootMargin:
                            "0px 0px -30px 0px"
                    }
                );


            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );


        } else {

            revealElements.forEach(
                function (element) {

                    activateReveal(
                        element
                    );

                }
            );

        }


        /*
           Safety fallback.
           Konten TIDAK boleh tetap tersembunyi.
        */

        window.setTimeout(
            function () {

                revealElements.forEach(
                    function (element) {

                        activateReveal(
                            element
                        );

                    }
                );

            },
            1800
        );


        /* =================================================
           12. NUMBER COUNTER
        ================================================= */

        function animateNumber(
            element
        ) {

            if (!element) {
                return;
            }


            const target =
                Number(
                    element.getAttribute(
                        "data-count"
                    )
                );


            if (
                !Number.isFinite(target)
            ) {

                element.textContent =
                    "0";

                return;

            }


            if (
                target <= 0
            ) {

                element.textContent =
                    "0";

                return;

            }


            const duration =
                1000;


            const start =
                performance.now();


            function updateNumber(
                now
            ) {

                const elapsed =
                    now - start;


                const progress =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );


                const value =
                    Math.floor(
                        progress *
                        target
                    );


                element.textContent =
                    String(value);


                if (
                    progress < 1
                ) {

                    window.requestAnimationFrame(
                        updateNumber
                    );

                } else {

                    element.textContent =
                        String(target);

                }

            }


            window.requestAnimationFrame(
                updateNumber
            );

        }


        if (
            "IntersectionObserver" in window
        ) {

            const statObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                animateNumber(
                                    entry.target
                                );


                                statObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.45
                    }
                );


            statNumbers.forEach(
                function (number) {

                    statObserver.observe(
                        number
                    );

                }
            );


        } else {

            statNumbers.forEach(
                function (number) {

                    const target =
                        number.getAttribute(
                            "data-count"
                        );


                    number.textContent =
                        target || "0";

                }
            );

        }


        /* =================================================
           13. PROJECT FILTER
        ================================================= */

        function applyProjectFilter(
            filter
        ) {

            projectCards.forEach(
                function (card) {

                    const categoryText =
                        card.getAttribute(
                            "data-category"
                        ) || "";


                    const categories =
                        categoryText
                            .toLowerCase()
                            .split(/\s+/)
                            .filter(Boolean);


                    const selectedFilter =
                        String(
                            filter || "all"
                        ).toLowerCase();


                    const shouldShow =
                        selectedFilter === "all" ||
                        categories.includes(
                            selectedFilter
                        );


                    card.classList.toggle(
                        "hidden",
                        !shouldShow
                    );


                    card.setAttribute(
                        "aria-hidden",
                        String(
                            !shouldShow
                        )
                    );

                }
            );

        }


        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        filterButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const filter =
                            button.getAttribute(
                                "data-filter"
                            ) || "all";


                        applyProjectFilter(
                            filter
                        );

                    }
                );

            }
        );


        applyProjectFilter(
            "all"
        );


        /* =================================================
           14. SKILL PROGRESS
        ================================================= */

        function setProgress(
            bar
        ) {

            if (!bar) {
                return;
            }


            const value =
                Number(
                    bar.getAttribute(
                        "data-progress"
                    )
                );


            const safeValue =
                Number.isFinite(value)
                    ? Math.min(
                        Math.max(
                            value,
                            0
                        ),
                        100
                    )
                    : 0;


            bar.style.width =
                safeValue + "%";

        }


        if (
            "IntersectionObserver" in window
        ) {

            const skillObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                setProgress(
                                    entry.target
                                );


                                skillObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.35
                    }
                );


            progressBars.forEach(
                function (bar) {

                    skillObserver.observe(
                        bar
                    );

                }
            );


        } else {

            progressBars.forEach(
                function (bar) {

                    setProgress(
                        bar
                    );

                }
            );

        }


        /*
           Skill fallback.
        */

        window.setTimeout(
            function () {

                progressBars.forEach(
                    function (bar) {

                        setProgress(
                            bar
                        );

                    }
                );

            },
            1500
        );


        /* =================================================
           15. CONTACT FORM → GMAIL
        ================================================= */

        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const nameInput =
                        document.getElementById(
                            "name"
                        );


                    const emailInput =
                        document.getElementById(
                            "email"
                        );


                    const subjectInput =
                        document.getElementById(
                            "subject"
                        );


                    const messageInput =
                        document.getElementById(
                            "message"
                        );


                    const name =
                        nameInput
                            ? nameInput.value.trim()
                            : "";


                    const email =
                        emailInput
                            ? emailInput.value.trim()
                            : "";


                    const subject =
                        subjectInput
                            ? subjectInput.value.trim()
                            : "";


                    const message =
                        messageInput
                            ? messageInput.value.trim()
                            : "";


                    if (
                        !name ||
                        !email ||
                        !subject ||
                        !message
                    ) {

                        showToast(
                            "Mohon isi semua bagian form."
                        );

                        return;

                    }


                    if (
                        emailInput &&
                        !emailInput.checkValidity()
                    ) {

                        showToast(
                            "Masukkan alamat email yang valid."
                        );


                        emailInput.focus();


                        return;

                    }


                    const emailBody =
                        [
                            "Halo Muhammad Aiko Anail Adi,",
                            "",
                            "Nama: " + name,
                            "Email: " + email,
                            "",
                            "Pesan:",
                            message
                        ].join(
                            "\n"
                        );


                    const gmailURL =
                        "https://mail.google.com/mail/?" +
                        "view=cm&fs=1" +
                        "&to=aikorplkanesa@gmail.com" +
                        "&su=" +
                        encodeURIComponent(
                            subject
                        ) +
                        "&body=" +
                        encodeURIComponent(
                            emailBody
                        );


                    let gmailWindow =
                        null;


                    try {

                        gmailWindow =
                            window.open(
                                gmailURL,
                                "_blank",
                                "noopener,noreferrer"
                            );

                    } catch (error) {

                        console.error(
                            "Gmail open error:",
                            error
                        );

                    }


                    if (!gmailWindow) {

                        window.location.href =
                            "mailto:aikorplkanesa@gmail.com" +
                            "?subject=" +
                            encodeURIComponent(
                                subject
                            ) +
                            "&body=" +
                            encodeURIComponent(
                                emailBody
                            );

                    }


                    showToast(
                        "Gmail sedang dibuka ✉️"
                    );


                    contactForm.reset();

                }
            );

        }


        /* =================================================
           16. SMOOTH SCROLL
        ================================================= */

        const anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchorLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {

                            return;

                        }


                        let target =
                            null;


                        try {

                            target =
                                document.querySelector(
                                    href
                                );

                        } catch (error) {

                            return;

                        }


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }
                );

            }
        );


        /* =================================================
           17. IMAGE ERROR HANDLING
        ================================================= */

        document
            .querySelectorAll("img")
            .forEach(
                function (image) {

                    image.addEventListener(
                        "error",
                        function () {

                            image.classList.add(
                                "image-error"
                            );


                            image.setAttribute(
                                "alt",
                                "Gambar tidak dapat dimuat"
                            );


                            /*
                               Jangan sembunyikan gambar
                               atau menghentikan JS.
                            */

                            console.warn(
                                "Image failed to load:",
                                image.src
                            );

                        }
                    );


                    if (
                        image.complete &&
                        image.naturalWidth === 0
                    ) {

                        image.classList.add(
                            "image-error"
                        );

                    }

                }
            );


        /* =================================================
           18. PHOTO CARD POINTER EFFECT
        ================================================= */

        const photoCard =
            document.querySelector(
                ".photo-card"
            );


        let canHover =
            false;


        try {

            canHover =
                window.matchMedia(
                    "(hover: hover) and (pointer: fine)"
                ).matches;

        } catch (error) {

            canHover =
                false;

        }


        if (
            photoCard &&
            canHover
        ) {

            photoCard.addEventListener(
                "pointermove",
                function (event) {

                    const rect =
                        photoCard.getBoundingClientRect();


                    if (
                        rect.width <= 0 ||
                        rect.height <= 0
                    ) {

                        return;

                    }


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        (
                            (
                                y -
                                rect.height / 2
                            ) /
                            (rect.height / 2)
                        ) *
                        -3;


                    const rotateY =
                        (
                            (
                                x -
                                rect.width / 2
                            ) /
                            (rect.width / 2)
                        ) *
                        3;


                    photoCard.style.transform =
                        "rotate(0deg) " +
                        "rotateX(" +
                        rotateX +
                        "deg) " +
                        "rotateY(" +
                        rotateY +
                        "deg) " +
                        "translateY(-4px)";

                }
            );


            photoCard.addEventListener(
                "pointerleave",
                function () {

                    photoCard.style.transform =
                        "rotate(2deg)";

                }
            );

        }


        /* =================================================
           19. PROJECT CARD POINTER EFFECT
        ================================================= */

        projectCards.forEach(
            function (card) {

                card.addEventListener(
                    "pointermove",
                    function (event) {

                        if (!canHover) {
                            return;
                        }


                        const rect =
                            card.getBoundingClientRect();


                        if (
                            rect.width <= 0 ||
                            rect.height <= 0
                        ) {

                            return;

                        }


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const rotateX =
                            (
                                (
                                    y -
                                    rect.height / 2
                                ) /
                                (rect.height / 2)
                            ) *
                            -1.5;


                        const rotateY =
                            (
                                (
                                    x -
                                    rect.width / 2
                                ) /
                                (rect.width / 2)
                            ) *
                            1.5;


                        card.style.setProperty(
                            "--card-rotate-x",
                            rotateX + "deg"
                        );


                        card.style.setProperty(
                            "--card-rotate-y",
                            rotateY + "deg"
                        );


                        card.classList.add(
                            "pointer-active"
                        );

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    function () {

                        card.style.setProperty(
                            "--card-rotate-x",
                            "0deg"
                        );


                        card.style.setProperty(
                            "--card-rotate-y",
                            "0deg"
                        );


                        card.classList.remove(
                            "pointer-active"
                        );

                    }
                );

            }
        );


        /* =================================================
           20. KEYBOARD ACCESSIBILITY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Tab"
                ) {

                    document.body.classList.add(
                        "keyboard-user"
                    );

                }

            }
        );


        /* =================================================
           21. CURRENT YEAR
        ================================================= */

        if (year) {

            year.textContent =
                String(
                    new Date().getFullYear()
                );

        }


        /* =================================================
           22. EXTERNAL LINK SAFETY
        ================================================= */

        document
            .querySelectorAll(
                'a[target="_blank"]'
            )
            .forEach(
                function (link) {

                    const rel =
                        (
                            link.getAttribute(
                                "rel"
                            ) || ""
                        )
                            .split(/\s+/)
                            .filter(Boolean);


                    if (
                        !rel.includes(
                            "noopener"
                        )
                    ) {

                        rel.push(
                            "noopener"
                        );

                    }


                    if (
                        !rel.includes(
                            "noreferrer"
                        )
                    ) {

                        rel.push(
                            "noreferrer"
                        );

                    }


                    link.setAttribute(
                        "rel",
                        rel.join(" ")
                    );

                }
            );


        /* =================================================
           23. FINAL SAFETY CHECK
        ================================================= */

        /*
           Pastikan reveal tidak tertinggal
           dalam keadaan tersembunyi.
        */

        window.setTimeout(
            function () {

                document
                    .querySelectorAll(
                        ".reveal"
                    )
                    .forEach(
                        function (element) {

                            if (
                                !element.classList.contains(
                                    "active"
                                )
                            ) {

                                element.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

            },
            2500
        );


        /* =================================================
           24. FINAL CONSOLE
        ================================================= */

        console.log(
            "========================================"
        );


        console.log(
            "AIKO.DEV Portfolio"
        );


        console.log(
            "Muhammad Aiko Anail Adi"
        );


        console.log(
            "HTML + CSS + JavaScript"
        );


        console.log(
            "JavaScript loaded successfully."
        );


        console.log(
            "========================================"
        );

    }
);