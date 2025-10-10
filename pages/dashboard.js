import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Proteksi route: kalau tidak ada access_token, redirect ke login
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      const res = await fetch("http://185.14.92.144:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // ✅ Tambahkan Bearer Token di sini
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (res.ok) {
        console.log("✅ Logout berhasil");
        localStorage.clear();
        router.push("/");
      } else {
        // ✅ Kalau error, gunakan res.text() agar tidak error jika backend kosong
        const text = await res.text();
        console.error("❌ Logout gagal:", res.status, text);
        alert(`Gagal logout (${res.status}). Silakan coba lagi.`);
      }
    } catch (error) {
      console.error("⚠️ Terjadi kesalahan saat logout:", error);
      alert("Terjadi kesalahan saat logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>🏠 Dashboard</h1>
        <p>Selamat datang! Anda berhasil login.</p>

        <button
          onClick={handleLogout}
          disabled={loading}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
