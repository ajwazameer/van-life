import clsx from "clsx";
import { useState, useEffect } from "react";
export default function Vans() {
  const [vansList, setVanList] = useState([]);
  console.log(vansList);
  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVanList(data.vans));
  }, []);

  const vans = vansList.map((van) => {
    return (
      <div>
        <img src={van.imageUrl} alt="van-image"></img>
        <div>
          <span className="vans-attr">{van.name}</span>
          <span className="vans-attr">
            {van.price}$<span>/day</span>
          </span>
        </div>
        <span
          className={clsx("vans-type", {
            luxury: "luxury" === van.type,
            rugged: "rugged" === van.type,
          })}
        >
          {van.type.charAt(0).toUpperCase() + van.type.slice(1).toLowerCase()}
        </span>
      </div>
    );
  });

  return (
    <section className="vans-section">
      <header>
        <h1>Explore our van options</h1>
        <div className="filter-section">
          <div className="filter-buttons">
            <span>Simple</span>
            <span>Luxury</span>
            <span>Rugged</span>
          </div>
          <button>Clear Filters</button>
        </div>
      </header>

      <section className="vans-catalog">{vans}</section>
    </section>
  );
}
