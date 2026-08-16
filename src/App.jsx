import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansPageLoader } from "./pages/vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail";
import Dashboard, {
  loader as hostDashboardLoader,
} from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/host/HostVanDetail";
import HostVans, { loader as hostVanLoader } from "./pages/host/HostVans";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanPricing from "./pages/host/HostVanPricing";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import { requireAuth } from "./utils";
import "./App.css";
import "/server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansPageLoader}
        errorElement={<Error />}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
        errorElement={<Error />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={hostDashboardLoader} />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => {
            return await requireAuth(request);
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => {
            return await requireAuth(request);
          }}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVanLoader}
          errorElement={<Error />}
        />

        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => {
              return await requireAuth(request);
            }}
          />
          <Route
            path="pricing"
            element={
              <HostVanPricing
                loader={async ({ request }) => {
                  return await requireAuth(request);
                }}
              />
            }
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => {
              return await requireAuth(request);
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
export default function App() {
  return <RouterProvider router={router} />;
}
