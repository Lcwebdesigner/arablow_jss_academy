document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link, .nav-contact").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
            });
        });
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateNav() {
        let current = "home";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    }

    window.addEventListener("scroll", updateNav);
    updateNav();


    /* =========================
       GRADE BUTTONS
    ========================= */
    const gradeButtons = document.querySelectorAll(".grade-btn");

    gradeButtons.forEach(button => {
        button.addEventListener("click", () => {
            gradeButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            showNotification(
                `${formatGrade(button.dataset.grade)} subjects selected.`
            );
        });
    });


    /* =========================
       SUBJECT MODAL
    ========================= */
    const modalOverlay = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalIcon = document.getElementById("modalIcon");
    const modalResources = document.getElementById("modalResources");
    const modalExam = document.getElementById("modalExam");

    const subjectData = {
        "Mathematics": [
            "∑",
            "Study numbers, algebra, geometry, measurement, statistics and mathematical problem solving."
        ],

        "English": [
            "A",
            "Improve grammar, comprehension, writing, oral communication and literature skills."
        ],

        "Kiswahili": [
            "K",
            "Jifunze sarufi, kusoma, kuandika, kuzungumza, fasihi na matumizi bora ya Kiswahili."
        ],

        "Integrated Science": [
            "⚗",
            "Explore living things, matter, energy, health, environment and scientific investigations."
        ],

        "Social Studies": [
            "🌍",
            "Learn about geography, history, citizenship, culture and society."
        ],

        "CRE": [
            "✦",
            "Explore Christian religious education, biblical teachings, values and responsible citizenship."
        ],

        "Agriculture": [
            "🌱",
            "Learn crop production, livestock management, nutrition and sustainable agriculture."
        ],

        "Creative Arts": [
            "🎨",
            "Develop creativity through art, music, drama, physical education and sports."
        ],

        "Pre-Technical Studies": [
            "⚙",
            "Develop practical skills in technology, design, materials, tools and safety."
        ],

        "Computer Studies": [
            "</>",
            "Learn computer basics, digital literacy, internet safety and essential technology skills."
        ]
    };


    /* =========================
       CLOSE MODAL
       ========================= */
    function closeModal() {
        if (!modalOverlay) return;

        modalOverlay.classList.remove("show");
        modalOverlay.style.display = "none";
        document.body.style.overflow = "";
    }


    /* =========================
       OPEN SUBJECT MODAL
       ========================= */
    document.querySelectorAll(".subject-btn").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const subject = button.dataset.subject;
            const data = subjectData[subject];

            if (!data || !modalOverlay) return;

            if (modalTitle) modalTitle.textContent = subject;
            if (modalText) modalText.textContent = data[1];
            if (modalIcon) modalIcon.textContent = data[0];

            modalOverlay.classList.add("show");
            modalOverlay.style.display = "grid";
            document.body.style.overflow = "hidden";
        });
    });


    /* =========================
       MODAL CLOSE BUTTON
       ========================= */
    const modalClose = document.getElementById("modalClose");

    if (modalClose) {
        modalClose.type = "button";
        modalClose.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            closeModal();
        });
    }


    /* =========================
       CLICK OUTSIDE MODAL
       ========================= */
    if (modalOverlay) {
        modalOverlay.addEventListener("click", event => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }


    /* =========================
       ESC KEY CLOSE
       ========================= */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });


    /* =========================
       LEARNING RESOURCES BUTTON
    ========================= */
    if (modalResources) {

        modalResources.addEventListener("click", () => {

            closeModal();

            document
                .getElementById("resources")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });

    }


    /* =========================
       ONLINE EXAMS BUTTON
    ========================= */
    if (modalExam) {

        modalExam.addEventListener("click", () => {

            closeModal();

            document
                .getElementById("exams")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });

    }


    /* =========================
       EXAM BUTTONS
    ========================= */
    document.querySelectorAll(".exam-btn").forEach(button => {

        button.addEventListener("click", () => {

            showNotification(
                `${button.dataset.exam} will open here when the online examination system is connected.`
            );

        });

    });


    /* =========================
       RESULTS FORM
    ========================= */
    const resultsForm = document.getElementById("resultsForm");
    const resultMessage = document.getElementById("resultMessage");

    if (resultsForm) {

        resultsForm.addEventListener("submit", event => {

            event.preventDefault();

            const studentNumber =
                document.getElementById("studentNumber")?.value.trim();

            const studentGrade =
                document.getElementById("studentGrade")?.value;

            if (!studentNumber || !studentGrade) {

                if (resultMessage) {

                    resultMessage.style.display = "block";
                    resultMessage.style.background = "#fef2f2";
                    resultMessage.style.color = "#991b1b";

                    resultMessage.textContent =
                        "Please enter your student number and select your grade.";
                }

                return;
            }

            if (resultMessage) {

                resultMessage.style.display = "block";
                resultMessage.style.background = "#f0fdf4";
                resultMessage.style.color = "#166534";

                resultMessage.innerHTML =
                    `<strong>Request received.</strong><br>
                    Student: ${escapeHTML(studentNumber)}<br>
                    Grade: ${escapeHTML(studentGrade)}<br><br>
                    Your results system is ready to be connected to the school's student database.`;
            }

        });

    }


    /* =========================
       CONTACT FORM
    ========================= */
    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("name")?.value.trim() || "Student";

            if (contactMessage) {

                contactMessage.style.marginTop = "15px";
                contactMessage.style.padding = "10px";
                contactMessage.style.borderRadius = "8px";
                contactMessage.style.background = "#f0fdf4";
                contactMessage.style.color = "#166534";
                contactMessage.style.fontSize = "11px";

                contactMessage.textContent =
                    `Thank you, ${name}. Your message has been received.`;
            }

            contactForm.reset();

        });

    }


    /* =========================
       LOAD SUBJECTS
    ========================= */
    document
        .getElementById("loadSubjects")
        ?.addEventListener("click", () => {

            showNotification(
                "More JSS subjects can be added here as the school curriculum is expanded."
            );

        });


    /* =========================
       CURRENT YEAR
    ========================= */
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================
       HELPER FUNCTIONS
    ========================= */

    function formatGrade(value) {

        return {
            grade7: "Grade 7",
            grade8: "Grade 8",
            grade9: "Grade 9"
        }[value] || "JSS";

    }


    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function showNotification(message) {

        document
            .querySelector(".site-notification")
            ?.remove();

        const notification = document.createElement("div");

        notification.className = "site-notification";

        notification.textContent = message;

        Object.assign(notification.style, {

            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: "3000",
            maxWidth: "360px",
            padding: "15px 18px",
            borderRadius: "10px",
            background: "#0f172a",
            color: "#fff",
            boxShadow: "0 15px 35px rgba(0,0,0,.2)",
            fontSize: "12px",
            lineHeight: "1.5",
            transform: "translateY(20px)",
            opacity: "0",
            transition: "all .3s ease"

        });

        document.body.appendChild(notification);

        requestAnimationFrame(() => {

            notification.style.transform = "translateY(0)";
            notification.style.opacity = "1";

        });

        setTimeout(() => {

            notification.style.opacity = "0";
            notification.style.transform = "translateY(20px)";

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3500);

    }

});


/* ==================================
   GRADE 7 STUDENT LOGIN / SESSION
================================== */

const G7_SESSION_KEY = "arablow_g7_student";


function getG7Student() {

    try {

        return JSON.parse(
            localStorage.getItem(G7_SESSION_KEY) || "null"
        );

    } catch (error) {

        return null;

    }

}


function saveG7Student(student) {

    localStorage.setItem(
        G7_SESSION_KEY,
        JSON.stringify(student)
    );

}


function logoutG7() {

    localStorage.removeItem(G7_SESSION_KEY);

    location.href = "grade7-login.html";

}
