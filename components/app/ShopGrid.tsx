"use client";

import Image from "next/image";
import { useState } from "react";
import { Cart, Check } from "@/components/Icons";
import { products } from "@/lib/data";

export default function ShopGrid() {
  const [added, setAdded] = useState<string[]>([]);

  return (
    <>
      <div className="shop-note">
        <span>
          <Cart size={15} /> Savatda {added.length} ta mahsulot
        </span>
        <span>Yetkazib berish: Toshkent bo&apos;ylab 1–2 kun</span>
      </div>

      <div className="course-grid shop-grid">
        {products.map((product) => {
          const inCart = added.includes(product.id);
          return (
            <article className="app-course-card shop-card" key={product.id}>
              <div className="app-course-cover shop-cover">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 700px) 92vw, 340px"
                  style={{ objectFit: "cover" }}
                />
                <span className="app-course-badge">{product.kicker}</span>
              </div>
              <div className="app-course-body">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="shop-price">
                  {product.price} <span>so&apos;m</span>
                </div>
                <button
                  type="button"
                  className={`btn btn-sm shop-btn${inCart ? " is-added" : ""}`}
                  onClick={() =>
                    setAdded((current) =>
                      current.includes(product.id)
                        ? current.filter((id) => id !== product.id)
                        : [...current, product.id]
                    )
                  }
                >
                  {inCart ? <Check size={14} /> : <Cart size={14} />}
                  {inCart ? "Savatda" : "Savatga qo'shish"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
