import { UI } from "./UI.js";

const ui = new UI()

window.addEventListener("load", function () {
    let userId = localStorage.getItem("userId")


    loadPageInfo()
        .then(() => {
            preloader()
        })
        .then(() => {
            setTimeout(() => {
                deleteButton()
            }, 8500)
        })

    function loadPageInfo() {
        return new Promise(async function (resolve, reject) {
            await loadDoc('GET', `http://localhost:5500/api/user/posts/${userId}`, ui.getPosts)

            await loadDoc('GET', `http://localhost:5500/api/user/posts/${userId}`, ui.createProfileStatistics)

            await loadDoc('GET', `http://localhost:5500/api/user/${userId}`, ui.createProfileInfo)

            resolve('ok')
        })
    }

    function preloader() {
        setTimeout(() => {
            const container = document.getElementById('container')

            containerInside.classList.remove('hide')
            container.classList.add('hide')
        }, 3000)
    }

    function deleteButton() {
        /* DELETE BUTTONS */
        document.querySelectorAll('.deleteBtn').forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', function (e) {

                document.getElementById('deleteBtn').addEventListener('click', () => {
                    deletePost(e.target.value)
                })
            })
        })

        function deletePost(pet) {
            loadDoc('DELETE', `http://localhost:5500/api/pet/delete-pet/${pet}`, reloadPosts)
        }

        /* RELOAD POSTS */
        function reloadPosts() {
            window.location.reload()
        }
    }

    /* USER POSTS FILTER */
    const postsContainer = document.getElementById('postsContainer')
    const foundContainer = document.getElementById('foundContainer')

    document.getElementById('postsBtn').addEventListener('click', () => {
        postsContainer.classList.remove('hide')
        postsContainer.classList.add('show')
        foundContainer.classList.remove('show')
        foundContainer.classList.add('hide')
    });

    document.getElementById('foundBtn').addEventListener('click', () => {
        foundContainer.classList.remove('hide')
        foundContainer.classList.add('show')
        postsContainer.classList.remove('show')
        postsContainer.classList.add('hide')
    });

})