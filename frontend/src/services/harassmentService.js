import { BASE_URL } from "../api/config";

const API_URL = `${BASE_URL}/harassment`;

export const submitReport = async (reportData) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(reportData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to submit report");
  return data;
};

export const fetchPublicReports = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
};