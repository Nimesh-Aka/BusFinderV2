import {
  faBus,
  faCalendarDays,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import DatePicker from "react-datepicker";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";

// theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";

const Header = ({ type }) => {
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [journeyDate, setJourneyDate] = useState(new Date());

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { departureStation, arrivalStation, journeyDate },
    });
    navigate("/buses", {
      state: { departureStation, arrivalStation, journeyDate },
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Book Your Bus Journey Easily</h1>
            <p className="headerDesc">
              Find and book bus tickets online for your next trip with ease.
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="headerIcon"
                />
                <input
                  type="text"
                  placeholder="Departure Station"
                  className="headerSearchInput"
                  onChange={(e) => setDepartureStation(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="headerIcon"
                />
                <input
                  type="text"
                  placeholder="Arrival Station"
                  className="headerSearchInput"
                  onChange={(e) => setArrivalStation(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(journeyDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DatePicker
                    selected={journeyDate}
                    editableDateInputs={true}
                    onChange={(day) => setJourneyDate(day)}
                    dateFormat="MM/dd/yyyy"
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Find Buses
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
