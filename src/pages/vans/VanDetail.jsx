import {
  useParams,
  Link,
  useLocation,
  useLoaderData,
  Await,
} from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { getVans } from "../../api";

export function loader({ params }) {
  return { van: getVans(params.id) };
}
export default function VanDetail() {
  // const params = useParams();
  const location = useLocation();
  const searchParams = location.state?.search || "";
  const data = useLoaderData();

  function renderVan(van) {
    return (
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    );
  }
  return (
    <div className="van-detail-container">
      <Link to={`..?${searchParams}`} relative="path" className="back-button">
        &larr;{" "}
        <span>
          {searchParams
            ? `Back to ${searchParams.split("=")[1]} vans`
            : `Back to all vans`}
        </span>
      </Link>
      <Suspense fallback={<h2>Loading van....</h2>}>
        <Await resolve={data.van}>{renderVan}</Await>
      </Suspense>
    </div>
  );
}
