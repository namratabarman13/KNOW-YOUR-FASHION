// ==========================================
// KNOW YOUR FASHION
// Website JavaScript
// ==========================================


// OPEN MODAL

function openModal() {

    const modal = document.getElementById("outfitModal");

    modal.classList.add("show");

}


// CLOSE MODAL

function closeModal() {

    const modal = document.getElementById("outfitModal");

    modal.classList.remove("show");

}


// CLOSE MODAL WHEN CLICKING OUTSIDE

window.addEventListener("click", function(event) {

    const modal = document.getElementById("outfitModal");

    if (event.target === modal) {

        closeModal();

    }

});


// ==========================================
// IMAGE PREVIEW
// ==========================================

const imageInput = document.getElementById("outfitImage");

const imagePreview = document.getElementById("imagePreview");


imageInput.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) {

        imagePreview.style.display = "none";

        return;

    }


    const reader = new FileReader();


    reader.onload = function(event) {

        imagePreview.src = event.target.result;

        imagePreview.style.display = "block";

    };


    reader.readAsDataURL(file);

});


// ==========================================
// LIKE BUTTON
// ==========================================

function likePost(button) {

    const number = button.querySelector("span");

    let likes = parseInt(number.textContent);

    likes++;

    number.textContent = likes;

}


// ==========================================
// COMMENT BUTTON
// ==========================================

function commentPost() {

    alert(
        "The community comment section will be added next! 💬"
    );

}


// ==========================================
// SHARE OUTFIT
// ==========================================

const outfitForm =
    document.getElementById("outfitForm");


outfitForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;

    const occasion =
        document.getElementById("occasion").value;

    const caption =
        document.getElementById("caption").value;

    const image =
        document.getElementById("outfitImage").files[0];


    // Create a new outfit card

    const card =
        document.createElement("article");

    card.className = "outfit-card";


    // Image section

    const imageDiv =
        document.createElement("div");

    imageDiv.className = "outfit-image";


    if (image) {

        const reader =
            new FileReader();


        reader.onload = function(e) {

            imageDiv.style.backgroundImage =
                `url(${e.target.result})`;

            imageDiv.style.backgroundSize =
                "cover";

            imageDiv.style.backgroundPosition =
                "center";

            imageDiv.textContent = "";

        };


        reader.readAsDataURL(image);

    } else {

        imageDiv.textContent = "👗";

        imageDiv.style.background =
            "#fce7f3";

    }


    // Card content

    const content =
        document.createElement("div");

    content.className = "card-content";


    content.innerHTML = `

        <div class="user-info">

            <div class="avatar">
                ${name.charAt(0).toUpperCase()}
            </div>

            <div>

                <strong>${name}</strong>

                <small>${occasion}</small>

            </div>

        </div>


        <p>${caption}</p>


        <div class="card-actions">

            <button onclick="likePost(this)">
                ♡ <span>0</span>
            </button>

            <button onclick="commentPost()">
                💬 Comment
            </button>

        </div>

    `;


    card.appendChild(imageDiv);

    card.appendChild(content);


    // Add the new card

    const grid =
        document.querySelector(".outfit-grid");

    grid.prepend(card);


    // Reset form

    outfitForm.reset();

    imagePreview.style.display = "none";


    // Close modal

    closeModal();


    alert(
        "Your outfit has been posted! ✨"
    );

});