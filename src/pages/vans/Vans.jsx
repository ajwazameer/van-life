import clsx from "clsx";
import { useState, useEffect, Suspense } from "react";
import {
  Link,
  useSearchParams,
  NavLink,
  useLoaderData,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
  const vansPromise = getVans();
  return { vansList: vansPromise };
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const dataPromise = useLoaderData();

  function renderVansList(vansList) {
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
              {van.type.charAt(0).toUpperCase() +
                van.type.slice(1).toLowerCase()}
            </span>
          </Link>
        </div>
      );
    });

    return (
      <>
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
      </>
    );
  }

  return (
    <section className="vans-section">
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vansList}>{renderVansList}</Await>
      </Suspense>
    </section>
  );
}
