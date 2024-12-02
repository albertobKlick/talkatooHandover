document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".sectionScroll"),
        currentSection = sections[0];

    gsap.defaults({ overwrite: 'auto', duration: 1 });

    function resetAnimations() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf("*");
    }

    function belowSections(){
        const otherElements = document.querySelectorAll('section');

        otherElements.forEach((section, i) => {
            
            ScrollTrigger.create({
                trigger: section,
                start: "top 92%",
                end: "bottom 10%",
                markers: false,
                onEnter: () => gsap.to(section, { opacity: 1, y: 0, duration: 1 }),
                onLeaveBack: () => gsap.to(section, { opacity: 0, y: 50, duration: 1 })
            });

            // AI Image section
            if (section.classList.contains('content-section-48')) {
                const darkClouds = section.querySelector('.clouds svg path:nth-child(1)');
                const darkClouds2 = section.querySelector('.clouds svg path:nth-child(2)');

                const imgbackground = section.querySelector('.bg-img');

                if (darkClouds && darkClouds2) {
                    const cloudTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: darkClouds,
                            start: 'top bottom',
                            toggleActions: "play none none none",
                            scrub: true,
                            markers: false
                        }
                    });

                    cloudTimeline.fromTo(darkClouds, { x: -100 }, { x: 0, duration: 1 });
                    cloudTimeline.fromTo(darkClouds2, { x: 100 }, { x: 0, duration: 1 }, "<0.5");
                }

                if (imgbackground) {
                    const imageTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: imgbackground,
                            start: "top center", // Start when the top of the container reaches the center of the viewport
                            end: "bottom 50%",
                            scrub: true,
                            markers: false
                        }
                    });
                    imageTimeline.fromTo(imgbackground, { scale: 1.25 }, { scale: 1, duration: 0.5 });
                }
            }

            //mobile assistance section
            if (section.classList.contains('content-section-49')) {
                const chatBubbles = section.querySelectorAll('.chat-bubbles img');
                const computerScreenLines = section.querySelectorAll('.computerscreen svg path:nth-child(n+9):nth-child(-n+13)');
                const computerScreenCursor = section.querySelectorAll('.computerscreen svg path:nth-child(14)');

                // temporary
                chatBubbles.forEach((img) => {
                    img.src = img.getAttribute('data-layzy-src');
                })

                if (chatBubbles.length) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: ".chat-bubbles", // Target the container of the images
                            start: "top 80%", // Start when the top of the container reaches the center of the viewport
                            end: "bottom 40%", // End when the bottom of the container reaches the top of the viewport
                            scrub: 0.5, // Smoothly follow the scroll progress
                            once: true,
                            markers: false, // Enable markers for debugging (optional)
                        }
                    })
                        .fromTo(chatBubbles,
                            { opacity: 0, y: 35 }, // Start state
                            { opacity: 1, y: 0, duration: 0.3, stagger: 0.15 } // End state with stagger
                        );
                }

                if (computerScreenLines.length) {
                    const linesTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.computerscreen',
                            start: 'top 80%',
                            end: 'top 30%',
                            scrub: true,
                            markers: false,
                            once: true //set to true after
                        }
                    });

                    linesTimeline.fromTo(
                        computerScreenLines,
                        { scale: 0, transformOrigin: "left center" },
                        {
                            scale: 1,
                            duration: 1,
                            stagger: 0.2,
                        }
                    );
                    gsap.set(computerScreenCursor, { opacity: 0 });

                }
            }

            //signature section
            if (section.classList.contains('content-section-50')) {
                const svgsig = section.querySelector('.signature svg path');

                const pathLength = svgsig.getTotalLength();

                gsap.set(svgsig, {
                    strokeDasharray: pathLength, // Make the dash length equal to the path length
                    strokeDashoffset: pathLength, // Offset the dash to "hide" the path
                    stroke: "white",
                    shapeRendering: "geometricPrecision"
                });

                // Animate the path
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".signature",
                        start: "top 80%", // Start animation when SVG is 80% into the viewport
                        end: "top 20%",  // End when the SVG is 20% into the viewport
                        // scrub: 0.5,
                        once: true,    // Smoothly tie animation to scroll
                        markers: false   // Debugging markers (optional)
                    }
                }).to(svgsig, {
                    strokeDashoffset: 0, // Draw the path by reducing the offset to 0
                    duration: 1.5, // Adjust this for the speed of the effect
                    ease: "power1.inOut" // Smoother easing
                });
            }

            //demo section
            if (section.classList.contains('content-section-51')) {
                
                const cloudsBirdsPaths = section.querySelector('.clouds');
                const cloudsTrigger = (innerWidth > 1400 ) ? cloudsBirdsPaths : section.querySelector('h2');
                const firstCloud = section.querySelectorAll('.clouds svg path:nth-child(1)');
                const cloudPaths = section.querySelectorAll('.clouds svg path:nth-child(n+2):nth-child(-n+6)');
                const birdsPaths = section.querySelectorAll('.clouds svg path:nth-child(n+6):nth-child(-n+8)');
                const birdsPaths2 = section.querySelectorAll('.clouds svg path:nth-child(n+9)');

                if (cloudPaths && birdsPaths) {
                    const cloudBirdsTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: cloudsTrigger,
                            start: "top 40%", // Start animation when SVG is 80% into the viewport
                            end: "bottom 40%",  // End when the SVG is 20% into the viewport
                            scrub: true,
                            markers: false,
                        }
                    });

                    cloudBirdsTimeline.fromTo(firstCloud, { x: -70, opacity:0 }, { x: 0, opacity: 1, duration: 1.5 });
                    cloudBirdsTimeline.fromTo(cloudPaths, { x: 70, opacity:0 }, { x: 0, opacity: 1, duration: 2 }, "<0.5" );
                    cloudBirdsTimeline.fromTo(birdsPaths, { x: -200, y: 175, opacity:0 }, { opacity: 1, x: 0, y: 0, duration: 2, delay: 0.12 }, "<0.5");
                    cloudBirdsTimeline.fromTo(birdsPaths2, { x: -200, y: 175, opacity:0 }, { opacity: 1, x: 0, y: 0, duration: 2 }, "<0.5");
                }
            }
        });
    }

    function initMobileAnimations() {
            
        resetAnimations();
    
        const iconsWrap = sections[1].querySelector('.iconsWrap');
        const icons = sections[1].querySelectorAll('.iconel');
        const sectionTitles = sections[1].querySelectorAll('h1');
        
        const phoneImg = sections[1].querySelectorAll('.new-video-section + div');
        
        // Fade in section title
        gsap.to(".iconParent h1", {
            opacity: 1,
            duration: 1.5,
            ease: "power1.out",
            scrollTrigger: {
                trigger: sections[1],
                start: "top 80%",
                end: "top 50%",
                once: true, // Ensures it runs only once
                //markers: { startColor: 'yellow' },
                toggleActions: "play none none none"
            }
        });
    
        // Icons fade-in and animation timeline
        const iconsFadeInTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: iconsWrap, // Use iconsWrap for better separation
                start: "top 87.5%",
                end: "bottom bottom",
                once: true, // Ensure the animation runs only once
                //markers: { startColor: "blue" },
            }
        });
    
        iconsFadeInTimeline
            .to(phoneImg, {opacity: 0, duration: 0.5})
            .to(iconsWrap, { opacity: 1, duration: 0.2 })
            .to(icons, { opacity: 1, duration: 0.25, stagger: 0.1 })
            .to(".iconParent h1", { opacity: 0, duration: 0.5 }) // Only if necessary
            .to(sectionTitles[0], { opacity: 1, duration: 0.5 });

        
        ScrollTrigger.matchMedia({
            // For devices between 728px and 1200px
            "(min-width: 728px) and (max-width: 1200px)": function() {
                let growDivTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: iconsWrap,
                        start: "25% center",
                        end: "bottom center",
                        scrub: false,
                        once: true,
                        //markers: { startColor: "orange" },
                    }
                });
                growDivTimeline
                    .to('.iconel img', {
                        opacity: 0,
                        duration: 1,
                        height: 50
                    })
                    .to('.iconel .rectangle', {
                        width: '133px',
                        height: '36px',
                        opacity: 1,
                        borderRadius: 0,
                        duration: 1,
                        ease: "power1.out"
                    }, "<");
            },
        
            // For devices below 728px
            "(max-width: 727px)": function() {
                let growDivTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: iconsWrap,
                        start: "25% 80%",
                        end: "bottom center",
                        scrub: false,
                        once: true,
                        //markers: { startColor: "orange" },
                    }
                });
                growDivTimeline
                    .to('.iconel img', {
                        opacity: 0,
                        duration: 1,
                        height: 50 // Adjust height for smaller screens
                    })
                    .to('.iconel .rectangle', {
                        width: window.innerWidth - 30, // Adjust width
                        height: '36px', // Adjust height
                        opacity: 1,
                        borderRadius: 5, // Adjust border-radius
                        duration: 1,
                        ease: "power1.out"
                    }, "<");
            }
        });
    
        // Video section animation
        const videoSectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.new-video-section',
                start: window.innerWidth < 768 ? 'top 78%' : 'top 75%',
                end: 'bottom bottom',
                once: true,
                //markers: { startColor: 'pink' }
            }
        });
    
        videoSectionTimeline.to('.new-video-section', { opacity: 1, duration: 1, y: 50 });
    
        // Ensure any additional animations are run cleanly
        belowSections();
    }
    
    let isAnimating = false; 

    function initAnimations() {
        resetAnimations();

        // Define target width and height for the inner div based on responsive check
        const isTablet = window.innerWidth >= 728 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;
        const targetDivWidth = (isDesktop || isTablet) ? 625 : window.innerWidth - 30;
        const targetDivHeight = 39;

        // Adjust the height for the scrollable area
        // gsap.set(".new-homesection", { height: (sections.length * 100) - 50 + "dvh" });
        gsap.set(".new-homesection", { height: (sections.length * 100) + 50 + "dvh" });

        sections.forEach((section, i) => {
            const iconsWrap = section.querySelector('.iconsWrap');
            const icons = section.querySelectorAll('.iconel');
            const elementsToFadeUp = section.querySelectorAll('.fade-up');
            const elementsToFadeIn = section.querySelectorAll('.fade-in');
            const title = section.querySelector('.title');
            const nextElements = document.querySelectorAll('.next-elements');

            let fadeInTimeline;
            if (i === 0) {
                // Special ScrollTrigger for the first section
                fadeInTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top", // Trigger as soon as scrolling starts
                        end: "bottom top", // Ensure quick fade-out
                        scrub: true,
                        onEnter: () => setSection(sections[1]), // Immediately switch to the second section
                        onLeaveBack: () => setSection(section), // Allow the first section to come back on reverse scroll
                    }
                });
            } else {
                fadeInTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top", // Trigger as soon as scrolling starts
                        end: "bottom top", // Ensure quick fade-out
                        // scrub: true,
                        //markers: {startColor: 'yellow'},
                        onToggle: (self) => self.isActive && setSection(section),
                    }
                });
            }

            const iconsFadeInTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger:iconsWrap,
                    start: "13% center",
                    end: "15% top",
                    once: true,
                    //markers: {startColor: 'blue'},
                    //toggleActions: "play none play reverse",
                    onEnter: () => {
                        if (!isAnimating) {
                            document.body.classList.add('overflowscroll');
                            isAnimating = true;
                            iconsFadeInTimeline.eventCallback("onComplete", () => {
                                isAnimating = false;
                                document.body.classList.remove('overflowscroll');
                            });
                        }
                    }
                }
            });
            
            iconsFadeInTimeline.fromTo(icons, { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 });

            // fadeInTimeline.fromTo(icons, { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 });

            if (isDesktop || isTablet) {
                // Desktop-specific repositioning animations
                const scrollOutTimeline = gsap.timeline({
                    scrollTrigger: {
                        start: "13% 40%",
                        end: "21% center",
                        scrub: false, // Keeps animation independent of scroll position
                        //markers: {startColor: "orange"},
                        toggleActions: "play none play reverse",
                        onEnter: () => {
                            if (!isAnimating) {
                                isAnimating = true;
                                scrollOutTimeline.eventCallback("onComplete", () => {
                                    isAnimating = false;
                                });
                            }
                        }
                    },
                    // delay: 1
                });
                scrollOutTimeline.fromTo(elementsToFadeUp, {
                    opacity: 1,
                    y: 0,
                }, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                });

                scrollOutTimeline.fromTo(icons, {
                    x: 0,
                    y: 0,
                    transformOrigin: "center center",
                } ,{
                    x: (index) => `-${index * 133}px`,
                    y: (index) => `${index * 100 - 200 + 60}px`,
                    scale: 1,
                    transformOrigin: "center center",
                    duration: 0.7,
                    stagger: 0.1
                });
            
                scrollOutTimeline.to(iconsWrap, {
                    y: () => `-${innerHeight / 10}px`,
                    x: () => {
                        const xvalue = (window.innerWidth - 625) / 4.38;
                        const minValue = isDesktop ? 170 : 300;
                        return `${Math.max(xvalue, minValue)}px`;
                    },
                    width: '533px',
                    duration: 0.7,
                    ease: "power1.inOut"
                }, 0);

                scrollOutTimeline.fromTo(elementsToFadeIn, {
                    opacity: 0,
                    y: 50,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1
                });

                

            } else {
                // Fade-in effect on elements with .fade-in class
                if (elementsToFadeIn.length) {
                    const fadeInNewElementsTimeline = gsap.timeline({
                        scrollTrigger: {
                            start: "13% 45%",
                            end: "21% center",
                            scrub: false,
                            // markers: false,
                            toggleActions: "play none play reverse" // Controls the animation states
                        }
                    });

                    fadeInNewElementsTimeline.fromTo(elementsToFadeIn, {
                        opacity: 0,
                        y: 50,
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.1
                    });
                }
            }           

            // Inner div growth and icon shrinkage animations
            const growDivTimeline = gsap.timeline({
                scrollTrigger: {
                    start: "15% 30%",
                    end: "21% center",
                    scrub: false, // Keeps the animation not tied to scroll
                    //markers: {startColor: "pink"},
                    toggleActions: "play none play reverse",
                    onEnter: () => {
                        if (!isAnimating) {
                            isAnimating = true;
                            growDivTimeline.eventCallback("onComplete", () => {
                                isAnimating = false;
                            });
                        }
                    }
                }
            });
            
            icons.forEach((icon, index) => {
                const innerDiv = icon.querySelector('div');
                const image = icon.querySelector('img');
            
                if (innerDiv && image) {
                    gsap.set(innerDiv, { width: 0, height: 0 });
            
                    growDivTimeline.to(innerDiv, {
                        width: targetDivWidth,
                        height: targetDivHeight,
                        duration: 0.7,
                        opacity: 1,
                        borderRadius: 0,
                        ease: "power1.inOut"
                    }, index * 0.15);
            
                    growDivTimeline.to(image, {
                        scale: 0,
                        duration: 0.7,
                        opacity: 0,
                        ease: "power1.inOut",
                    }, "<");
            
                    if (isDesktop || isTablet) {
                        growDivTimeline.to(icon, {
                            y: `${index * 70 - 150}px`,
                            duration: 0.7,
                            ease: "power1.inOut"
                        }, index * 0.15);
                    } else {
                        growDivTimeline.to(icon, {
                            y: `-${index * 30}px`,
                            duration: 1,
                            ease: "power1.inOut"
                        }, index * 0.15);
                    }
                }
            });
            

            // Fade-out iconsWrap and title, and fade-in nextElements
            if (iconsWrap && title) {
                const fadeOutCurrentAndInNext = gsap.timeline({
                    scrollTrigger: {
                        start: "18% 15%",
                        // end: () => (i + 2.5) * innerHeight,
                        end: "21% center",
                        scrub: false,
                        //markers: {startColor: "purple"},
                        toggleActions: "play none play reverse", // Controls the animation states
                        onUpdate: (self) => {
                            nextElements.forEach(el => {
                                if (self.progress > 0 && el.classList.contains("not-clickable")) {
                                    el.classList.remove("not-clickable");
                                } else if (self.progress <= 0 && !el.classList.contains("partially-visible")) {
                                    el.classList.add("not-clickable");
                                }
                            });
                        },
                        onEnter: () => {
                            if (!isAnimating) {
                                isAnimating = true;
                                fadeOutCurrentAndInNext.eventCallback("onComplete", () => {
                                    isAnimating = false;
                                });
                            }
                        }
                    }
                });

                fadeOutCurrentAndInNext.to([iconsWrap, title], {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: "power1.inOut"
                });

                if (nextElements.length) {
                    fadeOutCurrentAndInNext.fromTo(nextElements, {
                        opacity: 0,
                        y: 0,
                        top: 0
                    }, {
                        opacity: 1,
                        y: '-50%',
                        top: '50%',
                        duration: 1,
                        ease: "power1.inOut",
                        stagger: 0.1
                    }, "<");

                    const videoplayer = document.querySelector('.new-video-section .video-element');
                    fadeOutCurrentAndInNext.fromTo(videoplayer,
                        { scale: 0.25 },
                        { scale: 1, duration: 0.8, ease: "power1.out" },
                        "<"
                    );
                }
            }
        });

        belowSections();
    }
        

    function setSection(newSection) {
        if (newSection !== currentSection) {
            const isFirstSection = currentSection === sections[0];
    
            // Immediate fade-out for the first section
            if (isFirstSection) {
                gsap.to(currentSection, { autoAlpha: 0, duration: 0.4 });
            } else {
                gsap.to(currentSection, { y: -50, autoAlpha: 0, duration: 0.8 });
            }

            gsap.to(newSection, { y: 0, autoAlpha: 1, duration: 0.8 });
    
            currentSection = newSection;
        }
    }

    // Initialize animations on load
    //initAnimations();

    function isTouchEnabled() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
      }
      
    let isTouch;
    
    function setAnimations (width) {
        isTouch = isTouchEnabled();
        if (!isTouch) {
            document.body.classList.remove('istouch');
            initAnimations();
        } else {
            document.body.classList.add('istouch');
            initMobileAnimations();
        }
    }

    // initial
    setAnimations(window.innerWidth);

    // Reinitialize animations on window resize for responsiveness
    //window.addEventListener("resize", initAnimations);
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => setAnimations(window.innerWidth), 200);
    });

});
