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

    console.log("TOKEN DI _app.js:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("DECODED TOKEN:", decoded);

        // Cek expired
        if (decoded.exp * 1000 < Date.now()) {
          console.log("⚠️ Token expired, auto logout");
          localStorage.clear();
          router.push("/");
        }
      } catch (e) {
        console.log("⚠️ Token tidak valid saat decode");
        if (protectedRoutes.includes(router.pathname)) {
          localStorage.clear();
          router.push("/");
        }
      }
    }

    // Proteksi route jika belum login
    if (protectedRoutes.includes(router.pathname) && !token) {
      router.push("/");
    }

    // Kalau sudah login dan buka "/", langsung ke dashboard
    if (router.pathname === "/" && token) {
      router.push("/dashboard");
    }

  }, [router]);

  return <Component {...pageProps} />;
}
