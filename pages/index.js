import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset error

    try {
      const res = await fetch("http://185.14.92.144:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("RESPON LOGIN:", data);

      if (res.ok) {
        console.log("TOKEN DARI BACKEND:", data.access_token);
        console.log("REFRESH TOKEN DARI BACKEND:", data.refresh_token);

        // ✅ Simpan token ke localStorage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("user_id", data.id);

        // 💤 beri sedikit jeda agar token benar-benar tersimpan
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        setErrorMessage(data.error || "Login gagal. Coba lagi.");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      setErrorMessage("Terjadi kesalahan koneksi ke server.");
    }
  };

  return (
    <div className="section-authentication-cover">
      <div className="">
        <div className="row g-0">
          {/* Left side */}
          <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex border-end bg-transparent">
            <div className="card rounded-0 mb-0 border-0 shadow-none bg-transparent bg-none">
              <div className="card-body">
                <img
                  src="/assets/images/auth/login1.png"
                  className="img-fluid auth-img-cover-login"
                  width="650"
                  alt="login cover"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center border-top border-4 border-primary border-gradient-1">
            <div className="card rounded-0 m-3 mb-0 border-0 shadow-none bg-none">
              <div className="card-body p-sm-5">
                <img
                  src="/assets/images/logo-kloosing.jpeg"
                  className="mb-4"
                  width="145"
                  alt="logo"
                />
                <h4 className="fw-bold">Login</h4>
                <p className="mb-0">
                  Masukkan kredensial Anda untuk masuk ke akun Anda
                </p>

                {/* ⚠️ Notifikasi Error */}
                {errorMessage && (
                  <div className="alert alert-danger border-0 bg-grd-danger alert-dismissible fade show mt-3">
                    <div className="d-flex align-items-center">
                      <div className="font-35 text-white">
                        <span className="material-icons-outlined fs-2">
                          report_gmailerrorred
                        </span>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 text-white">Error</h6>
                        <div className="text-white">{errorMessage}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <div className="form-body mt-4">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label htmlFor="inputEmailAddress" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmailAddress"
                        placeholder="jhon@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputChoosePassword" className="form-label">
                        Password
                      </label>
                      <div className="input-group" id="show_hide_password">
                        <input
                          type="password"
                          className="form-control"
                          id="inputChoosePassword"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <a href="#" className="input-group-text bg-transparent">
                          <i className="bi bi-eye-slash-fill"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <Link href="auth-cover-forgot-password.html">
                        Forgot Password ?
                      </Link>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button type="submit" className="btn btn-grd-info">
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="text-start">
                        <p className="mb-0">
                          Don't have an account yet?{" "}
                          <Link href="/register">Sign up here</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
