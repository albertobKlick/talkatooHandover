document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".sectionScroll"),
        currentSection = sections[0];

    gsap.defaults({ overwrite: 'auto', duration: 1 });

    

    function initAnimations() {
        // Clear existing ScrollTriggers and animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf("*");

        // Define target width and height for the inner div based on responsive check
        const isTablet = window.innerWidth >= 728 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;
        const targetDivWidth = (isDesktop || isTablet) ? 625 : window.innerWidth - 30;
        const targetDivHeight = 39;

        // Adjust the height for the scrollable area
        gsap.set(".new-homesection", { height: (sections.length * 100 + 100) + "dvh" });

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
                        start: () => (i - 0.5) * innerHeight,
                        end: () => (i + 0.5) * innerHeight,
                        // scrub: true,
                        //markers: true,
                        onToggle: (self) => self.isActive && setSection(section),
                    }
                });
            }

            const iconsFadeInTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger:iconsWrap,
                    start: "top center",
                    end: "bottom top",
                    // once: true,
                    markers: false,
                    toggleActions: "play none play reverse" // Ensures the animation reverses
                }
            });
            
            iconsFadeInTimeline.fromTo(icons, { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 });

            // fadeInTimeline.fromTo(icons, { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 });

            if (isDesktop || isTablet) {
                // Desktop-specific repositioning animations
                const scrollOutTimeline = gsap.timeline({
                    scrollTrigger: {
                        start: () => (i + 0) * innerHeight-200,
                        end: () => (i + 0.1) * innerHeight-200,
                        // start: () => innerHeight,
                        // end: () => innerHeight,
                        // start: "top center",
                        // end: "bottom center",
                        scrub: false, // Keeps animation independent of scroll position
                        markers: false,
                        toggleActions: "play none play reverse" // Ensures the animation reverses
                    },
                    delay: 1
                });
            
                scrollOutTimeline.to(icons, {
                    x: (index) => `-${index * 133}px`,
                    y: (index) => `${index * 100 - 200 + 60}px`,
                    scale: 1,
                    transformOrigin: "center center",
                    duration: 1,
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
                    duration: 1,
                    ease: "power1.inOut"
                }, 0);

                scrollOutTimeline.fromTo(elementsToFadeIn, {
                    opacity: 0,
                    y: 50,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1
                });
            } else {
                // Fade-in effect on elements with .fade-in class
                if (elementsToFadeIn.length) {
                    const fadeInNewElementsTimeline = gsap.timeline({
                        scrollTrigger: {
                            start: () => (i + 0.1) * innerHeight,
                            end: () => (i + 0.1) * innerHeight,
                            scrub: false,
                            markers: false,
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
            

            // Fade-up animation for elements with .fade-up class
            if (elementsToFadeUp.length) {
                const fadeUpTimeline = gsap.timeline({
                    scrollTrigger: {
                        start: () => (i + 0) * innerHeight-200,
                        end: () => (i + 0.1) * innerHeight-200,
                        scrub: false,
                        markers: false,
                        toggleActions: "play none play reverse" // Ensures the animation reverses
                    }
                });

                fadeUpTimeline.to(elementsToFadeUp, {
                    y: -50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1
                });
            }

            

            // Inner div growth and icon shrinkage animations
            const growDivTimeline = gsap.timeline({
                scrollTrigger: {
                    start: () => (i + 0.1) * innerHeight,
                    end: () => (i + 2.5) * innerHeight,
                    scrub: false, // Keeps the animation not tied to scroll
                    markers: false,
                    toggleActions: "play none play reverse" // Controls the animation states
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
                        duration: 1,
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
                            duration: 1,
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
                        start: () => '20%',
                        end: () => (i + 2.5) * innerHeight,
                        scrub: false,
                        markers: false,
                        toggleActions: "play none play reverse", // Controls the animation states
                        onUpdate: (self) => {
                            nextElements.forEach(el => {
                                if (self.progress >= 0.65 && el.classList.contains("not-clickable")) {
                                    el.classList.remove("not-clickable");
                                } else if (self.progress < 0.65 && !el.classList.contains("partially-visible")) {
                                    el.classList.add("not-clickable");
                                }
                            });
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

        const otherElements = document.querySelectorAll('section');

    otherElements.forEach((section, i) => {
        
        ScrollTrigger.create({
            trigger: section,
            start: "top 75%",
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
    initAnimations();
    

    // Reinitialize animations on window resize for responsiveness
    window.addEventListener("resize", initAnimations);

});
