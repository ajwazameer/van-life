import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  NavLink,
  useLoaderData,
} from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
  return getVans();
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const typeFilter = searchParams.get("type");
  const vansList = useLoaderData();

  const filteredList = typeFilter
    ? vansList.filter((van) => van.type.toLowerCase() === typeFilter)
    : vansList;
  const vans = filteredList.map((van) => {
    return (
      <div key={van.id} className="vans-tile">
        <Link to={van.id} state={{ search: searchParams.toString() }}>
          <img
            className="vans-tile-img"
            src={van.imageUrl}
            alt="van-image"
          ></img>
          <div className="vans-tile-attr">
            <span className="vans-attr">{van.name}</span>
            <span className="vans-attr">
              {van.price}$<span>/day</span>
            </span>
          </div>
          <span
            className={clsx("vans-type", {
              simple: "simple" === van.type,
              luxury: "luxury" === van.type,
              rugged: "rugged" === van.type,
            })}
          >
            {van.type.charAt(0).toUpperCase() + van.type.slice(1).toLowerCase()}
          </span>
        </Link>
      </div>
    );
  });
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <section className="vans-section">
      <header>
        <h1>Explore our van options</h1>
        <div className="filter-section">
          <div className="filter-buttons">
            <button
              onClick={() => setSearchParams({ type: "simple" })}
              className={`vans-type sim ${typeFilter === "simple" ? "simple" : ""}`}
            >
              <span>Simple</span>
            </button>
            <button
              onClick={() => setSearchParams({ type: "rugged" })}
              className={`vans-type rugg ${typeFilter === "rugged" ? "rugged" : ""}`}
            >
              <span>Rugged</span>
            </button>
            <button
              onClick={() => setSearchParams({ type: "luxury" })}
              className={`vans-type lux ${typeFilter === "luxury" ? "luxury" : ""}`}
            >
              <span>Luxury</span>
            </button>
          </div>
          {typeFilter && (
            <button onClick={() => setSearchParams({})}>
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </header>

      <section className="vans-catalog">{vans}</section>
    </section>
  );
}
