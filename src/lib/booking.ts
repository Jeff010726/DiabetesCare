export const externalBookingUrl =
  "https://app.kalixhealth.com/calendar?calendar_token=06d2246dd9ed72a6228706d8c2dcac8f";

export const bookingUrl = `${import.meta.env.BASE_URL}booking`;
export const calendarBookingUrl = `${import.meta.env.BASE_URL}booking-redirect`;
export const whatsappBookingUrl = `${import.meta.env.BASE_URL}booking-whatsapp`;
export const whatsappDirectUrl =
  import.meta.env.VITE_WHATSAPP_BOOKING_URL ||
  "https://wa.me/16466395011?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%2015-minute%20consultation%20and%20check%20whether%20my%20insurance%20may%20be%20covered.";
