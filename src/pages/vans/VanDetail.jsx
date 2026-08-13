import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function VanDetail() {
  const [van, setVan] = useState(null);
  const location = useLocation();
  const searchParams = location.state?.search || "";

  const params = useParams();
  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);
  return (
    <div className="van-detail-container">
      {van ? (
        <>
          <Link
            to={`..?${searchParams}`}
            relative="path"
            className="back-button"
          >
            &larr;{" "}
            <span>
              {searchParams
                ? `Back to ${searchParams.split("=")[1]} vans`
                : `Back to all vans`}
            </span>
          </Link>
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
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
