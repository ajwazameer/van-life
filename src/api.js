export async function getVans(id) {
  const response = id
    ? await fetch(`/api/vans/${id}`)
    : await fetch("/api/vans");
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await response.json();
  return data.vans;
}
export async function getHostVans(id) {
  const response = id
    ? await fetch(`/api/host/vans/${id}`)
    : await fetch("/api/host/vans");
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await response.json();
  return data.vans;
}
