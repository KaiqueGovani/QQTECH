//Função de mostrar um Modal de Feedback
function showFeedbackModal(title, response, additionalInfo, iconURL) {
    const feedbackModal = new bootstrap.Modal(document.getElementById("feedbackModal"));
    const feedbackModalLabel = document.getElementById("feedbackModalLabel");
    const feedbackModalResponse = document.getElementById("feedbackModalResponse");
    const feedbackModalP = document.getElementById("feedbackModalP");
    const feedbackModalIcon = document.getElementById("feedbackModalIcon");

    // Seta o título, response e informação adicional
    feedbackModalLabel.innerText = title;
    feedbackModalResponse.innerText = response;
    feedbackModalP.innerText = additionalInfo;

    // Seta o ícone (pode ser um URL ou um elemento de Icone)
    if (iconURL) {
        feedbackModalIcon.innerHTML = `<img src="${iconURL}" alt="Icon">`;
    } else {
        feedbackModalIcon.innerHTML = '';
    }

    // Mostra o modal
    feedbackModal.show();
}


function showFeedbackToast(title, message, color = 'primary', icon = '') {
    const feedbackToast = document.getElementById("feedbackToast");
    const feedbackToastTitle = document.getElementById("feedbackToastTitle");
    const feedbackToastBody = document.querySelector(".toast-body")
    const feedbackToastIcon = document.getElementById("feedbackToastIcon");

    // Seta o título, response e informação adicional
    feedbackToastTitle.innerText = title;
    feedbackToastBody.innerText = message;

    // Seta o ícone (pode ser um URL ou um elemento de Icone)
    if (icon) {
        feedbackToastIcon.innerHTML = `<img src="${icon}" alt="Icon" style="width: 21px">`;
    } else {
        feedbackToastIcon.innerHTML = '';
    }

    // Mostra o modal
    feedbackToast.classList.remove('bg-primary', 'bg-success', 'bg-danger', 'bg-warning');
    feedbackToast.classList.add(`bg-${color}`);
    const toast = new bootstrap.Toast(feedbackToast);
    toast.show();
}
