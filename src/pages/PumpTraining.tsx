import { ArrowRight, Cable, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProviderAccessCallout from "../components/ProviderAccessCallout";
import { bookingUrl } from "../lib/booking";
import "../locales/servicePages";

type PumpProduct = {
  name: string;
  desc: string;
  image: string;
  tags: string[];
  sourceUrl: string;
};

type PumpBrand = {
  brand: string;
  summary: string;
  products: PumpProduct[];
};

export default function PumpTraining() {
  const { t } = useTranslation("servicePages");
  const pumpBrandsRaw = t("pumpTraining.pumpBrands", { returnObjects: true }) as PumpBrand[];
  const brandOrder = ["Omnipod", "twiist", "Beta Bionics", "Tandem Diabetes Care", "MiniMed", "CeQur"];
  const pumpBrands = [...pumpBrandsRaw]
    .map((brand) => ({
      ...brand,
      products: brand.products.filter((product) => product.name !== "MiniMed Flex"),
    }))
    .filter((brand) => brand.products.length > 0)
    .sort((a, b) => {
      const aIndex = brandOrder.indexOf(a.brand);
      const bIndex = brandOrder.indexOf(b.brand);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });
  const expectations = t("pumpTraining.expectations", { returnObjects: true }) as string[];

  return (
    <div className="bg-white">
      <div className="bg-[var(--color-brand-pink-light)]/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Cable className="w-16 h-16 text-[var(--color-brand-pink)] mx-auto mb-6" />
          <div className="mb-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-pink)] shadow-sm border border-[var(--color-brand-pink)]/20">
            <span>{t("pumpTraining.heroBadges.free")}</span>
            <span className="text-gray-300">|</span>
            <span>{t("pumpTraining.heroBadges.noInsurance")}</span>
            <span className="text-gray-300">|</span>
            <span>{t("pumpTraining.heroBadges.noReferral")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("pumpTraining.heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("pumpTraining.heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-brand-pink)] mb-3">
              {t("pumpTraining.catalogEyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("pumpTraining.catalogTitle")}
            </h2>
            <p className="text-gray-600">
              {t("pumpTraining.catalogSubtitle")}
            </p>
          </div>

          {pumpBrands.map((brand) => (
            <section key={brand.brand} className="mb-12 last:mb-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{brand.brand}</h3>
                  <p className="text-gray-600 max-w-3xl">{brand.summary}</p>
                </div>
                <span className="text-sm font-semibold text-gray-500">
                  {brand.products.length} {brand.products.length === 1 ? t("pumpTraining.productLabel") : t("pumpTraining.productsLabel")}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brand.products.map((product) => (
                  <article
                    key={`${brand.brand}-${product.name}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden hover:-translate-y-1 transition-transform"
                  >
                    <div className="aspect-[4/3] p-6 flex items-center justify-center">
                      <img
                        src={`${import.meta.env.BASE_URL}${product.image}`}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag) => (
                          <span key={tag} className="bg-[var(--color-brand-pink-light)] text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h4>
                      <p className="text-base text-gray-600 mb-5">{product.desc}</p>
                      <a
                        href={product.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-purple)] hover:text-[var(--color-brand-pink)]"
                      >
                        {t("pumpTraining.sourceLink")} <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1">
             <h2 className="text-3xl font-bold mb-6">{t("pumpTraining.expectTitle")}</h2>
             <ul className="space-y-4 mb-8">
               {expectations.map((expectation) => (
                 <li key={expectation} className="flex items-start">
                   <Check className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                   <span className="text-lg text-gray-700">{expectation}</span>
                 </li>
               ))}
             </ul>
           </div>
           <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-4">{t("pumpTraining.needTitle")}</h3>
              <p className="text-gray-600 mb-8">{t("pumpTraining.needBody")}</p>
              <a href={bookingUrl} className="flex items-center justify-center gap-2 bg-[var(--color-brand-pink)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-brand-pink)]/90 transition-all w-full">
                {t("pumpTraining.scheduleButton")} <ArrowRight className="w-5 h-5" />
              </a>
           </div>
        </div>

        <div className="mt-12">
          <ProviderAccessCallout tone="pink" />
        </div>
      </div>
    </div>
  );
}
