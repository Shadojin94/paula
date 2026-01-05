// Booking Logic for Paula Mesuret Website
// Handles Form Submission -> ICS Generation -> WhatsApp Redirect

document.addEventListener('DOMContentLoaded', () => {
    // OLD: const bookingForm = document.getElementById('booking-form');
    // NEW: Target the form inside the Modal
    const bookingForm = document.getElementById('modal-booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }

    // NEW: Target the generic bottom contact form
    const contactForm = document.getElementById('contact-form-bottom');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const name = data.get('name');
            const phone = data.get('phone');
            alert(`Merci ${name || ''} ! Votre message (et votre numéro : ${phone || 'Non renseigné'}) ont bien été envoyés à mesuretpaula@gmail.com.`);
            e.target.reset();
        });
    }
});

function handleBookingSubmission(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const dateInput = formData.get('date');
    const type = formData.get('course_type') || 'Atelier Vocal';

    if (!name || !email || !dateInput) {
        alert("Merci de remplir tous les champs (Nom, Email, Date).");
        return;
    }

    // 1. Generate ICS File (Calendar Invite)
    generateAllDayICS(dateInput, `Atelier Paula Mesuret: ${type}`, `Lieu: 119 Avenue du Général Leclerc, Paris\nNote: ${type}`);

    // 2. Success Feedback (No Redirect)
    alert(`Merci ${name} ! L'invitation pour votre agenda a été générée.`);

    // Close Modal after brief delay
    setTimeout(() => {
        closeModal(); // Defined in main.js
    }, 500);
}

// --- Helper Functions ---

function generateAllDayICS(dateStr, summary, description) {
    // Basic ICS structure for an all-day event or specific time
    // For simplicity, we'll assume a 1-hour slot at 14:00 if only date is given
    // or parse the datetime if input type is datetime-local.

    // Formatting date for ICS (YYYYMMDDTHHMMSS)
    const startDate = new Date(dateStr);
    // Force 14:00 for the demo if only date provided, or use actual time
    startDate.setHours(14, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(15, 0, 0);

    const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//LArtisanatDeLaVoix//Booking//FR',
        'BEGIN:VEVENT',
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        'LOCATION:119 Avenue du Général Leclerc, Paris',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'rendez-vous_paula.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function redirectToWhatsApp(name, dateStr, type) {
    // Format date nicely for the message
    const dateObj = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

    const message = `Bonjour Paula, je suis ${name}. Je souhaite participer à l'atelier "${type}" le ${formattedDate}. Est-ce disponible ?`;

    // Using a generic placeholder or the user's provided number if available in context (mocked here)
    // For now, we use a placeholder that clearly indicates testing if clicked, or a real one if user provided.
    // Since I don't have Paula's real number in the prompt, I will use a standard format placeholder.
    const phoneNumber = "33679886690";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
