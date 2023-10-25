import userProfile from '../assets/userProfile.png'
import Footer from '../layout/Footer'
const UserProfile = () => {
  return (
    <div>
      <main>
        <section className="profile" id="profile">
          <div className="profile-container">
            {/* <h2 className="section-title">Sign Up</h2> */}
            <img src={userProfile} alt="user" />

            <form className="form">
              <div className="top-side">
                <div className="entry">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="formEmail"
                    name="firstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="formEmail"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="text"
                    id="formEmail"
                    className="formEmail"
                    name="formEmail"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="bottom-side">
                <button className="save-btn">Save</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default UserProfile
