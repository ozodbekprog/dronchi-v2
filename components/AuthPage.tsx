"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DEMO_ACCOUNT,
  DEMO_DEFAULT_TARIFF,
  clearDemoSession,
  readDemoSession,
  saveDemoSession,
  type DemoSession,
} from "@/lib/demo";
import { tariffs } from "@/lib/data";
import Logo from "./Logo";
import { ArrowUpRight, CheckCircle, ChevronLeft, Eye, EyeOff, User } from "./Icons";

type Mode = "login" | "register";

type AuthPageProps = {
  mode: Mode;
  plan?: string;
  next?: string;
};

type Errors = Record<string, string>;

export default function AuthPage({ mode, plan, next }: AuthPageProps) {
  const router = useRouter();
  const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/kabinet";
  const isRegister = mode === "register";
  const demoPlanName =
    tariffs.find((item) => item.id === DEMO_DEFAULT_TARIFF)?.name ?? "Qo'llab-quvvatlash";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [demoUser, setDemoUser] = useState<DemoSession | null>(null);
  const activePlanName =
    tariffs.find((item) => item.id === (demoUser?.tariff ?? DEMO_DEFAULT_TARIFF))?.name ??
    demoPlanName;

  useEffect(() => {
    if (mode !== "login") return;
    const saved = readDemoSession();
    if (saved) {
      setDemoUser(saved);
      router.replace(target);
    }
  }, [mode, router, target]);

  const demoLogin = () => {
    if (busy) return;
    setErrors({});
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDemoUser(saveDemoSession());
      router.replace(target);
    }, 500);
  };

  const logoutDemo = () => {
    clearDemoSession();
    setDemoUser(null);
    setSuccess(false);
    setErrors({});
  };

  const validate = (data: FormData) => {
    const next: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const confirm = String(data.get("confirm") ?? "");
    const terms = data.get("terms");

    if (isRegister && name.length < 3) next.name = "Ism va familiyani to'liq kiriting.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email manzilni to'g'ri kiriting.";
    if (password.length < 8) next.password = "Parol kamida 8 ta belgidan iborat bo'lsin.";
    if (isRegister) {
      if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        next.password = "Parolda harf va raqam bo'lishi kerak.";
      }
      if (confirm !== password) next.confirm = "Parollar mos kelmadi.";
      if (!terms) next.terms = "Davom etish uchun shartlarga rozilik bering.";
    }
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = validate(data);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const name = String(data.get("name") ?? "").trim();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDemoUser(
        saveDemoSession(DEMO_DEFAULT_TARIFF, {
          name: isRegister ? name : undefined,
          email,
        })
      );
      router.replace(target);
    }, 650);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <Image
          src="/images/auth-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="auth-shell">
        <div className="auth-top">
          <Logo />
          <Link href="/" className="auth-home">
            <ChevronLeft size={13} /> Bosh sahifa
          </Link>
        </div>

        <div className="auth-main">
          <div className="auth-copy">
            <div className="auth-breadcrumb">
              <Link href="/">Bosh sahifa</Link>
              <span>/</span>
              <b>{isRegister ? "Ro'yxatdan o'tish" : "Kirish"}</b>
            </div>
            <span className="auth-pill">
              <User size={12} /> Shaxsiy kabinet
            </span>
            <h1>
              {isRegister
                ? "O'quv jarayoningizni boshqarish uchun hisob yarating"
                : "Qaytib kelganingizdan xursandmiz!"}
            </h1>
            <p className="lead">
              {isRegister
                ? "Ro'yxatdan o'tganingizdan so'ng, kurslaringizni davom ettirishingiz, o'quv jarayonini boshqarishingiz va DRONCHI akademiyasining barcha imkoniyatlaridan foydalanishingiz mumkin bo'ladi."
                : "Email va parolingizni kiriting, kurslaringizni davom ettirib, o'quv jarayoningizni to'xtagan joyingizdan boshqarib borishingiz mumkin."}
            </p>

            <div className="auth-info">
              <span className="eyebrow">Dronchi akademiya</span>
              <h3>
                {isRegister
                  ? "Kurslaringizni davom ettirish uchun ro'yxatdan o'ting"
                  : "Kurslaringizni davom ettirish uchun kabinetga kiring"}
              </h3>
              <p>
                {isRegister
                  ? "O'quv jarayoningizni to'xtagan joyingizdan davom ettiring."
                  : "O'quv jarayonini to'xtagan joyingizdan davom ettiring va natijalaringizni kuzatib boring."}
              </p>
            </div>

            <div className="auth-chips">
              <span className="auth-chip">O&apos;quv jarayoni</span>
              <span className="auth-chip">Poligonlar</span>
              <span className="auth-chip">Tariflar</span>
            </div>
          </div>

          <div className="auth-card">
            <span className="auth-pill">
              <User size={12} /> Shaxsiy kabinet
            </span>
            {!success ? (
              <>
                <h2>{isRegister ? "Ro'yxatdan o'tish" : "Kirish"}</h2>
                <p className="auth-sub">
                  {isRegister
                    ? "Shaxsiy kabinet yarating. Kurslaringiz va o'quv jarayoningiz bir joyda bo'lsin."
                    : "Shaxsiy kabinetingizga kiring va kurslaringizni to'xtagan joyingizdan davom ettiring."}
                </p>

                {plan && isRegister && (
                  <p className="field-help" style={{ marginBottom: 14 }}>
                    Tanlangan tarif: <b style={{ color: "var(--primary)" }}>{plan}</b>. Tarif
                    hisob yaratilgandan so&apos;ng tasdiqlanadi.
                  </p>
                )}

                {!isRegister && (
                  <div className="demo-login">
                    <div className="demo-login-head">
                      <span className="demo-login-icon" aria-hidden="true">
                        <User size={16} />
                      </span>
                      <div>
                        <span className="demo-login-kicker">Demo hisob</span>
                        <b>Sinash uchun tayyor akkaunt</b>
                        <p>
                          {DEMO_ACCOUNT.email}{" "}
                          <span aria-hidden="true">·</span> {DEMO_ACCOUNT.password}
                        </p>
                        <span className="demo-login-plan">
                          <CheckCircle size={12} /> {demoPlanName} tarifi xarid qilingan
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-lime btn-wide"
                      onClick={demoLogin}
                      disabled={busy}
                    >
                      {busy ? "Kirilmoqda..." : "Avto kirish"}
                      {!busy && <ArrowUpRight size={15} />}
                    </button>
                  </div>
                )}

                <form onSubmit={onSubmit} noValidate>
                  {isRegister && (
                    <div className="field">
                      <label htmlFor="name">Ism va familiyangiz</label>
                      <input
                        id="name"
                        name="name"
                        className={`input${errors.name ? " invalid" : ""}`}
                        placeholder="Ism va familiyangizni kiriting"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <span className="field-error" id="name-error">
                          {errors.name}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="field">
                    <label htmlFor="email">Email manzilingiz</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`input${errors.email ? " invalid" : ""}`}
                      placeholder="siz@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span className="field-error" id="email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="password">Parol</label>
                    <div className="input-wrap">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`input has-icon${errors.password ? " invalid" : ""}`}
                        placeholder={isRegister ? "Parol yarating" : "Parolingizni kiriting"}
                        autoComplete={isRegister ? "new-password" : "current-password"}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                      <button
                        type="button"
                        className="input-icon"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="field-error" id="password-error">
                        {errors.password}
                      </span>
                    )}
                    {isRegister && !errors.password && (
                      <span className="field-help">
                        Kamida 8 ta belgi, katta va kichik harflar hamda raqam ishlating.
                      </span>
                    )}
                  </div>

                  {isRegister && (
                    <div className="field">
                      <label htmlFor="confirm">Parolni tasdiqlang</label>
                      <div className="input-wrap">
                        <input
                          id="confirm"
                          name="confirm"
                          type={showConfirm ? "text" : "password"}
                          className={`input has-icon${errors.confirm ? " invalid" : ""}`}
                          placeholder="Parolni qayta kiriting"
                          autoComplete="new-password"
                          aria-invalid={Boolean(errors.confirm)}
                          aria-describedby={errors.confirm ? "confirm-error" : undefined}
                        />
                        <button
                          type="button"
                          className="input-icon"
                          onClick={() => setShowConfirm((value) => !value)}
                          aria-label={showConfirm ? "Parolni yashirish" : "Parolni ko'rsatish"}
                        >
                          {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      {errors.confirm && (
                        <span className="field-error" id="confirm-error">
                          {errors.confirm}
                        </span>
                      )}
                    </div>
                  )}

                  {!isRegister && (
                    <div className="form-row-between">
                      <label className="check-row">
                        <input type="checkbox" name="remember" /> Meni eslab qolish
                      </label>
                      <a className="form-link" href="mailto:info@dronchi.uz?subject=Parolni%20tiklash">
                        Parolni unutdingizmi?
                      </a>
                    </div>
                  )}

                  {isRegister && (
                    <div className="field" style={{ marginTop: 18 }}>
                      <label className="check-row" htmlFor="terms">
                        <input type="checkbox" id="terms" name="terms" />
                        <span>
                          <a href="#shartlar">Foydalanish shartlari</a> va{" "}
                          <a href="#maxfiylik">Maxfiylik siyosati</a> bilan tanishdim va ularga
                          roziman.
                        </span>
                      </label>
                      {errors.terms && <span className="field-error">{errors.terms}</span>}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-wide" disabled={busy}>
                    {busy ? "Tekshirilmoqda..." : isRegister ? "Ro'yxatdan o'tish" : "Kirish"}{" "}
                    {!busy && <ArrowUpRight size={15} />}
                  </button>
                </form>

                <p className="auth-switch">
                  {isRegister ? "Hisobingiz bormi? " : "Hali hisobingiz yo'qmi? "}
                  <Link href={isRegister ? "/kirish" : "/royxatdan-otish"}>
                    {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
                  </Link>
                </p>
                <p className="auth-help">
                  Yordam kerakmi? <a href="mailto:info@dronchi.uz">Bog&apos;lanish ↗</a>
                </p>
              </>
            ) : (
              <div style={{ padding: "10px 0 4px" }}>
                <div className="form-success">
                  {isRegister
                    ? "Hisob yaratildi (demo). Endi tarifni tanlab, kursni boshlashingiz mumkin."
                    : demoUser
                      ? "Demo hisobga muvaffaqiyatli kirdingiz."
                      : "Hisobingizga muvaffaqiyatli kirdingiz (demo). Shaxsiy kabinet keyingi bosqichda ulanadi."}
                </div>
                {demoUser && (
                  <div className="demo-account">
                    <span className="demo-account-avatar" aria-hidden="true">
                      <User size={18} />
                    </span>
                    <div>
                      <b>{demoUser.name}</b>
                      <span className="demo-account-email">{demoUser.email}</span>
                    </div>
                    <span className="demo-account-badge">Demo</span>
                  </div>
                )}
                {demoUser && (
                  <div className="demo-course">
                    <span className="demo-course-icon" aria-hidden="true">
                      <CheckCircle size={17} />
                    </span>
                    <div>
                      <span className="demo-course-kicker">Faol tarif</span>
                      <b>{activePlanName}</b>
                      <p>FPV asoslari kursi ochilgan · qayta xarid shart emas</p>
                    </div>
                    <span className="demo-course-status">Xarid qilingan</span>
                  </div>
                )}
                <h2>
                  {isRegister ? "Tayyormisiz?" : demoUser ? "Xush kelibsiz, Demo!" : "Xush kelibsiz!"}
                </h2>
                <p className="auth-sub">
                  {demoUser
                    ? "Demo hisobingizda kurs allaqachon ochilgan — to'lov talab qilinmaydi. Darslarni hoziroq davom ettirishingiz mumkin."
                    : "Bu namunaviy oqim: real autentifikatsiya va shaxsiy kabinet keyingi bosqichda platformaga ulanadi."}
                </p>
                <Link
                  href={isRegister ? "/tariflar" : demoUser ? "/akademiya/fpv-asoslari" : "/akademiya"}
                  className="btn btn-primary btn-wide"
                >
                  {isRegister ? "Tarifni tanlash" : demoUser ? "Kursni boshlash" : "Kurslarni ko'rish"}{" "}
                  <ArrowUpRight size={15} />
                </Link>
                <p className="auth-switch">
                  {demoUser ? (
                    <button
                      type="button"
                      onClick={logoutDemo}
                      style={{ background: "none", border: 0, color: "var(--primary)", fontWeight: 800, cursor: "pointer", padding: 0 }}
                    >
                      Hisobdan chiqish
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      style={{ background: "none", border: 0, color: "var(--primary)", fontWeight: 800, cursor: "pointer", padding: 0 }}
                    >
                      Formaga qaytish
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="auth-footer">
          © 2026 DRONCHI · Namunaviy interfeys. Shaxsiy ma&apos;lumotlaringizni himoya qilamiz.
        </p>
      </div>
    </div>
  );
}
