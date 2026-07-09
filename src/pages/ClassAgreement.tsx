import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Purpose",
    body: [
      "The DSMES program is designed to provide participants with diabetes self-management knowledge, skills, and support. During the course, participants may be exposed to personal information, health information, and experiences shared by other participants.",
      "To protect the privacy of all participants and safeguard the intellectual property rights associated with the program and educational materials, Participants agree to comply with the terms and conditions of this Agreement.",
    ],
  },
  {
    title: "2. Confidential Information",
    body: [
      "Confidential Information includes any non-public information learned, seen, heard, or received during the course, including participant identities, health information, contact information, insurance or financial information, personal experiences, HIPAA-protected information, and any information that could identify a participant.",
    ],
  },
  {
    title: "3. Participant Confidentiality Obligations",
    bullets: [
      "Respect and protect the privacy and confidentiality of all participants.",
      "Do not disclose, discuss, share, distribute, or otherwise communicate Confidential Information outside the course.",
      "Do not attempt to identify, track, or obtain personal information about other participants.",
      "Do not use information learned about other participants for any unauthorized purpose.",
      "Follow all instructor and staff instructions regarding privacy, confidentiality, and course participation.",
      "Promptly notify XT Diabetes Care of any actual or suspected privacy breach or violation.",
    ],
  },
  {
    title: "4. Participant Privacy Protection",
    body: [
      "Participants may not photograph, record, distribute, or otherwise share names, facial images, contact information, health information, verbal comments, personal experiences, stories, or case discussions relating to other participants.",
      "Photographs, videos, or audio recordings that include other participants or staff require prior express consent from all individuals involved.",
    ],
  },
  {
    title: "5. Course Materials Usage",
    body: [
      "Participants may photograph course handouts, slides, or other course materials solely for personal educational and review purposes. This permission does not extend to other participants, staff members, or content containing personal information.",
    ],
    bullets: [
      "Do not copy, reproduce, redistribute, record, screenshot, or publicly share course materials without written authorization.",
      "Do not provide course materials to anyone not enrolled in the course.",
      "Do not post course content on social media, websites, forums, cloud-sharing platforms, or other public channels.",
      "Do not upload course content to artificial intelligence platforms, online databases, or third-party systems.",
      "Do not use course content for teaching, training, research, consulting, marketing, or other professional or commercial purposes.",
      "Do not sell, transfer, lease, license, or otherwise commercially exploit course content.",
    ],
  },
  {
    title: "6. Intellectual Property Protection",
    body: [
      "All content provided as part of the DSMES program is owned by XT Diabetes Care and/or its licensors and is protected by applicable copyright, intellectual property, and other laws.",
      "Protected content includes course design, educational content, handouts, slides, worksheets, case studies, audio, video, charts, graphics, images, written materials, translations, and any printed or electronic materials distributed during the course.",
      "XT Diabetes Care reserves all rights, title, and interest in and to the course content and related educational resources.",
    ],
  },
  {
    title: "7. Limited License",
    body: [
      "Participants receive a limited, non-exclusive, non-transferable, and revocable license to access and use course materials solely for personal educational purposes. Participants acquire no ownership rights or intellectual property rights in any course content.",
    ],
  },
  {
    title: "8. HIPAA and Privacy Compliance",
    body: [
      "Participants understand that health-related information protected under HIPAA and other applicable privacy laws may be discussed during the course. Participants agree not to use or disclose Protected Health Information or other Confidential Information without proper authorization.",
    ],
  },
  {
    title: "9. Breach and Remedies",
    bullets: [
      "Immediate removal from the course.",
      "Denial of future participation in XT Diabetes Care programs.",
      "Revocation of course-related privileges or benefits.",
      "Additional actions permitted by applicable laws or organizational policies.",
      "Civil, administrative, or other legal liability where applicable.",
    ],
  },
  {
    title: "10. Term",
    body: [
      "This Agreement becomes effective upon signature or electronic acceptance. The Participant's obligations regarding confidentiality, privacy protection, and intellectual property restrictions survive completion, withdrawal, or termination of participation and remain in effect indefinitely unless otherwise required by law.",
    ],
  },
  {
    title: "11. Acknowledgment",
    body: [
      "By signing or electronically accepting this Agreement, the Participant acknowledges that they have read and understood the Agreement, had an opportunity to ask questions, voluntarily agree to comply with all terms, and understand the potential consequences and legal liabilities associated with violating the Agreement.",
    ],
  },
];

export default function ClassAgreement() {
  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link to="/sign-up-class" className="text-sm font-bold text-[var(--color-brand-purple)] underline underline-offset-4">
          Back to class signup
        </Link>
        <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          DSMES Participant Confidentiality and Intellectual Property Agreement
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          This Participant Confidentiality and Intellectual Property Agreement is entered into by and between XT Diabetes Care and the participant attending the Diabetes Self-Management Education and Support program.
        </p>
        <div className="mt-8 space-y-7">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-7 text-gray-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
