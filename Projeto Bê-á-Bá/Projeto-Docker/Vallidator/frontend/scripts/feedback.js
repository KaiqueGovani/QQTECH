//Carregar os tooltips do Bootstrap
document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});

//Função de mostrar um Modal de Feedback
function showFeedbackModal(title, response, additionalInfo, iconURL, isLoading = false) {
    // Pega o modal se 
    let feedbackModalEl = document.getElementById("feedbackModal");
    const modalAnterior = bootstrap.Modal.getInstance(feedbackModalEl);
    const feedbackModal = modalAnterior || new bootstrap.Modal(feedbackModalEl);

    if (modalAnterior) {
        feedbackModal.hide();

        setTimeout(() => {
            const feedbackModalLabel = document.getElementById("feedbackModalLabel");
            const feedbackModalResponse = document.getElementById("feedbackModalResponse");
            const feedbackModalP = document.getElementById("feedbackModalP");
            const feedbackModalIcon = document.getElementById("feedbackModalIcon");

            // Seta o título, response e informação adicional
            feedbackModalLabel.innerText = title;
            feedbackModalResponse.innerText = response;
            feedbackModalP.innerText = additionalInfo;

            // Seta o ícone (pode ser um URL ou um elemento de Icone)
            if (isLoading) {
                feedbackModalIcon.innerHTML = `<div class="spinner-border text-success" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                           </div>`;
            } else if (iconURL) {
                feedbackModalIcon.innerHTML = `<img src="${iconURL}" alt="Icon">`;
            } else {
                feedbackModalIcon.innerHTML = '';
            }

            feedbackModal.show();
        }, 400) // Delay de 400ms para dar tempo do modal anterior fechar
    } else {
        const feedbackModalLabel = document.getElementById("feedbackModalLabel");
        const feedbackModalResponse = document.getElementById("feedbackModalResponse");
        const feedbackModalP = document.getElementById("feedbackModalP");
        const feedbackModalIcon = document.getElementById("feedbackModalIcon");

        // Seta o título, response e informação adicional
        feedbackModalLabel.innerText = title;
        feedbackModalResponse.innerText = response;
        feedbackModalP.innerText = additionalInfo;

        // Seta o ícone (pode ser um URL ou um elemento de Icone)
        if (isLoading) {
            feedbackModalIcon.innerHTML = `<div class="spinner-border text-success" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                           </div>`;
        } else if (iconURL) {
            feedbackModalIcon.innerHTML = `<img src="${iconURL}" alt="Icon">`;
        } else {
            feedbackModalIcon.innerHTML = '';
        }

        // Mostra o modal
        feedbackModal.show();
    }
}

//Função de mostrar um Toast de Feedback
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
