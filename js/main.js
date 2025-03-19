/**
 * TÜRK TURİZM - MAIN JAVASCRIPT
 * Custom animations and interactive elements
 */

// ===== PRELOADER =====
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const preloader = document.querySelector(".preloader")
    const header = document.querySelector(".header")
    const backToTop = document.querySelector(".back-to-top")
    const mobileMenuToggle = document.querySelector(".mobile-toggle")
    const nav = document.querySelector(".nav")
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
    const heroSlides = document.querySelectorAll(".hero-slide")
    const heroDots = document.querySelectorAll(".hero-dot")
    const heroArrows = document.querySelectorAll(".hero-arrow")
    const filterBtns = document.querySelectorAll(".filter-btn")
    const tourCards = document.querySelectorAll(".tour-card")
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialDots = document.querySelectorAll(".testimonial-dot")
    const cookieConsent = document.querySelector(".cookie-consent")
    const acceptCookieBtn = document.querySelector(".accept-cookies")
    const rejectCookieBtn = document.querySelector(".reject-cookies")
    const statNumbers = document.querySelectorAll(".counter")
    const counterNumbers = document.querySelectorAll(".counter")
  
    // Hide preloader after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("fade-out")
        setTimeout(() => {
          preloader.style.display = "none"
        }, 1000)
  
        // Animate elements after preloader is hidden
        animateOnScroll()
  
        // Show cookie consent after a delay
        setTimeout(() => {
          if (!localStorage.getItem("cookieConsent")) {
            cookieConsent.classList.add("show")
          }
        }, 2000)
      }, 1000)
    })
  
    // Custom cursor
    if (cursor && cursorFollower) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
  
        // Add a slight delay to the follower for a smooth effect
        setTimeout(() => {
          cursorFollower.style.left = `${e.clientX}px`
          cursorFollower.style.top = `${e.clientY}px`
        }, 50)
      })
  
      // Change cursor size on hover over links and buttons
      document.querySelectorAll("a, button, .btn").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.style.transform = "translate(-50%, -50%) scale(0.5)"
          cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
          cursorFollower.style.backgroundColor = "rgba(0, 168, 204, 0.2)"
          cursorFollower.style.border = "none"
        })
  
        el.addEventListener("mouseleave", () => {
          cursor.style.transform = "translate(-50%, -50%) scale(1)"
          cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
          cursorFollower.style.backgroundColor = "transparent"
          cursorFollower.style.border = "1px solid var(--primary-color)"
        })
      })
    }
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
  
      // Show/hide back to top button
      if (window.scrollY > 500) {
        backToTop.classList.add("show")
      } else {
        backToTop.classList.remove("show")
      }
  
      // Animate elements on scroll
      animateOnScroll()
    })
  
    // Back to top button
    if (backToTop) {
      backToTop.addEventListener("click", (e) => {
        e.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  
    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active")
        nav.classList.toggle("show")
        document.body.classList.toggle("no-scroll")
      })
    }
  
    // Hero slider
    let currentSlide = 0
    const totalSlides = heroSlides.length
  
    function showSlide(index) {
      // Hide all slides
      heroSlides.forEach((slide) => {
        slide.classList.remove("active")
      })
  
      // Remove active class from all dots
      heroDots.forEach((dot) => {
        dot.classList.remove("active")
      })
  
      // Show the selected slide
      heroSlides[index].classList.add("active")
  
      // Add active class to the corresponding dot
      heroDots[index].classList.add("active")
  
      // Update current slide index
      currentSlide = index
    }
  
    // Auto slide change
    let slideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides
      showSlide(nextSlide)
    }, 7000)
  
    // Hero dots click event
    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval)
        showSlide(index)
  
        // Restart auto slide
        slideInterval = setInterval(() => {
          const nextSlide = (currentSlide + 1) % totalSlides
          showSlide(nextSlide)
        }, 7000)
      })
    })
  
    // Hero arrows click event
    if (heroArrows.length === 2) {
      // Previous arrow
      heroArrows[0].addEventListener("click", () => {
        clearInterval(slideInterval)
        const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides
        showSlide(prevSlide)
  
        // Restart auto slide
        slideInterval = setInterval(() => {
          const nextSlide = (currentSlide + 1) % totalSlides
          showSlide(nextSlide)
        }, 7000)
      })
  
      // Next arrow
      heroArrows[1].addEventListener("click", () => {
        clearInterval(slideInterval)
        const nextSlide = (currentSlide + 1) % totalSlides
        showSlide(nextSlide)
  
        // Restart auto slide
        slideInterval = setInterval(() => {
          const nextSlide = (currentSlide + 1) % totalSlides
          showSlide(nextSlide)
        }, 7000)
      })
    }
  
    // Tours filter
    if (filterBtns.length > 0 && tourCards.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((b) => b.classList.remove("active"))
  
          // Add active class to clicked button
          btn.classList.add("active")
  
          const filter = btn.getAttribute("data-filter")
  
          // Filter tour cards
          tourCards.forEach((card) => {
            if (filter === "all" || card.getAttribute("data-category") === filter) {
              card.style.display = "block"
              setTimeout(() => {
                card.style.opacity = "1"
                card.style.transform = "translateY(0)"
              }, 100)
            } else {
              card.style.opacity = "0"
              card.style.transform = "translateY(20px)"
              setTimeout(() => {
                card.style.display = "none"
              }, 300)
            }
          })
        })
      })
    }
  
    // Testimonial slider
    let currentTestimonial = 0
    const totalTestimonials = testimonialSlides.length
  
    function showTestimonial(index) {
      // Hide all testimonials
      testimonialSlides.forEach((slide) => {
        slide.classList.remove("active")
      })
  
      // Remove active class from all dots
      testimonialDots.forEach((dot) => {
        dot.classList.remove("active")
      })
  
      // Show the selected testimonial
      testimonialSlides[index].classList.add("active")
  
      // Add active class to the corresponding dot
      testimonialDots[index].classList.add("active")
  
      // Update current testimonial index
      currentTestimonial = index
    }
  
    // Auto testimonial change
    let testimonialInterval = setInterval(() => {
      const nextTestimonial = (currentTestimonial + 1) % totalTestimonials
      showTestimonial(nextTestimonial)
    }, 5000)
  
    // Testimonial dots click event
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(testimonialInterval)
        showTestimonial(index)
  
        // Restart auto testimonial
        testimonialInterval = setInterval(() => {
          const nextTestimonial = (currentTestimonial + 1) % totalTestimonials
          showTestimonial(nextTestimonial)
        }, 5000)
      })
    })
  
    // Cookie consent
    if (cookieConsent && acceptCookieBtn && rejectCookieBtn) {
      // Check if user has already made a choice
      if (!localStorage.getItem("cookieConsent")) {
        // Show the cookie consent banner after a short delay
        setTimeout(() => {
          cookieConsent.classList.add("show")
        }, 1000)
      }
  
      // Accept cookies
      acceptCookieBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted")
        cookieConsent.classList.remove("show")
      })
  
      // Reject cookies
      rejectCookieBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "rejected")
        cookieConsent.classList.remove("show")
      })
    }
  
    // Animate counter numbers
    function animateCounter(el) {
      const target = Number.parseInt(el.getAttribute("data-target"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 60fps
      let current = 0
  
      const timer = setInterval(() => {
        current += step
        el.textContent = Math.floor(current)
  
        if (current >= target) {
          el.textContent = target
          clearInterval(timer)
        }
      }, 16)
    }
  
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(
        ".animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-zoom-in",
      )
  
      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight * 0.8) {
          el.style.visibility = "visible"
        }
      })
  
      // Animate counter numbers when in viewport
      statNumbers.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight * 0.8 && !el.classList.contains("animated")) {
          el.classList.add("animated")
          animateCounter(el)
        }
      })
  
      // Animate counter section numbers when in viewport
      counterNumbers.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight * 0.8 && !el.classList.contains("animated")) {
          el.classList.add("animated")
          animateCounter(el)
        }
      })
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Close mobile menu if open
        if (nav.classList.contains("show")) {
          mobileMenuToggle.classList.remove("active")
          nav.classList.remove("show")
          document.body.classList.remove("no-scroll")
        }
  
        const targetId = this.getAttribute("href")
  
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = header.offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Form validation
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        let isValid = true
        const formElements = contactForm.elements
  
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].hasAttribute("required") && !formElements[i].value) {
            isValid = false
            formElements[i].classList.add("error")
          } else {
            formElements[i].classList.remove("error")
          }
        }
  
        if (isValid) {
          // Show success message (in a real application, you would submit the form)
          const successMessage = document.createElement("div")
          successMessage.className = "form-success"
          successMessage.textContent = "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
  
          contactForm.reset()
          contactForm.appendChild(successMessage)
  
          setTimeout(() => {
            successMessage.remove()
          }, 5000)
        }
      })
    }
  
    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        const emailInput = newsletterForm.querySelector('input[type="email"]')
        if (emailInput.value) {
          // Show success message (in a real application, you would submit the form)
          const successMessage = document.createElement("div")
          successMessage.className = "newsletter-success"
          successMessage.textContent = "Bültenimize başarıyla abone oldunuz."
  
          newsletterForm.reset()
          newsletterForm.parentNode.appendChild(successMessage)
  
          setTimeout(() => {
            successMessage.remove()
          }, 5000)
        }
      })
    }
  
    // Add parallax effect to hero section
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      const heroSection = document.querySelector(".hero")
  
      if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    })
  
    // Initialize animations
    animateOnScroll()
  })
  
  