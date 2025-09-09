export default function Home() {
  return (
    <div className="section-authentication-cover">
      <div className="">
        <div className="row g-0">

          {/* left side */}
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

          {/* right side */}
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
                <p className="mb-0">Masukkan kredensial Anda untuk masuk ke akun Anda</p>

                {/* <div className="row g-3 my-4">
                  <div className="col-12 col-lg-6">
                    <button className="btn btn-light py-2 font-text1 fw-bold d-flex align-items-center justify-content-center w-100">
                      <img src="/assets/images/apps/05.png" width="20" className="me-2" alt="" />
                      Google
                    </button>
                  </div>
                  <div className="col col-lg-6">
                    <button className="btn btn-light py-2 font-text1 fw-bold d-flex align-items-center justify-content-center w-100">
                      <img src="/assets/images/apps/17.png" width="20" className="me-2" alt="" />
                      Facebook
                    </button>
                  </div>
                </div> */}

                {/* <div className="separator section-padding">
                  <div className="line"></div>
                  <p className="mb-0 fw-bold">OR</p>
                  <div className="line"></div>
                </div> */}

                <div className="form-body mt-4">
                  <form className="row g-3">
                    <div className="col-12">
                      <label htmlFor="inputEmailAddress" className="form-label">Email</label>
                      <input type="email" className="form-control" id="inputEmailAddress" placeholder="jhon@example.com" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputChoosePassword" className="form-label">Password</label>
                      <div className="input-group" id="show_hide_password">
                        <input type="password" className="form-control" id="inputChoosePassword" defaultValue="12345678" placeholder="Enter Password" />
                        <a href="#" className="input-group-text bg-transparent">
                          <i className="bi bi-eye-slash-fill"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Remember Me</label>
                      </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <a href="auth-cover-forgot-password.html">Forgot Password ?</a>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button type="submit" className="btn btn-grd-info">Login</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="text-start">
                        <p className="mb-0">
                          Don't have an account yet? <a href="/register">Sign up here</a>
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
  )
}
