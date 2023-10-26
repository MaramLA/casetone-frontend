const Reviews = () => {
  return (
    <section className="reviews">
      <h2 className="section-title">Reviews</h2>
      <div className="main-section">
        <div className="rate-div">
          <i className="fa-solid fa-star rate-icon"></i>
          <p className="rating-value">4.67</p>
        </div>
        <div className="reviews-div">
          <div className="review">
            <p className="review__rating">4/5</p>
            <p className="review__username">Ali Sameh</p>
            <p className="review__content">I love my new case</p>
          </div>
          <div className="review">
            <p className="review__rating">5/5</p>
            <p className="review__username">Najwa Ahmed</p>
            <p className="review__content">Thank you! I had very smooth shopping experience</p>
          </div>
          <div className="review">
            <p className="review__rating">5/5</p>
            <p className="review__username">May Essa</p>
            <p className="review__content">
              High quality cases and I plan to purchase more cases soon!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
