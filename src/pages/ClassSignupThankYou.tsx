import { Download, MessageCircle, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../lib/analytics";

type GroupCardProps = {
  image: string;
  title: string;
  body: string;
  downloadLabel: string;
  filename: string;
  group: "whatsapp" | "wechat";
};

function GroupCard({ image, title, body, downloadLabel, filename, group }: GroupCardProps) {
  const recordDownload = () => {
    trackEvent({ eventType: "class_signup_group_qr_download", eventName: group });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm">
      <img src={image} alt={title} className="mx-auto aspect-[3/4] w-full max-w-[240px] rounded-xl object-cover" />
      <h2 className="mt-4 text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
      <a
        href={image}
        download={filename}
        onClick={recordDownload}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-purple)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
      >
        <Download className="h-4 w-4" />
        {downloadLabel}
      </a>
    </article>
  );
}

function GroupCards() {
  const { t } = useTranslation("classSignup");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GroupCard
        image="/class-groups/whatsapp-dsme-group.jpg"
        title={t("thankYou.whatsappTitle")}
        body={t("thankYou.whatsappBody")}
        downloadLabel={t("thankYou.saveWhatsapp")}
        filename="xt-dsme-whatsapp-group.jpg"
        group="whatsapp"
      />
      <GroupCard
        image="/class-groups/wechat-class-contact.jpg"
        title={t("thankYou.wechatTitle")}
        body={t("thankYou.wechatBody")}
        downloadLabel={t("thankYou.saveWechat")}
        filename="xt-dsme-wechat-contact.jpg"
        group="wechat"
      />
    </div>
  );
}

export default function ClassSignupThankYou() {
  const { t } = useTranslation("classSignup");
  const [showGroups, setShowGroups] = useState(true);

  return (
    <div className="bg-[#fbfafc] px-4 py-12 sm:px-6 sm:py-20">
      <main className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600">
          <UsersRound className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{t("thankYou.title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">{t("thankYou.body")}</p>

        <section className="mt-9 rounded-3xl border border-[var(--color-brand-purple)]/15 bg-[var(--color-brand-purple-light)]/25 p-4 text-left sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-brand-purple)] shadow-sm">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("thankYou.groupTitle")}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{t("thankYou.groupBody")}</p>
            </div>
          </div>
          <GroupCards />
        </section>

        <Link to="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-brand-purple)] px-6 text-sm font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90">
          {t("thankYou.home")}
        </Link>
      </main>

      {showGroups && (
        <div className="fixed inset-0 z-[70] flex items-end bg-gray-950/45 p-3 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="class-group-dialog-title">
          <section className="max-h-[calc(100dvh-24px)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="class-group-dialog-title" className="text-xl font-bold text-gray-900">{t("thankYou.groupTitle")}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">{t("thankYou.groupBody")}</p>
              </div>
              <button type="button" onClick={() => setShowGroups(false)} aria-label={t("thankYou.closeGroups")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5"><GroupCards /></div>
            <button type="button" onClick={() => setShowGroups(false)} className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-800 transition hover:bg-gray-50">
              {t("thankYou.closeGroups")}
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
