/**
 * HASSAN ALLAM PROPERTIES PORTFOLIO — INTERACTIVE LOGIC
 * By properties-y.com | Independent Real Estate Consultancy
 * Global WhatsApp: +201277752731
 */

// International Country Registry with Crisp UTF-8 Flags
const COUNTRIES_REGISTRY = [
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬", priority: true },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦", priority: true },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪", priority: true },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼", priority: true },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦", priority: true },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲", priority: true },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭", priority: true },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴", priority: true },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧", priority: true },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸", priority: true },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦", priority: true },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
  { name: "Libya", code: "LY", dial: "+218", flag: "🇱🇾" },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" }
];

const TARGET_WHATSAPP = "201277752731";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Country Selector Dropdown
  setupCountrySelector();

  // 2. Initialize Lead Capture Submission
  setupLeadForm();

  // 3. Initialize Success Modal Dismiss Actions
  setupModalActions();

  // 4. Outbound WhatsApp Conversion Tracking
  document.addEventListener("click", function (e) {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion(waLink.href);
      } else if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          "send_to": "AW-18564830215/A7t2CIvYnLYdEIeos5RF",
          "value": 1.0,
          "currency": "EGP"
        });
      }
    }
  });
});

/**
 * Country Selector Dropdown Setup with UTF-8 Flags
 */
function setupCountrySelector() {
  const triggerBtn = document.getElementById("countryCodeTrigger");
  const popover = document.getElementById("countryDropdownPopover");
  const searchInput = document.getElementById("countrySearchInput");
  const optionsContainer = document.getElementById("countryOptionsContainer");
  const flagDisplay = document.getElementById("triggerFlag");
  const dialDisplay = document.getElementById("triggerDial");
  const hiddenInput = document.getElementById("selectedDialInput");

  if (!triggerBtn || !popover || !optionsContainer) return;

  let activeCountry = COUNTRIES_REGISTRY[0]; // Egypt (+20) default

  function renderList(query = "") {
    optionsContainer.innerHTML = "";
    const cleanQuery = query.toLowerCase().trim();

    const filtered = COUNTRIES_REGISTRY.filter(item => {
      return (
        item.name.toLowerCase().includes(cleanQuery) ||
        item.dial.includes(cleanQuery) ||
        item.code.toLowerCase().includes(cleanQuery)
      );
    });

    if (filtered.length === 0) {
      const emptyNotice = document.createElement("div");
      emptyNotice.style.padding = "12px 14px";
      emptyNotice.style.fontSize = "0.82rem";
      emptyNotice.style.color = "#718096";
      emptyNotice.textContent = "No country found";
      optionsContainer.appendChild(emptyNotice);
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement("div");
      row.className = `country-option-item ${item.code === activeCountry.code ? "is-selected" : ""}`;
      row.setAttribute("role", "button");
      row.tabIndex = 0;

      row.innerHTML = `
        <span class="country-option-flag">${item.flag}</span>
        <span class="country-option-name">${item.name}</span>
        <span class="country-option-dial">${item.dial}</span>
      `;

      row.addEventListener("click", () => {
        selectCountry(item);
      });

      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectCountry(item);
        }
      });

      optionsContainer.appendChild(row);
    });
  }

  function selectCountry(item) {
    activeCountry = item;
    if (flagDisplay) flagDisplay.textContent = item.flag;
    if (dialDisplay) dialDisplay.textContent = item.dial;
    if (hiddenInput) hiddenInput.value = item.dial;

    closeDropdown();
  }

  function openDropdown() {
    popover.classList.add("is-open");
    triggerBtn.setAttribute("aria-expanded", "true");
    if (searchInput) {
      searchInput.value = "";
      renderList("");
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeDropdown() {
    popover.classList.remove("is-open");
    triggerBtn.setAttribute("aria-expanded", "false");
  }

  triggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (popover.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderList(e.target.value);
    });

    searchInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !triggerBtn.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popover.classList.contains("is-open")) {
      closeDropdown();
      triggerBtn.focus();
    }
  });

  // Initial render
  renderList("");
}

/**
 * Lead Capture Form Submission Handler
 */
function setupLeadForm() {
  const form = document.getElementById("hapLeadForm");
  const submitBtn = document.getElementById("leadSubmitBtn");
  const nameInput = document.getElementById("leadFullName");
  const phoneInput = document.getElementById("leadPhoneInput");
  const dialInput = document.getElementById("selectedDialInput");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = nameInput ? nameInput.value.trim() : "";
    const dialCode = dialInput ? dialInput.value.trim() : "+20";
    const phone = phoneInput ? phoneInput.value.trim() : "";

    if (!fullName) {
      alert("Please enter your full name.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phone || phone.length < 6) {
      alert("Please enter a valid phone number.");
      if (phoneInput) phoneInput.focus();
      return;
    }

    const fullPhoneNumber = `${dialCode} ${phone}`;

    // Indicate loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>PROCESSING...</span>`;

    // Construct Lead Record
    const leadRecord = {
      name: fullName,
      phone: fullPhoneNumber,
      timestamp: new Date().toISOString(),
      portfolio: "Hassan Allam Properties Portfolio",
      consultancy: "properties-y.com (Independent Real Estate Consultancy)",
      url: window.location.href
    };

    // Store in localStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem("properties_y_hassan_allam_leads") || "[]");
      stored.push(leadRecord);
      localStorage.setItem("properties_y_hassan_allam_leads", JSON.stringify(stored));
    } catch (err) {
      console.warn("Storage notice:", err);
    }

    // Google Ads & Tag Lead Conversion Event
    if (typeof window.gtag_report_conversion === "function") {
      try {
        window.gtag_report_conversion();
      } catch (err) {
        console.warn("Conversion notice:", err);
      }
    }
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "conversion", {
          "send_to": "AW-18564830215/A7t2CIvYnLYdEIeos5RF",
          "value": 1.0,
          "currency": "EGP"
        });
        window.gtag("event", "conversion", {
          "send_to": "AW-18125180547/AZcICJes-qQcEIOd4cJD",
          "value": 1.0,
          "currency": "EGP"
        });
        window.gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "Hassan Allam Lead Inquiry"
        });
      } catch (err) {
        console.warn("GTag notice:", err);
      }
    }

    // Dispatch to Zapier Webhook (Lead Integration)
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
        method: "POST",
        body: JSON.stringify({
          fullName: fullName,
          phoneNumber: fullPhoneNumber,
          portfolio: "Hassan Allam Properties",
          landingPageUrl: window.location.href,
          submissionDate: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn("Zapier notice:", err);
    }

    // Backup Email Dispatch
    try {
      fetch("https://formsubmit.co/ajax/Rahma@irtkaz.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: fullName,
          phone: fullPhoneNumber,
          source: "Hassan Allam Properties Portfolio – properties-y.com",
          consultancy: "properties-y.com Independent Real Estate Consultancy",
          _replyto: "Rahma@irtkaz.com",
          _cc: "Mostafa.a.ashmawy@gmail.com,Mostafa.ashmawy@irtkaz.com",
          _subject: `New Lead: Hassan Allam - ${fullName} (${fullPhoneNumber}) [properties-y.com]`,
          _template: "table"
        })
      }).catch(err => console.warn("Dispatch notice:", err));
    } catch (err) {
      console.warn("Transmission notice:", err);
    }

    // Prepare WhatsApp URL
    const waUrl = `https://wa.me/${TARGET_WHATSAPP}?text=Hello%20I%20have%20just%20submitted%20my%20inquiry%20for%20Hassan%20Allam%20Properties%20on%20properties-y.com%20and%20would%20like%20to%20receive%20the%20brochures%20and%20availability%20right%20away`;

    // Reset button & display success modal
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const modal = document.getElementById("successModalOverlay");
      const clientNameSpan = document.getElementById("modalClientName");
      const modalWaBtn = document.getElementById("modalWhatsappAction");

      if (clientNameSpan) clientNameSpan.textContent = fullName;
      if (modalWaBtn) modalWaBtn.href = waUrl;

      if (modal) modal.classList.add("is-active");

      // Attempt immediate WhatsApp handoff
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Handled via modal button
      }

      // Clear inputs
      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";
    }, 450);
  });
}

/**
 * Success Modal Actions
 */
function setupModalActions() {
  const modal = document.getElementById("successModalOverlay");
  const closeBtn = document.getElementById("modalCloseButton");

  if (!modal) return;

  function closeModal() {
    modal.classList.remove("is-active");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}
