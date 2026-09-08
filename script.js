// ==========================================
// KNOW YOUR FASHION
// Website JavaScript
// ==========================================


// ==========================================
// WAIT FOR PAGE TO LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // MODAL
    // ==========================================

    window.openModal = function () {

        const modal =
            document.getElementById("outfitModal");

        if (modal) {
            modal.classList.add("show");
        }

    };


    window.closeModal = function () {

        const modal =
            document.getElementById("outfitModal");

        if (modal) {
            modal.classList.remove("show");
        }

    };


    // ==========================================
    // CLOSE MODAL WHEN CLICKING OUTSIDE
    // ==========================================

    window.addEventListener("click", function (event) {

        const modal =
            document.getElementById("outfitModal");

        if (event.target === modal) {

            window.closeModal();

        }

    });


    // ==========================================
    // IMAGE PREVIEW
    // ==========================================

    const imageInput =
        document.getElementById("outfitImage");

    const imagePreview =
        document.getElementById("imagePreview");


    if (imageInput && imagePreview) {

        imageInput.addEventListener("change", function () {

            const file = this.files[0];


            if (!file) {

                imagePreview.style.display = "none";

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function (event) {

                imagePreview.src =
                    event.target.result;

                imagePreview.style.display =
                    "block";

            };


            reader.readAsDataURL(file);

        });

    }


    // ==========================================
    // LIKE BUTTON
    // ==========================================

    window.likePost = function (button) {

        if (!button) return;


        const number =
            button.querySelector("span");


        if (!number) return;


        let likes =
            parseInt(number.textContent) || 0;


        likes++;


        number.textContent =
            likes;

    };


    // ==========================================
    // COMMENT BUTTON
    // ==========================================

    window.commentPost = function (button) {

        // Supports BOTH:
        // onclick="commentPost()"
        // and
        // onclick="commentPost(this)"

        if (!button) {

            button =
                window.event?.currentTarget;

        }


        if (!button) {

            alert("Please try clicking Comment again.");

            return;

        }


        const card =
            button.closest(".outfit-card");


        if (!card) return;


        // Check if comment section already exists

        let commentsSection =
            card.querySelector(".comments-section");


        // If it exists, show/hide it

        if (commentsSection) {

            if (
                commentsSection.style.display === "none"
            ) {

                commentsSection.style.display =
                    "block";

            } else {

                commentsSection.style.display =
                    "none";

            }

            return;

        }


        // ==========================================
        // CREATE COMMENT SECTION
        // ==========================================

        commentsSection =
            document.createElement("div");


        commentsSection.className =
            "comments-section";


        commentsSection.innerHTML = `

            <div class="comment-input-row">

                <input
                    type="text"
                    class="comment-input"
                    placeholder="Write a comment..."
                    maxlength="300"
                >

                <button
                    class="comment-submit"
                    type="button"
                    onclick="addComment(this)"
                >
                    Post
                </button>

            </div>

            <div class="comments-list"></div>

        `;


        card.appendChild(commentsSection);


        // Automatically focus on input

        const input =
            commentsSection.querySelector(".comment-input");


        if (input) {

            input.focus();

        }

    };


    // ==========================================
    // ADD COMMENT
    // ==========================================

    window.addComment = function (button) {

        const commentsSection =
            button.closest(".comments-section");


        if (!commentsSection) return;


        const input =
            commentsSection.querySelector(".comment-input");


        const commentsList =
            commentsSection.querySelector(".comments-list");


        if (!input || !commentsList) return;


        const commentText =
            input.value.trim();


        // Don't allow empty comments

        if (commentText === "") {

            alert("Please write a comment first 💬");

            input.focus();

            return;

        }


        // ==========================================
        // CREATE COMMENT
        // ==========================================

        const comment =
            document.createElement("div");


        comment.className =
            "comment";


        comment.innerHTML = `

            <div class="comment-avatar">
                Y
            </div>

            <div class="comment-content">

                <strong>You</strong>

                <p>${escapeHTML(commentText)}</p>

            </div>

            <button
                class="delete-comment"
                type="button"
                onclick="deleteComment(this)"
                title="Delete comment"
            >
                🗑️
            </button>

        `;


        commentsList.appendChild(comment);


        // Clear input

        input.value = "";


        // Focus again

        input.focus();

    };


    // ==========================================
    // DELETE COMMENT
    // ==========================================

    window.deleteComment = function (button) {

        const comment =
            button.closest(".comment");


        if (!comment) return;


        const confirmed =
            confirm("Delete this comment?");


        if (confirmed) {

            comment.remove();

        }

    };


    // ==========================================
    // DELETE POST
    // ==========================================

    window.deletePost = function (button) {

        const card =
            button.closest(".outfit-card");


        if (!card) return;


        const confirmed =
            confirm(
                "Are you sure you want to delete this outfit?"
            );


        if (confirmed) {

            card.remove();

        }

    };


    // ==========================================
    // ESCAPE HTML
    // Prevents unwanted HTML in comments
    // ==========================================

    window.escapeHTML = function (text) {

        const div =
            document.createElement("div");


        div.textContent =
            text;


        return div.innerHTML;

    };


    // ==========================================
    // SHARE OUTFIT
    // ==========================================

    const outfitForm =
        document.getElementById("outfitForm");


    if (outfitForm) {

        outfitForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // ==================================
                // GET FORM VALUES
                // ==================================

                const name =
                    document.getElementById("name").value.trim();


                const occasion =
                    document.getElementById("occasion").value.trim();


                const caption =
                    document.getElementById("caption").value.trim();


                const image =
                    document.getElementById("outfitImage").files[0];


                // ==================================
                // CREATE OUTFIT CARD
                // ==================================

                const card =
                    document.createElement("article");


                card.className =
                    "outfit-card";


                // ==================================
                // IMAGE SECTION
                // ==================================

                const imageDiv =
                    document.createElement("div");


                imageDiv.className =
                    "outfit-image";


                if (image) {

                    const reader =
                        new FileReader();


                    reader.onload =
                        function (e) {

                            imageDiv.style.backgroundImage =
                                `url("${e.target.result}")`;

                            imageDiv.style.backgroundSize =
                                "cover";

                            imageDiv.style.backgroundPosition =
                                "center";

                            imageDiv.textContent =
                                "";

                        };


                    reader.readAsDataURL(image);

                } else {

                    imageDiv.textContent =
                        "👗";

                    imageDiv.style.background =
                        "#fce7f3";

                }


                // ==================================
                // CARD CONTENT
                // ==================================

                const content =
                    document.createElement("div");


                content.className =
                    "card-content";


                const firstLetter =
                    name
                        ? name.charAt(0).toUpperCase()
                        : "Y";


                content.innerHTML = `

                    <div class="user-info">

                        <div class="avatar">
                            ${escapeHTML(firstLetter)}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(name)}
                            </strong>

                            <small>
                                ${escapeHTML(occasion)}
                            </small>

                        </div>

                    </div>


                    <p>
                        ${escapeHTML(caption)}
                    </p>


                    <div class="card-actions">

                        <button
                            type="button"
                            onclick="likePost(this)"
                        >
                            ♡ <span>0</span>
                        </button>


                        <button
                            type="button"
                            onclick="commentPost(this)"
                        >
                            💬 Comment
                        </button>


                        <button
                            type="button"
                            onclick="deletePost(this)"
                            class="delete-post"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                `;


                // ==================================
                // ADD CONTENT TO CARD
                // ==================================

                card.appendChild(imageDiv);

                card.appendChild(content);


                // ==================================
                // ADD CARD TO GRID
                // ==================================

                const grid =
                    document.querySelector(".outfit-grid");


                if (grid) {

                    grid.prepend(card);

                }


                // ==================================
                // RESET FORM
                // ==================================

                outfitForm.reset();


                if (imagePreview) {

                    imagePreview.style.display =
                        "none";

                }


                // ==================================
                // CLOSE MODAL
                // ==================================

                window.closeModal();


                // ==================================
                // SUCCESS MESSAGE
                // ==================================

                alert(
                    "Your outfit has been posted! ✨"
                );

            }
        );

    }

});

// ==========================================
// SIGN IN / SIGN UP
// ==========================================


// Open authentication modal

function openAuthModal() {

    const modal =
        document.getElementById("authModal");

    if (modal) {
        modal.classList.add("show");
    }

}


// Close authentication modal

function closeAuthModal() {

    const modal =
        document.getElementById("authModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


// ==========================================
// TOGGLE SIGN IN / SIGN UP
// ==========================================

let signupMode = false;


function toggleAuthMode() {

    signupMode = !signupMode;


    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById("authSubtitle");

    const switchText =
        document.getElementById("authSwitchText");

    const switchButton =
        document.getElementById("authSwitchButton");


    if (signupMode) {

        loginForm.style.display = "none";

        signupForm.style.display = "block";

        title.textContent =
            "Create Your Account";

        subtitle.textContent =
            "Join the Know Your Fashion community.";

        switchText.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Sign In";

    } else {

        loginForm.style.display = "block";

        signupForm.style.display = "none";

        title.textContent =
            "Welcome Back";

        subtitle.textContent =
            "Sign in to share outfits and join the community.";

        switchText.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Sign Up";

    }

}


// ==========================================
// SIGN UP
// ==========================================

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            // Get existing users

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "knowYourFashionUsers"
                    )
                ) || [];


            // Check existing account

            const existingUser =
                users.find(
                    user => user.email === email
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;

            }


            // Create user

            const newUser = {

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);


            localStorage.setItem(
                "knowYourFashionUsers",
                JSON.stringify(users)
            );


            // Automatically sign in

            localStorage.setItem(
                "knowYourFashionCurrentUser",
                JSON.stringify({
                    name: name,
                    email: email
                })
            );


            alert(
                `Welcome to Know Your Fashion, ${name}! ✨`
            );


            signupForm.reset();

            closeAuthModal();

            updateAuthButton();

        }
    );

}


// ==========================================
// SIGN IN
// ==========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "knowYourFashionUsers"
                    )
                ) || [];


            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            if (!user) {

                alert(
                    "Incorrect email or password."
                );

                return;

            }


            // Save current user

            localStorage.setItem(
                "knowYourFashionCurrentUser",
                JSON.stringify({
                    name: user.name,
                    email: user.email
                })
            );


            alert(
                `Welcome back, ${user.name}! 👗`
            );


            loginForm.reset();

            closeAuthModal();

            updateAuthButton();

        }
    );

}


// ==========================================
// UPDATE NAVBAR BUTTON
// ==========================================

function updateAuthButton() {

    const button =
        document.getElementById("authButton");


    if (!button) return;


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "knowYourFashionCurrentUser"
            )
        );


    if (currentUser) {

        button.textContent =
            currentUser.name;

        button.onclick =
            openAccountMenu;

    } else {

        button.textContent =
            "Sign In";

        button.onclick =
            openAuthModal;

    }

}


// ==========================================
// ACCOUNT MENU
// ==========================================

function openAccountMenu() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "knowYourFashionCurrentUser"
            )
        );


    if (!currentUser) {

        openAuthModal();

        return;

    }


    const logout =
        confirm(
            `You're signed in as ${currentUser.name}.\n\nPress OK to sign out.`
        );


    if (logout) {

        localStorage.removeItem(
            "knowYourFashionCurrentUser"
        );


        updateAuthButton();


        alert(
            "You have been signed out."
        );

    }

}


// ==========================================
// CHECK LOGIN WHEN PAGE LOADS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateAuthButton();

    }
);