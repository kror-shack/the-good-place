import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as PlateSvg } from "../../assets/svgs/plate.svg";
import { ReactComponent as ChefSvg } from "../../assets/svgs/chef.svg";
import { ReactComponent as DateSvg } from "../../assets/svgs/date.svg";
import { ReactComponent as DeliverySvg } from "../../assets/svgs/delivery.svg";
import { ReactComponent as PartySvg } from "../../assets/svgs/party.svg";
import { ReactComponent as PetsSvg } from "../../assets/svgs/pets.svg";

import React, { useState } from "react";
import DisplayReviews from "../../components/DisplayReviews/DisplayReviews";

const MainPage = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: string) => {
    setEmail(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <main className="Main-page">
      <Link to="/bookTable" className="book-table-link">
        BOOK YOUR TABLE
      </Link>
      <div className="first-block">
        <div>
          <p>TASTE AN UNFORGETTABLE EXPERIENCE</p>
          <h2>
            Where <span>Taste</span> Meets <span>Experience</span>
          </h2>
          <p className="sub-header">
            Culinary Artistry Redefined, A Symphony of Taste and Refinement,
            Embark on a Culinary Adventure Like No Other.
          </p>
          <Link to="/">Menu</Link>
        </div>
        <div>
          <img
            src={require(`../../assets/images/shayda-torabi-3iexvMShGfQ-unsplash 1(1).png`)}
            alt=""
          ></img>
        </div>
      </div>
      <div className="second-block">
        <p>
          Indulge in a feast for the senses at our exquisite restaurant. Immerse
          yourself in a culinary wonderland, where each dish is a masterpiece
          crafted with passion and precision.{" "}
        </p>
        <p>
          From delectable flavors to impeccable service, our establishment
          promises an unforgettable dining experience that will leave you
          craving for more.
        </p>
      </div>
      <div className="third-block">
        <div>
          <div>
            <p>Discover Your Taste!</p>
            <div>
              <p>
                Welcome to <span>The Good Place</span> Where Impeccable Quality
                Meets Unforgettable Taste.
              </p>
            </div>
          </div>
          <div>
            <div>
              <PlateSvg />
              <p>
                "Savor the Purity of Freshness, Where Clean and Vibrant
                Ingredients Shine."
              </p>
            </div>
            <div>
              <ChefSvg />
              <p className="chef-text">
                "Uncompromising quality, where every bite is a delectable
                masterpiece."
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={require(`../../assets/images/ronan-kruithof-x5NGqt2hdrE-unsplash 1(1).png`)}
            alt=""
          ></img>
        </div>
      </div>
      <div className="news-letter-container">
        <div>
          <h3>Sign Up For THE GOOD PLACE Newsletter</h3>
          <p>Keep up to date with our news and event updates</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email">Email:</label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter Your Email Address..."
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="services-container">
        <div>
          <DateSvg />
          <p>Reservations</p>
          <p className="service-description">Are Highly Recommended</p>
        </div>
        <div>
          <DeliverySvg />
          <p>Delivery</p>
          <p className="service-description">Free Food Delivery</p>
        </div>

        <div>
          <PartySvg />
          <p>Theme</p>
          <p className="service-description">For Your Special Cccasions</p>
        </div>
        <div>
          <PetsSvg />
          <p>Pets Allowed</p>
          <p className="service-description">For Your Furry Companions</p>
        </div>
      </div>
      <DisplayReviews />
    </main>
  );
};
export default MainPage;
