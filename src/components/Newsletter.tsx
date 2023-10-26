const Newsletter = () => {
  return (
    <section className="newsletter-subscription">
      <h2 className="section-title">Newsletter</h2>
      <p className="content">
        Subscribe to Casetone newsletter and be the first to know
        <br />
        about our new arrivals!
      </p>
      {/* Subscription form  */}
      <form className="subscription-form" id="subscription-form" action="">
        <label className="email-label" htmlFor="email-textbox" id="email-label">
          Email Address
        </label>
        <input
          type="email"
          className="email-textbox"
          id="email-textbox"
          placeholder="example@gmail.com"
        />
        <button type="submit" className="form-submit-btn" id="form-submit-btn">
          Subscribe
        </button>
      </form>
    </section>
  )
}

export default Newsletter
