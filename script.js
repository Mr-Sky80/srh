// Form Validation and Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form
    initializeForm();

	setupValidation();

    // Setup progress tracking
    setupProgressTracking();
});

// Form Initialization
function initializeForm() {
    populateCountries();
    etMinimumDate();

    // Add form submission handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', handleFormSubmit);

    addInputHandlers();
}

// Country List 
function populateCountries() {
    const countries = [
        "Germany", "India", "United States", "United Kingdom", "France",
        "Italy", "Spain", "Canada", "Australia", "Japan", "China",
        "Brazil", "Mexico", "South Korea", "Russia"
    ].sort();

    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Set Minimum Date
function setMinimumDate() {
    const startDateInput = document.getElementById('startDate');
    const today = new Date();
    const minDate = new Date(today.setMonth(today.getMonth() + 1));
    startDateInput.min = minDate.toISOString().split('T')[0];
}

// Validation Rules
const validationRules = {
    name: {
        pattern: /^[A-Za-z]+$/,
        message: 'Only alphabetical characters are allowed'
    },
    numeric: {
        pattern: /^\d+$/,
        message: 'Only numerical digits are allowed'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    }
};

// Setup Form Validation
function setupValidation() {
    const inputs = document.querySelectorAll('.form-control[data-validate]');
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
}

// Validate Individual Field
function validateField(input) {
    const validationType = input.dataset.validate;
    const rule = validationRules[validationType];
    const errorElement = input.nextElementSibling;

    let isValid = true;
    let errorMessage = '';

    if (input.required && !input.value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (rule && !rule.pattern.test(input.value)) {
        isValid = false;
        errorMessage = rule.message;
    }

    // Update UI
    input.classList.toggle('error', !isValid);
    input.classList.toggle('success', isValid && input.value);
    errorElement.textContent = errorMessage;

    // Update progress
    updateProgress();

    return isValid;
}

// Progress Tracking
function setupProgressTracking() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
    });
}

// Update Progress Bar
function updateProgress() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input:required, select:required, textarea:required');
    const radioGroups = new Set(Array.from(form.querySelectorAll('input[type="radio"]')).map(radio => radio.name));

    let validFields = 0;
    let totalFields = inputs.length + radioGroups.size;

 
    inputs.forEach(input => {
        if (input.type !== 'radio' && isFieldValid(input)) {
            validFields++;
        }
    });

    // Check radio groups
    radioGroups.forEach(groupName => {
        if (form.querySelector(`input[name="${groupName}"]:checked`)) {
            validFields++;
        }
    });

    const progress = (validFields / totalFields) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
}

// Check if Field is Valid
function isFieldValid(field) {
    if (field.type === 'text' || field.type === 'email') {
        return field.value.length > 0 && !field.classList.contains('error');
    }
    return field.value.length > 0;
}

// Handle Form Submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('.submit-button');

    
    const isValid = validateAllFields(form);

    if (!isValid) {
        showError('Please check all required fields');
        return;
    }

    
    submitButton.classList.add('loading');
    form.classList.add('form-loading');

    try {
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        showSuccess('Form submitted successfully!');
        form.reset();
        updateProgress();

    } catch (error) {
        showError('An error occurred. Please try again.');

    } finally {
        submitButton.classList.remove('loading');
        form.classList.remove('form-loading');
    }
}


function validateAllFields(form) {
    const inputs = form.querySelectorAll('.form-control[data-validate]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function showError(message) {
    const notification = createNotification('error', message);
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

function showSuccess(message) {
    const notification = createNotification('success', message);
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

function createNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    return notification;
}

// Add Input Handlers
function addInputHandlers() {
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });

        if (input.dataset.validate) {
            input.addEventListener('input', () => validateField(input));
        }
    });
}
validators.sdlcMethodologies = (value) => {
    return value.length >= 50 ? '' : 'Please provide detailed methodologies (minimum 50 characters)';
};

validators.agileMethodologies = (value) => {
    return value.length >= 50 ? '' : 'Please provide detailed Agile methodologies (minimum 50 characters)';
};

validators.srhLearning = (value) => {
    return value.length >= 50 ? '' : 'Please provide detailed learning points (minimum 50 characters)';
};

validators.cssReasons = (value) => {
    return value.length >= 30 ? '' : 'Please provide detailed reasons (minimum 30 characters)';
};

validators.javascriptReasons = (value) => {
    return value.length >= 30 ? '' : 'Please provide detailed reasons (minimum 30 characters)';
};

validators.contactEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? '' : 'Please enter a valid email address';
};

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    const errorMessages = [];

    // Validate CSS Methods (at least one should be selected)
    const cssMethods = document.querySelectorAll('input[name="cssMethods"]:checked');
    if (cssMethods.length === 0) {
        isValid = false;
        errorMessages.push('Please select at least one CSS implementation method');
    }

    // Validate declaration checkbox
    const declaration = document.getElementById('declaration');
    if (!declaration.checked) {
        isValid = false;
        errorMessages.push('Please accept the declaration');
    }

    // Validate all fields with validators
    Object.keys(validators).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        if (input) {
            const error = validators[fieldName](input.value);
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (errorElement) {
                errorElement.textContent = error;
            }
            if (error) {
                isValid = false;
                errorMessages.push(`${fieldName}: ${error}`);
            }
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        
        // event.target.submit();
    } else {
        alert('Please correct the following errors:\n' + errorMessages.join('\n'));
    }

    return false;
   }