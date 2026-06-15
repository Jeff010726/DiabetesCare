export const externalBookingUrl =
  "https://app.kalixhealth.com/calendar?calendar_token=06d2246dd9ed72a6228706d8c2dcac8f";

export const bookingUrl = `${import.meta.env.BASE_URL}booking`;
export const calendarBookingUrl = `${import.meta.env.BASE_URL}booking-redirect`;
export const whatsappBookingUrl = `${import.meta.env.BASE_URL}booking-whatsapp`;
export const whatsappDirectUrl = import.meta.env.VITE_WHATSAPP_BOOKING_URL || "";
