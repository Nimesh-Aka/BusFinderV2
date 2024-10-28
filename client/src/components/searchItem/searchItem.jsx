import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <div className="siDesc">
        <h1 className="siTitle">{item.busName}</h1>
        <span className="siDistance">{item.route}- Route</span>
        <span className="siTaxiOp">Free Wifi</span>
        <span className="siSubtitle">Free Wifi, Charging Ports Available</span>
        <span className="siCancelOp">Flexible cancellation policy </span>
        <span className="siCancelOpSubtitle">
          Comfortable seating with air conditioning
        </span>
      </div>
      <div className="siDetails">
        {
          <div className="siRating">
            <span>Excellent</span>
            <button>{10}</button>
          </div>
        }
        <div className="siDetailTexts">
          <span className="siPrice">LKR {item.ticketPrice}</span>
          <span className="siTaxOp">Includes all applicable fees</span>
          <Link to={`/buses/${item._id}`}>
            <button className="siCheckButton">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
