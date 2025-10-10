import { useEffect } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

// ✅ Import semua CSS seperti sebelumnya
import '@/styles/assets/css/bootstrap.min.css'
import '@/styles/assets/css/bootstrap-extended.css'
import '@/styles/assets/css/pace.min.css'
import '@/styles/sass/main.css'
import '@/styles/sass/dark-theme.css'
import '@/styles/sass/blue-theme.css'
import '@/styles/sass/responsive.css'
import '@/styles/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css'
import '@/styles/assets/plugins/metismenu/metisMenu.min.css'
import '@/styles/assets/plugins/metismenu/mm-vertical.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const protectedRoutes = ["/dashboard"];
    const token = localStorage.getItem("access_token");

    // ⏰ Cek token expired atau tidak
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // decoded.exp = waktu kadaluarsa dalam detik → kita ubah ke milidetik
        if (decoded.exp * 1000 < Date.now()) {
          console.log("⚠️ Token expired, auto logout");
          localStorage.clear();
          router.push("/");
        }
      } catch (e) {
        console.log("⚠️ Token tidak valid, auto logout");
        localStorage.clear();
        router.push("/");
      }
    }

    // 🔐 Proteksi route
    if (protectedRoutes.includes(router.pathname) && !token) {
      router.push("/");
    }

    // ⏩ Kalau user sudah login dan buka halaman login (/), redirect ke dashboard
    if (router.pathname === "/" && token) {
      router.push("/dashboard");
    }

  }, [router]);

  return <Component {...pageProps} />;
}
