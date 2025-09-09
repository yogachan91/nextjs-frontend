import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NotifSuccessRegister() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setMounted(true); // tandai sudah client-side
  }, []);

  useEffect(() => {
    if (!mounted) return; // jangan jalan sebelum mounted

    const flag = sessionStorage.getItem("registerFlag");

    if (flag) {
      try {
        const parsed = JSON.parse(flag);
        if (parsed.from === "register") {
          setValid(true);
          sessionStorage.removeItem("registerFlag"); // habis dipakai, hapus
        } else {
          router.replace("/");
        }
      } catch {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [mounted, router]);

  if (!mounted || !valid) return null; // cegah render sebelum cek selesai

  return (
    <div className="pt-5 bg-error" style={{ minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="col-lg-12">
            <div className="text-center error-pages">
              <h1 className="error-title text-success mb-3">✔</h1>
              <h2 className="error-sub-title fw-bold">Register Berhasil!</h2>
              <p className="error-message mb-0 text-uppercase">
                Silahkan check di email anda, untuk aktivasi akun.
              </p>

              <div className="mt-4 d-flex align-items-center justify-content-center gap-3">
                <a href="/" className="btn btn-grd-info rounded-5 px-4">
                  <i className="bi bi-house-fill me-2"></i>Go To Login
                </a>
              </div>

              <div className="mt-4">
                <p className="mb-0">Copyright © 2025 | All rights reserved.</p>
              </div>
              <hr className="border-light border-2" />
              <div className="list-inline contacts-social mt-4">
                <a href="#" className="list-inline-item bg-facebook text-white border-0">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="list-inline-item bg-whatsapp text-white border-0">
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a href="#" className="list-inline-item bg-linkedin text-white border-0">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
