// Main JS - V1 Unified Logic
// Handles GSAP Animations, Modal Interactions, and Dynamic Calendar

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Reveal Animations (GPU Optimized) ---
    const revealItems = document.querySelectorAll(".reveal-item");
    revealItems.forEach((item) => {
        gsap.set(item, { willChange: "transform, opacity" });
        gsap.fromTo(item,
            { y: 15, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.4, ease: "power1.out",
                scrollTrigger: { trigger: item, start: "top 95%", toggleActions: "play none none none", once: true },
                onComplete: () => gsap.set(item, { clearProps: "willChange" })
            }
        );
    });

    // --- 2. Hero Image Parallax ---
    const heroImage = document.querySelector("#accueil .bg-cover");
    if (heroImage) {
        gsap.set(heroImage, { willChange: "transform" });
        gsap.to(heroImage, {
            y: "5%", ease: "none",
            scrollTrigger: { trigger: "#accueil", start: "top top", end: "bottom top", scrub: 1 }
        });
    }

    // --- 3. WhatsApp Message Builder (For simple inputs if any) ---
    const msgInput = document.getElementById('whatsapp-message-input');
    const waBtn = document.getElementById('modal-whatsapp-btn');
    if (msgInput && waBtn) {
        msgInput.addEventListener('input', (e) => {
            // This is secondary, dynamic update handled in openModal mostly
            const currentHref = waBtn.href.split('?text=')[0];
            const baseText = waBtn.getAttribute('data-base-text') || "";
            waBtn.href = `${currentHref}?text=${encodeURIComponent(baseText + " " + e.target.value)}`;
        });
    }

    // --- 4. Init Calendar ---
    initCalendar();
});


// --- GLOBAL FUNCTIONS (Accessible from HTML) ---

// 1. MODAL LOGIC
function openModal(courseName, isAppointment = false) {
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-course-name');
    const courseInput = document.getElementById('modal-course-input');
    const waBtn = document.getElementById('modal-whatsapp-btn');
    const msgInput = document.getElementById('whatsapp-message-input');
    const formContainer = document.getElementById('modal-form-container');

    // Set Dynamic Content
    modalTitle.textContent = courseName;
    courseInput.value = courseName;

    // Reset inputs & Hide Form initially
    if (msgInput) msgInput.value = "";
    if (formContainer) formContainer.classList.add('hidden');

    // Determine WhatsApp Pre-filled Message "Droit au but"
    let defaultMsg = "";
    let placeholder = "Écrivez votre message ici...";

    if (courseName.includes("Contact Direct")) {
        defaultMsg = "Bonjour Paula, je souhaite prendre contact avec vous.";
        placeholder = "Votre message...";
    } else if (courseName.includes("Chant") || courseName.includes("Vocal")) {
        defaultMsg = "Bonjour Paula, je suis intéressé(e) par les cours de Chant / Technique Vocale.";
    } else if (courseName.includes("Parole")) {
        defaultMsg = "Bonjour Paula, je suis intéressé(e) par les ateliers de Prise de Parole.";
    } else if (isAppointment) {
        defaultMsg = `Bonjour Paula, je souhaiterais un rendez-vous pour le ${courseName.replace('Rendez-vous du ', '')}.`;
    } else if (courseName.includes("Atelier")) {
        defaultMsg = `Bonjour Paula, je souhaite m'inscrire à l'${courseName}.`;
    } else {
        defaultMsg = `Bonjour Paula, je suis intéressé(e) par : ${courseName}.`;
    }

    // Store base text for dynamic updates
    if (waBtn) {
        waBtn.setAttribute('data-base-text', defaultMsg);
        waBtn.href = `https://wa.me/33679886690?text=${encodeURIComponent(defaultMsg)}`;
    }
    if (msgInput) msgInput.placeholder = placeholder;

    // Show Modal
    modal.classList.remove('pointer-events-none', 'opacity-0');
    // Animate Content
    setTimeout(() => {
        document.getElementById('modal-content').classList.remove('scale-95');
        document.getElementById('modal-content').classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('course-modal');
    modal.classList.add('pointer-events-none', 'opacity-0');
    document.getElementById('modal-content').classList.remove('scale-100');
    document.getElementById('modal-content').classList.add('scale-95');
    document.getElementById('modal-form-container').classList.add('hidden');
}

function toggleModalForm() {
    const formContainer = document.getElementById('modal-form-container');
    formContainer.classList.toggle('hidden');
    if (!formContainer.classList.contains('hidden')) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// 2. FAQ LOGIC
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.material-symbols-outlined');

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
    }
}

// 3. CALENDAR LOGIC

let currentCalendarDate = new Date();

// Logic: If we are late in the month (e.g. > 20th), show NEXT month by default?
// User request: Show current week's Saturdays and following. 
// If today is 18th Dec, showing Dec is correct. 
// If today is 25th Dec, showing Dec is still correct for the 27th.
// Let's stick to showing CURRENT month by default, unless it's literally the last few days and no Saturdays left?
// Keeping it simple: Show CURRENT month by default.
// Adjust manually if needed.
// currentCalendarDate is ALREADY set to today.

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    initCalendar();
}

function initCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-title');
    if (!grid) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth(); // 0-11

    // French Month Names
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    if (title) title.innerText = `${monthNames[month]} ${year}`;

    // Helper: Days in month
    function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
    // Helper: First day index (0=Sun, 1=Mon... but we want Mon=0, Sun=6)
    function getFirstDayOfMonth(y, m) {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1;
    }

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    // Holidays (Zone C - Paris) - Approx logic for 2024-2026
    const isHoliday = (d, m, y) => {
        // Noel: ~Dec 21 - Jan 6
        if ((m === 11 && d >= 21) || (m === 0 && d <= 6)) return true;
        // Hiver: ~Feb 15 - Mar 3
        if ((m === 1 && d >= 15) || (m === 2 && d <= 3)) return true;
        // Printemps: ~Apr 12 - Apr 28
        if ((m === 3 && d >= 12) || (m === 3 && d <= 28)) return true;
        // Ete: > July 5
        if (m === 6 && d >= 5) return true;
        if (m > 6 && m < 8) return true; // July/Aug full
        return false;
    };

    let html = '';

    // Empty cells
    for (let i = 0; i < firstDayIndex; i++) {
        html += `<div class="bg-transparent"></div>`;
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        const dayOfWeek = dateObj.getDay(); // 0=Sun, 6=Sat
        const isSaturday = (dayOfWeek === 6);
        const holiday = isHoliday(d, month, year);
        const isPast = dateObj < today;

        // Styles basic
        let classes = "h-auto aspect-square rounded-lg flex flex-col items-center justify-center font-bold text-sm transition relative overflow-hidden ";
        let content = `<span class="text-xl z-10">${d}</span>`;
        let onclick = "";

        if (isPast) {
            // Past dates
            classes += "bg-gray-50 text-gray-300 cursor-not-allowed";
        } else if (isSaturday) {
            // Saturdays
            if (holiday) {
                classes += "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70";
                content += `<span class="text-[10px] font-normal z-10">Vacances</span>`;
            } else {
                // Active Saturday Course
                classes += "bg-primary text-[#0d1b12] shadow-md hover:scale-105 cursor-pointer transform";
                content += `<span class="text-[10px] font-normal z-10">Cours</span>`;
                onclick = `openModal('Atelier du Samedi ${d} ${monthNames[month]}')`;
            }
        } else {
            // Weekdays - Appointment availability
            if (holiday) {
                classes += "bg-white text-gray-300 border border-gray-50"; // Weekday holiday
            } else {
                classes += "bg-white border border-gray-100 text-gray-600 hover:bg-primary/10 hover:border-primary/30 cursor-pointer";
                onclick = `openModal('Rendez-vous du ${d} ${monthNames[month]}', true)`;
            }
        }

        html += `<div class="${classes}" ${onclick ? `onclick="${onclick}"` : ''}>${content}</div>`;
    }

    grid.innerHTML = html;
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.id === 'course-modal') {
        closeModal();
    }
});
