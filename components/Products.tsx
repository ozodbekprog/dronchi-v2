"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import Modal from "./Modal";
import { ArrowUpRight, Cart, Check, LogoMark } from "./Icons";

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [ordered, setOrdered] = useState(false);

  const close = () => {
    setSelected(null);
    window.setTimeout(() => setOrdered(false), 200);
  };

  return (
    <>
      <div className="products-grid">
        {products.map((product) => (
          <article key={product.id} className={`product-card${product.highlight ? " is-highlight" : ""}`}>
            <div className="product-photo">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 390px"
                style={{ objectFit: "cover" }}
              />
              <span className="product-logo" aria-hidden="true">
                <LogoMark size={16} />
              </span>
            </div>
            <div className="product-body">
              <span className="product-kicker">{product.kicker}</span>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="product-bottom">
                <span className="product-price">
                  {product.price} <small>so&apos;m</small>
                </span>
                <button
                  type="button"
                  className="product-buy"
                  onClick={() => {
                    setSelected(product);
                    setOrdered(false);
                  }}
                >
                  <Cart size={14} /> Sotib olish
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal open={Boolean(selected)} onClose={close} titleId="product-dialog-title">
        {selected && !ordered && (
          <>
            <div className="modal-head" style={{ marginBottom: 10 }}>
              <div>
                <span className="product-kicker">{selected.kicker}</span>
                <h3 id="product-dialog-title" style={{ fontSize: 26 }}>
                  {selected.title}
                </h3>
              </div>
            </div>
            <p>{selected.description}</p>
            <div className="summary-lines" style={{ paddingTop: 0 }}>
              <div className="summary-line">
                <span>Mahsulot narxi</span>
                <b>{selected.price} so&apos;m</b>
              </div>
              <div className="summary-line">
                <span>Yetkazib berish</span>
                <b>Kelishiladi</b>
              </div>
              <div className="summary-line">
                <span>Mavjudlik</span>
                <b>Buyurtma asosida</b>
              </div>
            </div>
            <div className="summary-total">
              <span>Jami</span>
              <b>
                {selected.price} <small>so&apos;m</small>
              </b>
            </div>
            <p className="summary-disclaimer" style={{ marginTop: 0 }}>
              Bu namunaviy do&apos;kon. Buyurtma tugmasini bosish demo oqimni ishga tushiradi — real
              to&apos;lov keyingi bosqichda ulanadi.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setOrdered(true)}>
                Buyurtma berish <ArrowUpRight size={15} />
              </button>
              <button type="button" className="btn btn-outline" onClick={close}>
                Bekor qilish
              </button>
            </div>
          </>
        )}

        {selected && ordered && (
          <div className="modal-success">
            <span className="success-icon">
              <Check size={26} />
            </span>
            <h3>Buyurtma qabul qilindi</h3>
            <p>
              {selected.title} uchun demo buyurtma yaratildi. Operatorimiz aloqa uchun bog&apos;lanadi.
            </p>
            <div className="modal-actions" style={{ justifyContent: "center" }}>
              <Link href="/akademiya" className="btn btn-primary" onClick={close}>
                Kurslarga o&apos;tish <ArrowUpRight size={15} />
              </Link>
              <button type="button" className="btn btn-outline" onClick={close}>
                Yopish
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
