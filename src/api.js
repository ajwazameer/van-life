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
export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
