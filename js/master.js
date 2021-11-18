// check color in localstoge or no
let mainColor = localStorage.getItem("main_color");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--mincolor", mainColor);
}

//  varibles
let landingPage = document.querySelector(".landing-page");
let settingsIcone = document.querySelector(".setting-box .tagle-setting");
let settingsBox = document.querySelector(".setting-box");
let iconesettings = document.querySelector(".setting-box .tagle-setting i");
let yesRandomBack = document.querySelector(".yes");
let noRandomBack = document.querySelector("no");
// randomize options background
let backgroundOptions = true;
let clearIntervalBackGround;

// switch colors
let colorsList = document.querySelectorAll(".colors li");
colorsList.forEach((color) => {
    color.addEventListener("click", function(e) {
        e.target.dataset.color;
        // set color target in root css
        document.documentElement.style.setProperty(
            "--mincolor",
            e.target.dataset.color
        );
        // set color on localstorge
        localStorage.setItem("main_color", e.target.dataset.color);
        // remove class active from all elements
        handelActive(e);
    });
});
// check background on localstorage
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    console.log(backgroundLocalItem);
    if (backgroundLocalItem === "true") {
        backgroundOptions = true;
    } else {
        console.log(backgroundLocalItem);

        backgroundOptions = false;
    }
}
// switch random background
let randomeBackEl = document.querySelectorAll(".background_box span");
randomeBackEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handelActive(e);
        if (e.target.dataset.background === "yes") {
            localStorage.setItem("background_option", e.target.dataset.background);
            randomizeBackgound();
        } else {
            localStorage.setItem("background_option", e.target.dataset.background);
            backgroundOptions = false;
            clearInterval(clearIntervalBackGround);
        }

    });
});

// random background
function randomizeBackgound() {
    if ((backgroundOptions = true)) {
        clearIntervalBackGround = setInterval(() => {
            let imagesArry = ["1.jpg", "3.jpg", "4.jpg", "5.jpg"];
            // Random number
            let randomNumber = Math.floor(Math.random() * imagesArry.length);
            // random image for background

            landingPage.style.backgroundImage =
                "url(images/" + imagesArry[randomNumber] + ")";
        }, 10000);
    }
}

settingsIcone.onclick = function() {
    settingsBox.classList.toggle("open");
    iconesettings.classList.toggle("fa-spin");
};
//  skills

let ourSkills = document.querySelector(".skills");
window.onscroll = function() {
    // skills offsettop window
    let skillsOffsetTo = ourSkills.offsetTop;
    // skills offsetheight box
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window Height
    let windowHeight = this.innerHeight;
    // scroll page
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTo + skillsOuterHeight - windowHeight) {
        let progress = document.querySelectorAll(".skill-progress span");
        progress.forEach((progres) => {
            progres.style.width = progres.dataset.progress;
        });
        let progressParsantage = document.querySelectorAll(
            ".skill-progress span span"
        );
        progressParsantage.forEach((p) => {
            p.style.left = document.querySelector(
                ".skill-progress span"
            ).dataset.progress;
            p.style.display = "block";
        });
    }
};
// gallery popup
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach((image) => {
    image.addEventListener("click", (e) => {
        // create overlay element
        let overlayElement = document.createElement("div");
        // add class to overlay element
        overlayElement.className = "popup-overlay";
        // append overlay to document
        document.body.appendChild(overlayElement);
        // create popup box
        let popupbox = document.createElement("div");
        // add class to popup box
        popupbox.className = "popup-box";
        if (image.alt != null) {
            // creat text image
            let textImage = document.createElement("p");
            textImage.innerHTML = image.alt;
            // append text to popup box
            popupbox.appendChild(textImage);
        }
        // create img element
        let popupImage = document.createElement("img");
        popupImage.src = image.src;
        // append img to popup box
        popupbox.appendChild(popupImage);
        // append popup box to body
        document.body.appendChild(popupbox);
        // creat btn exit
        let btnExit = document.createElement("span");
        // creat text btn exit
        let textBtn = document.createTextNode("x");
        // appent textbtn to btn exit
        btnExit.appendChild(textBtn);
        //  append btn Exit to popup box
        popupbox.appendChild(btnExit);

        // close popup
        btnExit.addEventListener("click", () => {
            overlayElement.remove();
            popupbox.remove();
        });
    });
});

// nave bullets
let allBullets = document.querySelectorAll(".bullets-nave .bullet");
let allLinksNave = document.querySelectorAll(".landing-area li a");
scrollToSection(allBullets);
scrollToSection(allLinksNave);

function scrollToSection(links) {
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(link.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}


// handel active state
function handelActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
    });
    ev.target.classList.add("active");
}
// show bullets or no 
let allOptions = document.querySelectorAll(".testing-option span");
let bullet = document.querySelector(".bullets-nave");
let bulletLocalStorg = localStorage.getItem("bullet-option");
if (bulletLocalStorg != null) {
    allOptions.forEach(span => {
        span.classList.remove("active")
    })
}
if (bulletLocalStorg === 'yes') {
    bullet.style.display = "block"
    document.querySelector(".testing-option .yes").classList.add("active")
} else {
    bullet.style.display = "none"
    document.querySelector(".testing-option .no").classList.add("active")
}

allOptions.forEach(span => {
        span.addEventListener("click", (e) => {
            if (span.dataset.option === "no") {
                bullet.style.display = "none"
                localStorage.setItem("bullet-option", 'no')
            } else {
                bullet.style.display = "block"
                localStorage.setItem("bullet-option", 'yes')
            }
            handelActive(e)
        })
    })
    // reast options
let btnReast = document.querySelector(".reast-options").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})

// links menu
let links = document.querySelector(".landing-area ul");
let menu = document.querySelector(".links-menu");
menu.addEventListener("click", (e) => {
    e.stopPropagation()

    links.classList.toggle("open")
    menu.classList.toggle("links-menu-avtive")
})


document.addEventListener("click", (e) => {
        if (e.target !== menu && e.target !== links) {
            if (links.classList.contains("open")) {
                links.classList.toggle("open")
                menu.classList.toggle("links-menu-avtive")
            }
        }

    })
    // .stop propagation
links.addEventListener("cleck", (e) => {
    e.stopPropagation()
})


// header options
var optionsHead = {
    strings: ['Creative', "mpoakjd", "Creative"],
    typeSpeed: 80,
    fadeOut: true,
    Loop: true,
    showCursor: false
};

var typed = new Typed('.element', optionsHead);

const header = document.querySelector(".nave");

var headroom = new Headroom(header);
headroom.init()