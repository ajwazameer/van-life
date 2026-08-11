import clsx from "clsx";
import { useState, useEffect } from "react";
import { Link, useSearchParams, NavLink } from "react-router-dom";
export default function Vans() {
  const [vansList, setVanList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVanList(data.vans));
  }, []);
  const filteredList = typeFilter
    ? vansList.filter((van) => van.type.toLowerCase() === typeFilter)
    : vansList;
  const vans = filteredList.map((van) => {
    return (
      <div key={van.id} className="vans-tile">
        <Link to={`/vans/${van.id}`}>
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

  return (
    <section className="vans-section">
      <header>
        <h1>Explore our van options</h1>
        <div className="filter-section">
          <div className="filter-buttons">
            <NavLink to="?type=simple" className="vans-type sim">
              <span>Simple</span>
            </NavLink>
            <NavLink to="?type=rugged" className="vans-type rugg">
              <span>Rugged</span>
            </NavLink>
            <NavLink to="?type=luxury" className="vans-type lux">
              <span>Luxury</span>
            </NavLink>
          </div>
          <Link to=".">
            <span>Clear Filters</span>
          </Link>
        </div>
      </header>

      <section className="vans-catalog">{vans}</section>
    </section>
  );
}
