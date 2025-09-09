import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch("http://185.14.92.144:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // simpan flag JSON supaya lebih aman
        sessionStorage.setItem(
          "registerFlag",
          JSON.stringify({ from: "register", timestamp: Date.now() })
        );
        router.push("/notif-success-register");
      } else {
        alert("Register gagal. Cek input atau server API.");
      }
    } catch (err) {
      console.error("Error register:", err);
      alert("Terjadi error saat register.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-3 mx-lg-0">
      <div className="card my-5 col-xl-9 col-xxl-8 mx-auto rounded-4 overflow-hidden border-3 p-4">
        <div className="row g-4">
          {/* Left Side */}
          <div className="col-lg-6 d-flex">
            <div className="card-body">
              <img src="/assets/images/logo-kloosing.jpeg" className="mb-4" width="145" alt="Logo" />
              <h4 className="fw-bold">Ayo Register Sekarang</h4>
              <p className="mb-0">Masukan data anda untuk membuat akun user</p>

              <div className="form-body mt-4">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label className="form-label">First Name</label>
                    <input type="text" name="first_name" className="form-control" placeholder="Enter First Name" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Last Name</label>
                    <input type="text" name="last_name" className="form-control" placeholder="Enter Last Name" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="example@user.com" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter Password" required />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-grd-info" disabled={loading}>
                        {loading ? "Processing..." : "Register"}
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-start">
                      <p className="mb-0">
                        Already have an account? <Link href="/">Sign in here</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 d-lg-flex d-none">
            <div className="p-3 rounded-4 w-100 d-flex align-items-center justify-content-center bg-grd-info">
              <img src="/assets/images/auth/register1.png" className="img-fluid" alt="Register" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
