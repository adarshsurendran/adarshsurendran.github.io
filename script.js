/* =====================================================
   KMH GROUP OF HOSPITALS WEBSITE - MAIN INTERACTIVE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* 1. MOBILE NAVIGATION TOGGLE */
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    /* Close mobile navigation after selecting any link */
    const navigationItems = document.querySelectorAll("#navLinks a");
    navigationItems.forEach(function (item) {
      item.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }


  /* 2. SET MINIMUM APPOINTMENT DATE TO TODAY */
  const preferredDate = document.getElementById("preferredDate");
  if (preferredDate) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    preferredDate.min = formattedToday;
  }


  /* 3. WHATSAPP APPOINTMENT FORM SUBMISSION */
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const patientName = document
        .getElementById("patientName")
        .value
        .trim();

      const phoneNumber = document
        .getElementById("phoneNumber")
        .value
        .trim();

      const preferredBranch = document.getElementById("preferredBranch")
        ? document.getElementById("preferredBranch").value
        : "KMH Hospital, Tripalur (Main Office)";

      const preferredDoctor = document
        .getElementById("preferredDoctor")
        .value;

      const appointmentDate =
        document.getElementById("preferredDate").value || "Not specified";

      const healthConcern =
        document.getElementById("healthConcern").value.trim() ||
        "Not specified";

      /* Format WhatsApp message cleanly */
      const appointmentMessage =
`🏥 *KMH GROUP OF HOSPITALS APPOINTMENT REQUEST*

👤 *Patient Name:* ${patientName}
📞 *Phone Number:* ${phoneNumber}
🏥 *Preferred Branch:* ${preferredBranch}
👨‍⚕️ *Department / Contact:* ${preferredDoctor}
📅 *Preferred Date:* ${appointmentDate}
💬 *Health Concern:* ${healthConcern}`;

      const encodedMessage = encodeURIComponent(appointmentMessage);
      const clinicNumber = "919400696411";
      const whatsappURL = `https://wa.me/${clinicNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");
    });
  }


  /* 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL */
  const sections = document.querySelectorAll("header[id], section[id], aside[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  window.addEventListener("scroll", function () {
    let currentSectionId = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove("active");
      if (anchor.getAttribute("href") === "#" + currentSectionId) {
        anchor.classList.add("active");
      }
    });
  });


  /* 5. INTERACTIVE HOSPITAL BRANCH SWITCHER DROPDOWN */
  const branchSelect = document.getElementById("branchSelect");
  const branchBadge = document.getElementById("branchBadge");
  const branchTitle = document.getElementById("branchTitle");
  const branchSubtitle = document.getElementById("branchSubtitle");
  const branchAddress = document.getElementById("branchAddress");
  const branchPhone = document.getElementById("branchPhone");
  const mapHeading = document.getElementById("mapHeading");
  const mapDescription = document.getElementById("mapDescription");
  const mapBtn = document.getElementById("mapBtn");

  const branchData = {
    tripalur: {
      badge: "⭐ Main Hospital",
      badgeClass: "main-badge",
      title: "KMH Hospital, Tripalur",
      subtitle: "Main Head Office & Comprehensive Hospital",
      address: "Tripalur, Palakkad, Kerala",
      phone: "+91 94006 96411",
      tel: "tel:+919400696411",
      mapHeading: "KMH Hospital, Tripalur on Maps",
      mapDesc: "Get instant turn-by-turn directions to KMH Hospital, Tripalur (Main Head Office).",
      mapUrl: "https://maps.app.goo.gl/U5PwhCr9DrWZNQBt6",
      btnText: "Open Maps (Tripalur Main)"
    },
    tattamangalam: {
      badge: "Secondary Branch",
      badgeClass: "secondary-badge",
      title: "KMH Health Centre, Tattamangalam",
      subtitle: "Outpatient & Diagnostic Branch",
      address: "Tattamangalam, Palakkad, Kerala",
      phone: "+91 94006 96411",
      tel: "tel:+919400696411",
      mapHeading: "KMH Tattamangalam on Maps",
      mapDesc: "Get instant turn-by-turn directions to KMH Health Centre, Tattamangalam (Secondary Branch).",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=KMH+Clinic+Tattamangalam",
      btnText: "Open Maps (Tattamangalam Branch)"
    }
  };

  if (branchSelect && branchTitle) {
    branchSelect.addEventListener("change", function () {
      const selected = branchData[this.value];
      if (selected) {
        branchBadge.textContent = selected.badge;
        branchBadge.className = "branch-badge " + selected.badgeClass;
        branchTitle.textContent = selected.title;
        branchSubtitle.textContent = selected.subtitle;
        branchAddress.textContent = selected.address;
        branchPhone.textContent = selected.phone;
        branchPhone.href = selected.tel;
        if (mapHeading) mapHeading.textContent = selected.mapHeading;
        mapDescription.textContent = selected.mapDesc;
        mapBtn.href = selected.mapUrl;
        mapBtn.textContent = selected.btnText;
      }
    });
  }

});
