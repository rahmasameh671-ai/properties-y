/**
 * PROPERTIES-Y (properties-y.com)
 * Corporate Homepage Client Script
 * Features:
 * - Lead Capture Form Handling with validation
 * - Dynamic Success Modal with customized response
 * - Seamless WhatsApp Integration (+201277752731)
 * - Modal dismiss on backdrop click and Escape key
 */

document.addEventListener('DOMContentLoaded', () => {
  const consultationForm = document.getElementById('consultationForm');
  const fullNameInput = document.getElementById('fullName');
  const countryCodeSelect = document.getElementById('countryCode');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalParagraph = document.getElementById('modalParagraph');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Handle Form Submission
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = (fullNameInput.value || '').trim();
      const countryCode = countryCodeSelect.value;
      const phoneNumber = (phoneNumberInput.value || '').trim();

      // Basic Validation
      if (!fullName) {
        fullNameInput.focus();
        return;
      }

      if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 6) {
        phoneNumberInput.focus();
        return;
      }

      // Trigger Google Ads Conversion Tracking for Form Submit
      if (typeof window.gtag_report_conversion === 'function') {
        try {
          window.gtag_report_conversion();
        } catch (err) {
          console.warn('Conversion notice:', err);
        }
      }
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18564830215/A7t2CIvYnLYdEIeos5RF',
            'value': 1.0,
            'currency': 'EGP'
          });
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
            'value': 1.0,
            'currency': 'EGP'
          });
          window.gtag('event', 'generate_lead', {
            event_category: 'form',
            event_label: 'Consultation Form Submit'
          });
        } catch (err) {
          console.warn('GTag notice:', err);
        }
      }

      // Dispatch to Zapier Webhook (Lead Integration)
      try {
        fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
          method: "POST",
          body: JSON.stringify({
            fullName: fullName,
            phoneNumber: `${countryCode} ${phoneNumber}`.trim(),
            landingPageUrl: window.location.href,
            submissionDate: new Date().toISOString()
          })
        }).catch(err => console.warn("Zapier notice:", err));
      } catch (err) {
        console.warn("Zapier webhook transmission notice:", err);
      }

      // Populate Success Modal Paragraph Text exactly as specified:
      // "Thank you {name}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability."
      // (Ensure no brand names are in this specific text block)
      if (modalParagraph) {
        modalParagraph.textContent = `Thank you ${fullName}! Your registration has been securely dispatched to our senior consultancy team. A dedicated property advisor will contact you shortly with full brochures, master plans, and unit availability.`;
      }

      // Open Modal
      openModal();

      // Reset form fields cleanly
      consultationForm.reset();
      // Ensure country code resets to +20
      countryCodeSelect.value = '+20';
    });
  }

  // Modal Open & Close Utilities
  function openModal() {
    if (confirmationModal) {
      confirmationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (confirmationModal) {
      confirmationModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Close when clicking modal backdrop
  if (confirmationModal) {
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmationModal && confirmationModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Outbound WhatsApp Click Conversion Tracking (Delegated for 100% Coverage)
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(waLink.href);
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18564830215/A7t2CIvYnLYdEIeos5RF',
          'value': 1.0,
          'currency': 'EGP'
        });
      }
    }
  });

  // Smooth scroll helper for internal anchor buttons
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

