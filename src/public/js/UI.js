export class UI {

    showToast(result) {
        if (result === true) {
            let user = firebase.auth().currentUser;
            let userName = user.displayName;
            this.showToastMessage(userName)
        } else if (result != true || result != false)
            this.showToastErrorMessage(result)

        else
            this.showToastErrorMessage('inténtalo nuevamente')
    };

    createToast() {
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function(toastEl) {
            return new bootstrap.Toast(toastEl)
        });
        toastList.forEach(toast => toast.show());
    }

    showToastErrorMessage(solution) {
        const toastContainer = document.getElementById('toastContainer')

        toastContainer.innerHTML = `
            <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
                <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="/img/logo.png" alt="Logo">
                        <strong class="me-auto">Encuéntrame</strong>
                        <strong class="text-danger">Error</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        <b>Ha ocurrido un error: </b> ${solution}
                    </div>
                </div>
            </div>
        `
        this.createToast()
    }

    showToastMessage(userName) {
        const toastContainer = document.getElementById('toastContainer')

        if (!userName)
            userName = ''

        toastContainer.innerHTML = `
            <div class="position-fixed bottom-0 end-0 p-3 toast-wrapper">
                <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="/img/logo.png" alt="Logo">
                        <strong class="me-auto">Encuéntrame</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        <b>${userName}</b> ¡Qué bueno verte!
                    </div>
                </div>
            </div>
   `
        this.createToast()
    }
}