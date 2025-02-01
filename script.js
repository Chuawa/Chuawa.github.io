// Function to check if the form is valid and the terms are accepted
function validateForm() {
  // Get the form element
  var form = document.getElementById('contact-form');
  // Check built-in HTML validation (e.g., required fields, pattern, etc.)
  var fieldsAreValid = form.checkValidity();
  // Check if the terms and conditions checkbox is checked
  var termsChecked = document.getElementById('terms_and_conditions_soleae9bbbf').checked;
  
  // Enable submit button only if both conditions are true
  document.querySelector('button[type="submit"]').disabled = !(fieldsAreValid && termsChecked);
}

// Add event listeners on all form inputs and the checkbox to validate on change/input
document.getElementById('contact-form').addEventListener('input', validateForm);
document.getElementById('terms_and_conditions_soleae9bbbf').addEventListener('change', validateForm);

// Form submission code
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Retrieve values from the form fields
  const name  = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  let phone   = document.getElementById('phone').value.trim();
  
  // Validate phone number: must be exactly 8 digits starting with 6, 8, or 9
  const phoneRegex = /^[689]\d{7}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById('form-message').innerHTML =
      "<p>Please enter a valid phone number. It must start with 6, 8, or 9 and be exactly 8 digits long.</p>";
    return;
  }
  
  // Prepend the non-editable prefix
  phone = '+65' + phone;
  
  // URL of your Google Apps Script web app (replace with your actual URL)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzE4Bd6cQ-NjBROwZQmnc2dSK94vpXVfjkqr2Hgp8BDH6Z_1RHPcxphcpTnocRd0kG4/exec';
  
  // Prepare form data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  
  // Submit the form data using fetch
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      alert("Thank you for your submission! We will follow up with you soon!");
      document.getElementById('contact-form').reset();
      // After reset, re-disable the button until the form is valid again
      document.querySelector('button[type="submit"]').disabled = true;
      document.getElementById('form-message').innerHTML = "";
    })
    .catch(error => {
      document.getElementById('form-message').innerHTML = "<p>Error submitting the form. Please try again.</p>";
      console.error('Error!', error.message);
    });
});





// FAQ Toggle Functionality for Unit Types Section
document.querySelectorAll('.faqq-question h5').forEach(question => {
  question.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    // Toggle display of the answer
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      this.querySelector('.fa-accordion-icon').classList.remove('fa-minus');
      this.querySelector('.fa-accordion-icon').classList.add('fa-plus');
    } else {
      answer.style.display = 'block';
      this.querySelector('.fa-accordion-icon').classList.remove('fa-plus');
      this.querySelector('.fa-accordion-icon').classList.add('fa-minus');
    }
  });
});

// Toggle hamburger menu on mobile
document.querySelector('.nav-toggle').addEventListener('click', function() {
  document.querySelector('.main-nav').classList.toggle('show-menu');
});

// JavaScript smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Prevent default anchor click behavior
    e.preventDefault();

    // Scroll to the target section smoothly
    const targetID = this.getAttribute('href');
    const targetSection = document.querySelector(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

