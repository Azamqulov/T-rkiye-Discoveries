// Cookie Consent Management
document.addEventListener("DOMContentLoaded", () => {
    const cookieConsent = document.getElementById("cookieConsent")
    const cookieAccept = document.getElementById("cookieAccept")
    const cookieReject = document.getElementById("cookieReject")
  
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem("cookieConsent")
  
    if (!consentStatus) {
      // Show cookie consent banner after a delay
      setTimeout(() => {
        cookieConsent.classList.add("show")
      }, 2000)
    } else if (consentStatus === "accepted") {
      // Initialize analytics if consent was given
      initializeAnalytics()
    }
  
    // Accept button event listener
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted")
      cookieConsent.classList.remove("show")
      initializeAnalytics()
    })
  
    // Reject button event listener
    cookieReject.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "rejected")
      cookieConsent.classList.remove("show")
    })
  
    // Function to initialize analytics
    function initializeAnalytics() {
      // This would normally contain code to initialize analytics services
      // For example, Google Analytics or similar services
      console.log("Analytics initialized")
  
      // Example of what might go here (commented out as it's just for demonstration)
      /*
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
      ga('create', 'UA-XXXXX-Y', 'auto');
      ga('send', 'pageview');
      */
    }
  })
  
  