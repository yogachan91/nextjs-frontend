import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Verify() {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  // status = { success: boolean, message: string }

  useEffect(() => {
    if (!router.isReady) return; // pastikan router siap dulu

    // jika token tidak ada atau kosong, redirect ke halaman utama
    if (!token || token.trim() === "") {
      router.replace("/");
      return;
    }

    // jika token ada, kirim GET request ke backend aktivasi
    const fetchActivation = async () => {
      try {
        const res = await fetch(`http://185.14.92.144:8080/api/auth/aktivasi-user/${token}`);
        const data = await res.json();

        if (res.ok) {
          // Berhasil aktivasi
          setStatus({
            success: true,
            message: data.message || "Akun sudah aktif.",
          });
        } else {
          // Gagal aktivasi
          setStatus({
            success: false,
            message: data.error || "Terjadi kesalahan.",
          });
        }
      } catch (err) {
        setStatus({
          success: false,
          message: "Gagal menghubungi server.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivation();
  }, [router.isReady, token, router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Memproses aktivasi akun...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 bg-error" style={{ minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="col-lg-12">
            <div className="text-center error-pages">
              {status?.success ? (
                <>
                  <h1 className="error-title text-success mb-3">✔</h1>
                  <h2 className="error-sub-title fw-bold">Akun Sudah Aktif</h2>
                  <p className="error-message mb-0 text-uppercase">{status.message}</p>
                </>
              ) : (
                <>
                  <h1 className="error-title text-danger mb-3">✖</h1>
                  <h2 className="error-sub-title fw-bold">Warning</h2>
                  <p className="error-message mb-0 text-uppercase">{status?.message}</p>
                </>
              )}

              <div className="mt-4 d-flex align-items-center justify-content-center gap-3">
                <Link href="/" className="btn btn-grd-info rounded-5 px-4">
                  <i className="bi bi-house-fill me-2"></i>Go To Login
                </Link>
              </div>

              <div className="mt-4">
                <p className="mb-0">Copyright © 2025 | All rights reserved.</p>
              </div>
              <hr className="border-light border-2" />
              <div className="list-inline contacts-social mt-4">
                <Link href="#" className="list-inline-item bg-facebook text-white border-0">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link href="#" className="list-inline-item bg-whatsapp text-white border-0">
                  <i className="bi bi-whatsapp"></i>
                </Link>
                <Link href="#" className="list-inline-item bg-linkedin text-white border-0">
                  <i className="bi bi-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
