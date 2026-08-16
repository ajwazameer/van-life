import { useState, useEffect, Suspense } from "react";
import { Link, useLoaderData, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return { hostVans: getHostVans() };
}
export default function HostVans() {
  const data = useLoaderData();
  function renderHostVansList(hostVans) {
    const hostVansList = hostVans.map((van) => {
      return (
        <Link to={van.id} key={van.id} className="host-van-link-wrapper">
          <div className="host-van-single" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
            <div className="host-van-info">
              <h3>{van.name}</h3>
              <p>${van.price}/day</p>
            </div>
          </div>
        </Link>
      );
    });
    return <section>{hostVansList}</section>;
  }
  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading vans....</h2>}>
        <div className="host-vans-list">
          <Await resolve={data.hostVans}>{renderHostVansList}</Await>
        </div>
      </Suspense>
    </section>
  );
}
