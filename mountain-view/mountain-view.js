/**
 * MOUNTAIN VIEW PORTFOLIO – INTERACTIVE LOGIC
 * By ir-properties | Independent Real Estate Consultancy
 * Global WhatsApp: +201277752731
 */

// Comprehensive International Country Dial Codes with Crisp UTF-8 Flags
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
  // 1. Initialize International Country Selector
  setupCountrySelector();

  // 2. Initialize Lead Capture Submission
  setupLeadForm();

  // 3. Setup Modal Close Actions
  setupModalActions();

  // 4. Outbound WhatsApp Click Conversion Tracking
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(this.href);
      }
    });
  });
});

/**
 * Clean UI Country Selector Dropdown Setup
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

  let activeCountry = COUNTRIES_REGISTRY[0]; // Egypt (+20)

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
    popover.style.display = "block";
    triggerBtn.setAttribute("aria-expanded", "true");
    if (searchInput) {
      searchInput.value = "";
      renderList("");
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeDropdown() {
    popover.classList.remove("is-open");
    popover.style.display = "none";
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

  // Initial populate
  renderList("");
}

/**
 * Lead Capture Form Submission Handler
 */
function setupLeadForm() {
  const form = document.getElementById("leadCaptureForm");
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

    // Disable button & indicate loading
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>PROCESSING...</span>`;

    // Compose Lead Record
    const leadRecord = {
      name: fullName,
      phone: fullPhoneNumber,
      timestamp: new Date().toISOString(),
      portfolio: "Mountain View Exclusive Portfolio",
      consultancy: "ir-properties (Independent Real Estate Consultancy)",
      url: window.location.href
    };

    // Store in LocalStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem("ir_mountain_view_leads") || "[]");
      stored.push(leadRecord);
      localStorage.setItem("ir_mountain_view_leads", JSON.stringify(stored));
    } catch (err) {
      console.warn("Storage notice:", err);
    }

    // Google Ads & Tag Lead Conversion Event
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "conversion", {
          "send_to": "AW-18125180547/AZcICJes-qQcEIOd4cJD"
        });
        window.gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "Mountain View Lead Inquiry"
        });
      } catch (err) {
        console.warn("GTag notice:", err);
      }
    }

    // Dispatch lead notification asynchronously
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
          source: "Mountain View Portfolio – ir-properties.com",
          consultancy: "ir-properties Independent Real Estate Consultancy",
          _replyto: "Rahma@irtkaz.com",
          _cc: "Mostafa.a.ashmawy@gmail.com,Mostafa.ashmawy@irtkaz.com",
          _subject: `New Lead: Mountain View - ${fullName} (${fullPhoneNumber})`,
          _template: "table"
        })
      }).catch(err => console.warn("Dispatch notice:", err));
    } catch (err) {
      console.warn("Transmission notice:", err);
    }

    // Prepare WhatsApp URL as specified in prompt requirement 6
    const waUrl = `https://wa.me/${TARGET_WHATSAPP}?text=Hello%20I%20have%20just%20submitted%20my%20inquiry%20for%20Mountain%20View`;

    // Reset button state
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show confirmation modal
      const modal = document.getElementById("successModalOverlay");
      const clientNameSpan = document.getElementById("modalClientName");
      const modalWaBtn = document.getElementById("modalWhatsappAction");

      if (clientNameSpan) clientNameSpan.textContent = fullName;
      if (modalWaBtn) modalWaBtn.href = waUrl;

      if (modal) modal.classList.add("is-active");

      // Attempt immediate handoff to WhatsApp
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Fallback provided via modal button
      }

      // Reset form fields
      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";
    }, 450);
  });
}

/**
 * Modal Close and Dismiss Actions
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
