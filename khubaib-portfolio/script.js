document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTS
  ===================================================== */

  const body =
    document.body;

  const header =
    document.querySelector(".site-header");

  const menuButton =
    document.querySelector(".menu-button");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-link");

  const navLinks =
    document.querySelectorAll(".nav-links a");

  const sections =
    document.querySelectorAll("section[id]");

  const progressBar =
    document.querySelector(".page-progress-bar");

  const hero =
    document.querySelector(".hero");

  const revealElements =
    document.querySelectorAll(".reveal");

  const portrait =
    document.querySelector("[data-portrait]");

  const credentialSection =
    document.querySelector(".credential-section");

  const credentialStream =
    document.querySelector(".credential-stream");

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =====================================================
     NAVBAR
  ===================================================== */

  let previousScroll = 0;


  function handleNavbar() {

    const currentScroll =
      window.scrollY;


    if (currentScroll > 30) {

      header?.classList.add("scrolled");

    } else {

      header?.classList.remove("scrolled");

    }


    if (
      currentScroll > previousScroll &&
      currentScroll > 450 &&
      !body.classList.contains("menu-open") &&
      !body.classList.contains("viewer-open")
    ) {

      header?.classList.add("hidden");

    } else {

      header?.classList.remove("hidden");

    }


    previousScroll =
      Math.max(currentScroll, 0);

  }


  window.addEventListener(
    "scroll",
    handleNavbar,
    {
      passive: true
    }
  );


  /* =====================================================
     PAGE PROGRESS
  ===================================================== */

  function updatePageProgress() {

    if (!progressBar) return;


    const scrollTop =
      window.scrollY;


    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {

      progressBar.style.width =
        "0%";

      return;

    }


    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (scrollTop / documentHeight) * 100
        )
      );


    progressBar.style.width =
      `${progress}%`;

  }


  window.addEventListener(
    "scroll",
    updatePageProgress,
    {
      passive: true
    }
  );


  updatePageProgress();


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  function openMobileMenu() {

    body.classList.add(
      "menu-open"
    );

    menuButton?.classList.add(
      "active"
    );

    mobileMenu?.classList.add(
      "active"
    );

    menuButton?.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu?.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeMobileMenu() {

    body.classList.remove(
      "menu-open"
    );

    menuButton?.classList.remove(
      "active"
    );

    mobileMenu?.classList.remove(
      "active"
    );

    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu?.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  menuButton?.addEventListener(
    "click",
    () => {

      if (
        body.classList.contains(
          "menu-open"
        )
      ) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    }
  );


  mobileLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    }
  );


  /* =====================================================
     ESCAPE
  ===================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        body.classList.contains(
          "menu-open"
        )
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const id =
              link.getAttribute(
                "href"
              );


            if (
              !id ||
              id === "#"
            ) {

              return;

            }


            const target =
              document.querySelector(id);


            if (!target) return;


            event.preventDefault();


            const targetPosition =
              target
                .getBoundingClientRect()
                .top +
              window.scrollY -
              70;


            window.scrollTo({
              top: targetPosition,

              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth"
            });

          }
        );

      }
    );


  /* =====================================================
     REVEAL OBSERVER
  ===================================================== */

  if (
    prefersReducedMotion ||
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry
                .target
                .classList
                .add("visible");


              revealObserver.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -55px 0px"
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  if (
    "IntersectionObserver"
    in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              const sectionId =
                entry.target.id;


              navLinks.forEach(
                link => {

                  link.classList.remove(
                    "active"
                  );


                  if (
                    link.getAttribute(
                      "href"
                    ) ===
                    `#${sectionId}`
                  ) {

                    link.classList.add(
                      "active"
                    );

                  }

                }
              );

            }
          );

        },
        {
          threshold: 0,

          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =====================================================
     HERO POINTER
  ===================================================== */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    hero &&
    finePointer &&
    !prefersReducedMotion
  ) {

    hero.addEventListener(
      "pointermove",
      event => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        hero.style.setProperty(
          "--mouse-x",
          x.toFixed(3)
        );


        hero.style.setProperty(
          "--mouse-y",
          y.toFixed(3)
        );

      }
    );


    hero.addEventListener(
      "pointerleave",
      () => {

        hero.style.setProperty(
          "--mouse-x",
          0
        );

        hero.style.setProperty(
          "--mouse-y",
          0
        );

      }
    );

  }


  /* =====================================================
     SYSTEM CARD MOVEMENT
  ===================================================== */

  const systemCard =
    document.querySelector(
      ".hero-system-card"
    );


  if (
    systemCard &&
    finePointer &&
    !prefersReducedMotion
  ) {

    systemCard.addEventListener(
      "pointermove",
      event => {

        const rect =
          systemCard
            .getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        const rotateY =
          (x - 0.5) * 3;


        const rotateX =
          (0.5 - y) * 3;


        systemCard.style.transform =
          `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
          `;

      }
    );


    systemCard.addEventListener(
      "pointerleave",
      () => {

        if (
          window.innerWidth >
          1050
        ) {

          systemCard.style.transform =
            "rotate(1.8deg)";

        } else {

          systemCard.style.transform =
            "";

        }

      }
    );

  }


  /* =====================================================
     PORTRAIT PARALLAX
  ===================================================== */

  if (
    portrait &&
    finePointer &&
    !prefersReducedMotion
  ) {

    portrait.addEventListener(
      "pointermove",
      event => {

        const rect =
          portrait
            .getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        portrait.style.setProperty(
          "--portrait-x",
          `${x * 7}px`
        );


        portrait.style.setProperty(
          "--portrait-y",
          `${y * 7}px`
        );


        const frame =
          portrait.querySelector(
            ".portrait-frame"
          );


        if (frame) {

          frame.style.transform =
            `
              perspective(1200px)
              rotateX(${y * -1.8}deg)
              rotateY(${x * 1.8}deg)
              rotateZ(-1deg)
            `;

        }

      }
    );


    portrait.addEventListener(
      "pointerleave",
      () => {

        portrait.style.setProperty(
          "--portrait-x",
          "0px"
        );

        portrait.style.setProperty(
          "--portrait-y",
          "0px"
        );


        const frame =
          portrait.querySelector(
            ".portrait-frame"
          );


        if (frame) {

          frame.style.transform =
            "rotate(-1.4deg)";

        }

      }
    );

  }


  /* =====================================================
     FEATURE CARD SUBTLE TILT
  ===================================================== */

  const tiltCards =
    document.querySelectorAll(
      ".feature-card"
    );


  if (
    finePointer &&
    !prefersReducedMotion
  ) {

    tiltCards.forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card
                .getBoundingClientRect();


            const x =
              (
                event.clientX -
                rect.left
              ) /
              rect.width;


            const y =
              (
                event.clientY -
                rect.top
              ) /
              rect.height;


            const rotateY =
              (x - 0.5) * 2;


            const rotateX =
              (0.5 - y) * 2;


            card.style.transform =
              `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
              `;

          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =====================================================
     CREDENTIAL LOCAL CURSOR
  ===================================================== */

  const credentialDocuments =
    document.querySelectorAll(
      ".credential-document"
    );


  if (
    finePointer &&
    !prefersReducedMotion
  ) {

    credentialDocuments.forEach(
      documentCard => {

        documentCard.addEventListener(
          "pointermove",
          event => {

            const imageWrap =
              documentCard.querySelector(
                ".credential-image-wrap"
              );


            if (!imageWrap) return;


            const rect =
              imageWrap
                .getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            imageWrap.style.setProperty(
              "--cursor-x",
              `${x}px`
            );


            imageWrap.style.setProperty(
              "--cursor-y",
              `${y}px`
            );

          }
        );

      }
    );

  }


  /* =====================================================
     CREDENTIAL RAIL PROGRESS
  ===================================================== */

  function updateCredentialProgress() {

    if (
      !credentialStream
    ) {

      return;

    }


    const rect =
      credentialStream
        .getBoundingClientRect();


    const viewportHeight =
      window.innerHeight;


    const start =
      viewportHeight * 0.72;


    const travelled =
      start -
      rect.top;


    const total =
      rect.height -
      viewportHeight * 0.25;


    let progress =
      travelled / total;


    progress =
      Math.min(
        1,
        Math.max(
          0,
          progress
        )
      );


    credentialStream.style.setProperty(
      "--credential-progress",
      `${progress * 100}%`
    );

  }


  window.addEventListener(
    "scroll",
    updateCredentialProgress,
    {
      passive: true
    }
  );


  updateCredentialProgress();


  /* =====================================================
     CREDENTIAL VIEWER
  ===================================================== */

  const viewer =
    document.getElementById(
      "credential-viewer"
    );


  const viewerClose =
    viewer?.querySelector(
      ".viewer-close"
    );


  const viewerImage =
    viewer?.querySelector(
      ".viewer-image"
    );


  const viewerDocument =
    viewer?.querySelector(
      ".viewer-document"
    );


  const viewerNumber =
    viewer?.querySelector(
      ".viewer-number"
    );


  const viewerTitle =
    viewer?.querySelector(
      ".viewer-title"
    );


  const viewerProvider =
    viewer?.querySelector(
      ".viewer-provider"
    );


  const viewerYear =
    viewer?.querySelector(
      ".viewer-year"
    );


  const viewerCategory =
    viewer?.querySelector(
      ".viewer-category"
    );


  const credentialOpenButtons =
    document.querySelectorAll(
      ".credential-open"
    );


  function openCredential(
    button
  ) {

    if (
      !viewer ||
      !viewerImage ||
      !viewerDocument
    ) {

      return;

    }


    const src =
      button.dataset.src;


    const number =
      button.dataset.number ||
      "";


    const title =
      button.dataset.title ||
      "";


    const provider =
      button.dataset.provider ||
      "";


    const year =
      button.dataset.year ||
      "";


    const category =
      button.dataset.category ||
      "";


    const rotate =
      button.dataset.rotate ===
      "true";


    viewerImage.src =
      src;


    viewerImage.alt =
      `${title} certificate`;


    if (viewerNumber) {

      viewerNumber.textContent =
        number;

    }


    if (viewerTitle) {

      viewerTitle.textContent =
        title;

    }


    if (viewerProvider) {

      viewerProvider.textContent =
        provider;

    }


    if (viewerYear) {

      viewerYear.textContent =
        year;

    }


    if (viewerCategory) {

      viewerCategory.textContent =
        category;

    }


    viewerDocument
      .classList
      .toggle(
        "is-rotated",
        rotate
      );


    body.classList.add(
      "viewer-open"
    );


    header?.classList.remove(
      "hidden"
    );


    viewer.showModal();

  }


  function closeCredential() {

    if (
      !viewer ||
      !viewer.open
    ) {

      return;

    }


    viewer.close();


    body.classList.remove(
      "viewer-open"
    );

  }


  credentialOpenButtons
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openCredential(
              button
            );

          }
        );

      }
    );


  viewerClose?.addEventListener(
    "click",
    closeCredential
  );


  /* =====================================================
     CLOSE VIEWER BY CLICKING BACKDROP
  ===================================================== */

  viewer?.addEventListener(
    "click",
    event => {

      if (
        event.target === viewer
      ) {

        closeCredential();

      }

    }
  );


  viewer?.addEventListener(
    "close",
    () => {

      body.classList.remove(
        "viewer-open"
      );

    }
  );


  /* =====================================================
     RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth >
        850 &&
        body.classList.contains(
          "menu-open"
        )
      ) {

        closeMobileMenu();

      }


      updatePageProgress();

      updateCredentialProgress();

    }
  );

});