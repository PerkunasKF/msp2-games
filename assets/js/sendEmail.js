function sendMail(feedbackForm) {
    emailjs.send('CodeInstitute-MS2', 'CI-MS2-ColorGame', {
        'from_name': feedbackForm.name.value,
        'from_email': feedbackForm.emailaddress.value,
        'message': feedbackForm.feedback.value
    }).then(
        function (response) {
            alert('Message send', response);
        },
        function (error) {
            alert('Something whent wrong...', error);
        }
    );
    return false;
}