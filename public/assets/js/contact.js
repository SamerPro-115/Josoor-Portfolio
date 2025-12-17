// ============================================
// EMAILJS CONFIGURATION
// ============================================
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'aZ79J5PJtrYUTlOJj';  // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_ehk9fjw';   // Your email service ID
const EMAILJS_TEMPLATE_ID = 'template_qvrpi55'; // Your email template ID

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

$(document).ready(function() {
    // Get current language
    function getCurrentLanguage() {
        return localStorage.getItem('lang') || 'ar';
    }
    
    // Error messages in both languages
  const errorMessages = {
    ar: {
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
        companyRequired: 'اسم الشركة أو المؤسسة مطلوب',
        messageRequired: 'الرسالة مطلوبة',
        fillAllFields: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح',
        sendFailed: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى',
        emailjsNotConfigured: 'لم يتم تكوين EmailJS بعد. يرجى إضافة بيانات الاعتماد الخاصة بك.'
    },
    en: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        companyRequired: 'Company or organization name is required',
        messageRequired: 'Message is required',
        fillAllFields: 'Please fill in all required fields correctly',
        sendFailed: 'Failed to send message. Please try again later',
        emailjsNotConfigured: 'EmailJS is not configured yet. Please add your credentials.'
    }
};
    
    // Get error message based on current language
    function getErrorMessage(key) {
        const lang = getCurrentLanguage();
        return errorMessages[lang][key];
    }
    
    // Clear all errors
    function clearErrors() {
        $('.error').text('').hide();
    }
    
    // Show error
    function showError(selector, message) {
        $(selector).text(message).show();
    }
    
    // Validate email
    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate phone (basic validation for Saudi numbers)
    function isValidPhone(phone) {
        // Remove spaces and special characters
        var cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        // Check if it's a valid format (at least 10 digits)
        return /^\+?[0-9]{10,15}$/.test(cleanPhone);
    }
    
    // Form submission with EmailJS
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearErrors();
        $('#form-message-warning').hide().text('');
        $('#form-message-success').hide();
        
        var isValid = true;
        
        // Validate name
        if ($('#name').val().trim() === '') {
            showError('.name-error', getErrorMessage('nameRequired'));
            isValid = false;
        }
        
        // Validate email
        if ($('#email').val().trim() === '') {
            showError('.email-error', getErrorMessage('emailRequired'));
            isValid = false;
        } else if (!isValidEmail($('#email').val().trim())) {
            showError('.email-error', getErrorMessage('emailInvalid'));
            isValid = false;
        }
        
       // Validate phone
        if ($('#phone').val().trim() === '') {
            showError('.phone-error', getErrorMessage('phoneRequired'));
            isValid = false;
        } else if (!isValidPhone($('#phone').val().trim())) {
            showError('.phone-error', getErrorMessage('phoneInvalid'));
            isValid = false;
        }
        
        
        // Validate company
        if ($('#company').val().trim() === '') {
            showError('.company-error', getErrorMessage('companyRequired'));
            isValid = false;
        }
        
        // Validate message
        if ($('#message').val().trim() === '') {
            showError('.message-error', getErrorMessage('messageRequired'));
            isValid = false;
        }
        
        if (!isValid) {
            $('#form-message-warning').text(getErrorMessage('fillAllFields')).show();
            return false;
        }
        
        // Show submitting message
        $('.submitting').removeClass('hidden').addClass('flex');
        
        // Disable submit button
        $('#contactForm button[type="submit"]').prop('disabled', true);
        
        // Prepare template parameters for EmailJS
        var templateParams = {
            from_name: $('#name').val().trim(),
            from_email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            company: $('#company').val().trim(),
            message: $('#message').val().trim(),
            to_name: 'Jusoor Events Team' // Customize this
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Hide submitting message
                $('.submitting').removeClass('flex').addClass('hidden');
                
                // Enable submit button
                $('#contactForm button[type="submit"]').prop('disabled', false);
                
                // Show success message
                $('#form-message-success').show();
                
                // Reset form
                $('#contactForm')[0].reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    $('#form-message-success').fadeOut();
                }, 5000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Hide submitting message
                $('.submitting').removeClass('flex').addClass('hidden');
                
                // Enable submit button
                $('#contactForm button[type="submit"]').prop('disabled', false);
                
                // Show error message
                $('#form-message-warning').text(getErrorMessage('sendFailed')).show();
            });
        
        return false;
    });
    
    // Real-time validation on blur
    $('#name').on('blur', function() {
        if ($(this).val().trim() === '') {
            showError('.name-error', getErrorMessage('nameRequired'));
        } else {
            $('.name-error').text('').hide();
        }
    });
    
    $('#email').on('blur', function() {
        if ($(this).val().trim() === '') {
            showError('.email-error', getErrorMessage('emailRequired'));
        } else if (!isValidEmail($(this).val().trim())) {
            showError('.email-error', getErrorMessage('emailInvalid'));
        } else {
            $('.email-error').text('').hide();
        }
    });
    
     $('#phone').on('blur', function() {
        if ($(this).val().trim() === '') {
            showError('.phone-error', getErrorMessage('phoneRequired'));
        } else if (!isValidPhone($(this).val().trim())) {
            showError('.phone-error', getErrorMessage('phoneInvalid'));
        } else {
            $('.phone-error').text('').hide();
        }
    });
    
    $('#company').on('blur', function() {
        if ($(this).val().trim() === '') {
            showError('.company-error', getErrorMessage('companyRequired'));
        } else {
            $('.company-error').text('').hide();
        }
    });
    
    $('#message').on('blur', function() {
        if ($(this).val().trim() === '') {
            showError('.message-error', getErrorMessage('messageRequired'));
        } else {
            $('.message-error').text('').hide();
        }
    });
});