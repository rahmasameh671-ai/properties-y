/**
 * IR-PROPERTIES - CORPORATE HOMEPAGE LOGIC
 * WhatsApp Integration: +201277752731
 * Zero Gold / Clean Minimalist Luxury
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const leadForm = document.getElementById('consultationForm');
  const countryCodeSelect = document.getElementById('countryCode');
  const fullNameInput = document.getElementById('fullName');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalWhatsappLink = document.getElementById('modalWhatsappLink');

  // WhatsApp Base Config
  const WHATSAPP_NUMBER = '201277752731';

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = fullNameInput.value.trim();
      const countryCode = countryCodeSelect.value;
      const phone = phoneNumberInput.value.trim();

      if (!name) {
        fullNameInput.focus();
        fullNameInput.style.borderColor = '#E53E3E';
        setTimeout(() => {
          fullNameInput.style.borderColor = '';
        }, 3000);
        return;
      }

      if (!phone) {
        phoneNumberInput.focus();
        phoneNumberInput.style.borderColor = '#E53E3E';
        setTimeout(() => {
          phoneNumberInput.style.borderColor = '';
        }, 3000);
        return;
      }

      const fullPhoneNumber = `${countryCode} ${phone}`;
      
      // Construct Pre-filled WhatsApp Consultation message
      const messageText = `Hello ir-properties,\nI would like to schedule a private consultation regarding Egypt premier real estate destinations.\n\n*Client Name:* ${name}\n*Contact Number:* ${fullPhoneNumber}\n\nPlease share customized property portfolios and market comparisons.`;
      const encodedMsg = encodeURIComponent(messageText);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Trigger Google Ads Conversion Tracking for Form Submit
      if (typeof window.gtag_report_form_conversion === 'function') {
        try {
          window.gtag_report_form_conversion();
        } catch (err) {
          console.warn('Form conversion notice:', err);
        }
      } else if (typeof window.gtag_report_conversion === 'function') {
        try {
          window.gtag_report_conversion();
        } catch (err) {
          console.warn('Conversion notice:', err);
        }
      }
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
            'value': 1.0,
            'currency': 'EGP'
          });
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18125180547',
            'value': 1.0,
            'currency': 'EGP'
          });
          window.gtag('event', 'generate_lead', {
            'send_to': 'AW-18125180547',
            event_category: 'form',
            event_label: 'Consultation Form Submit'
          });
          window.gtag('event', 'lead_form_submission', {
            'send_to': 'AW-18125180547'
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
            fullName: name,
            phoneNumber: fullPhoneNumber,
            landingPageUrl: window.location.href,
            submissionDate: new Date().toISOString()
          })
        }).catch(err => console.warn("Zapier notice:", err));
      } catch (err) {
        console.warn("Zapier webhook transmission notice:", err);
      }

      // Update Modal Link
      if (modalWhatsappLink) {
        modalWhatsappLink.href = waUrl;
      }

      // Show confirmation modal
      if (confirmationModal) {
        confirmationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      leadForm.reset();
      countryCodeSelect.value = '+20';
    });
  }

  // Close Confirmation Modal
  if (closeModalBtn && confirmationModal) {
    closeModalBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Destination WhatsApp Quick Direct Buttons
  const destinationLinks = document.querySelectorAll('[data-destination]');
  destinationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = link.getAttribute('data-destination');
      const text = `Hello ir-properties, I would like to inquire about available properties in ${destination}.`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // Outbound WhatsApp Click Conversion Tracking (100% Delegated Coverage)
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion(waLink.href);
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18125180547/AZcICJes-qQcEIOd4cJD',
          'value': 1.0,
          'currency': 'EGP'
        });
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18125180547',
          'value': 1.0,
          'currency': 'EGP'
        });
        window.gtag('event', 'contact', {
          'send_to': 'AW-18125180547',
          'method': 'WhatsApp',
          'event_category': 'WhatsApp',
          'event_label': 'WhatsApp Click'
        });
        window.gtag('event', 'whatsapp_click', {
          'send_to': 'AW-18125180547'
        });
      }
    }
  });

  // Local File Protocol Fallback for Standalone Legal Links & Portfolio Routes
  if (window.location.protocol === 'file:') {
    const linkPrivacy = document.getElementById('linkPrivacy');
    const linkTerms = document.getElementById('linkTerms');
    if (linkPrivacy) linkPrivacy.setAttribute('href', 'privacy-policy.html');
    if (linkTerms) linkTerms.setAttribute('href', 'terms-conditions.html');
  }
});
