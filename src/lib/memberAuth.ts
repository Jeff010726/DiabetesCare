export type MemberUser = {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  preferredLanguage?: string;
  marketingOptIn?: boolean;
};

export const memberAuthKey = "xt-member-authenticated";
export const memberAuthChangedEvent = "xt-member-auth-changed";

export function memberInitials(user: MemberUser) {
  const first = user.firstName?.trim()[0] || "";
  const last = user.lastName?.trim()[0] || "";
  const initials = `${first}${last}`.trim();
  if (initials) return initials.toUpperCase();

  const emailName = user.email.split("@")[0] || "";
  const parts = emailName.split(/[._\-\s]+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return emailName.slice(0, 2).toUpperCase() || "U";
}

export function notifyMemberAuthChanged() {
  window.dispatchEvent(new Event(memberAuthChangedEvent));
}
