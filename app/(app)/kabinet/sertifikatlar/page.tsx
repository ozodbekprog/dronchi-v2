import type { Metadata } from "next";
import { Award, Check, Sparkle } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import CertificateActions from "@/components/app/CertificateActions";
import { CERTIFICATES } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Sertifikatlar",
};

export default function CertificatesPage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Sertifikatlar"
          text="Kursni tugatgach sertifikat avtomatik beriladi. Kod orqali haqiqiyligini tekshirish mumkin."
          action={<span className="page-badge">1 ta sertifikat</span>}
        />

        <div className="cert-grid">
          {CERTIFICATES.map((certificate) => (
            <article
              className={`cert-card cert-card--${certificate.status}`}
              key={certificate.id}
            >
              <div className="cert-top">
                <span className="cert-logo">
                  <Award size={22} />
                </span>
                <span className="cert-status">
                  {certificate.status === "earned" ? (
                    <>
                      <Check size={12} /> Berilgan
                    </>
                  ) : (
                    <>
                      <Sparkle size={12} /> Jarayonda
                    </>
                  )}
                </span>
              </div>

              <div className="cert-body">
                <span>DRONCHI ACADEMY</span>
                <h2>{certificate.title}</h2>
                <p>{certificate.hours}</p>
                <div className="cert-owner">
                  <span className="app-avatar">AK</span>
                  <div>
                    <strong>Aziz Karimov</strong>
                    <em>{certificate.code}</em>
                  </div>
                </div>
              </div>

              <div className="cert-foot">
                <span>{certificate.date}</span>
                <CertificateActions
                  status={certificate.status}
                  code={certificate.code}
                />
              </div>
            </article>
          ))}
        </div>

        <section className="dash-card cert-info">
          <div className="dash-card-head">
            <h2>Sertifikatni tekshirish</h2>
            <Award size={17} />
          </div>
          <p>
            Har bir sertifikatda unikal kod bor. Kodni <b>dronchi.uz/tekshirish</b> sahifasiga
            kiritib, sertifikat haqiqiyligini istalgan vaqtda tasdiqlash mumkin.
          </p>
          <div className="cert-code-row">
            <code>DRN-FPV-2026-0142</code>
            <span className="dash-chip dash-chip--lime">Faol</span>
          </div>
        </section>
      </div>
    </div>
  );
}
