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
    // Helper: First day index (0=Sun... we want Mon=0, Sun=6)
    function getFirstDayOfMonth(y, m) {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1;
    }

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    // Holidays Configuration (Zone C - Paris) + Exceptions
    // Rule: First Saturday of holidays is ALWAYS a Class. 
    // Format: Start Date (Inclusive) -> End Date (Inclusive) where NO CLASS takes place.
    // If a Saturday is "First Saturday", it should NOT be in these ranges.

    const holidayRanges = [
        // 2025
        { start: '2025-02-16', end: '2025-03-02' }, // Hiver 2025: Sat 15 is Class.
        { start: '2025-04-13', end: '2025-04-27' }, // Printemps 2025: Sat 12 is Class.
        { start: '2025-07-06', end: '2025-08-31' }, // Été 2025: Sat 5 July is Class? Let's assume yes.
        { start: '2025-10-19', end: '2025-11-02' }, // Toussaint 2025: Sat 18 is Class.
        { start: '2025-12-21', end: '2026-01-04' }, // Noël 2025: Sat 20 is Class.

        // 2026
        { start: '2026-02-22', end: '2026-03-08' }, // Hiver 2026: Sat 21 is Class.
        { start: '2026-04-19', end: '2026-05-03' }, // Printemps 2026: Sat 18 is Class.
    ];

    // Specific Override for 28 Feb 2026 -> It is a Saturday INSIDE the Hiver 2026 range?
    // Wait, Hiver 2026 (Zone C) is Sat 21 Feb to Mon 9 March.
    // Sat 21 Feb = First Saturday -> Class.
    // Sat 28 Feb = Middle Saturday -> Normally Holiday. USER REQUEST: CLASS.
    // Sat 7 March = Last Saturday -> Holiday.

    // My range above for Hiver 2026 starts Feb 22 (Sunday) to avoid the 21st. 
    // But it covers Feb 28. So I need to explicitly EXCLUDE Feb 28 from being treated as a holiday.

    const isHoliday = (d, m, y) => {
        // Create date string YYYY-MM-DD (local)
        const checkDate = new Date(y, m, d);
        // Adjust for timezone offset to avoid issues, or simpler: compare strings
        const pad = n => n < 10 ? '0' + n : n;
        const dateStr = `${y}-${pad(m + 1)}-${pad(d)}`;

        // Exception: 28 Feb 2026 is ALWAYS CLASS
        if (dateStr === '2026-02-28') return false;

        for (let range of holidayRanges) {
            if (dateStr >= range.start && dateStr <= range.end) return true;
        }

        // Month-based broad check for Summer if not covered fully above (redundant but safe)
        // if (m === 7) return true; // August always off

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

        // Responsive Classes:
        // Mobile: text-xs, h-10/12. Desktop: text-sm/base, aspect-square.
        let classes = "w-full aspect-square rounded-md md:rounded-lg flex flex-col items-center justify-center transition relative overflow-hidden ";

        // Font size responsiveness
        let content = `<span class="text-sm md:text-xl z-10 font-bold">${d}</span>`;
        let onclick = "";

        if (isPast) {
            // Past dates
            classes += "bg-gray-50 text-gray-300 cursor-not-allowed";
        } else if (isSaturday) {
            // Saturdays
            if (holiday) {
                // Vacances
                classes += "bg-gray-100/80 text-gray-400 cursor-not-allowed border border-gray-100";
                content += `<span class="text-[0.6rem] md:text-[10px] uppercase font-medium mt-0.5 md:mt-1 z-10 text-gray-400/80">Vacances</span>`;
            } else {
                // Active Saturday Course
                classes += "bg-primary text-[#0d1b12] shadow-sm md:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer transform";
                content += `<span class="text-[0.6rem] md:text-[10px] uppercase font-bold mt-0.5 md:mt-1 z-10 opacity-90">Cours</span>`;
                onclick = `openModal('Atelier du Samedi ${d} ${monthNames[month]}')`;
            }
        } else {
            // Weekdays - Appointment availability
            if (holiday) {
                classes += "bg-white text-gray-200"; // Weekday holiday
            } else {
                classes += "bg-white border border-gray-50 text-gray-600 hover:bg-primary/5 hover:border-primary/20 cursor-pointer";
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
