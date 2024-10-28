import './Background.css'
import video2 from '../../assets/video2.mp4'
import image5 from '../../assets/image5.jpg'
import image6 from '../../assets/image6.jpg'

import image7 from '../../assets/image7.jpg'


const Background = ({playStatus, heroCount}) => {
    if (playStatus) {
        return (
          <video className="background" autoPlay muted loop>
            <source src={video2} type="video/mp4" />
          </video>
        );
      } else if (heroCount === 0) {
        return <img src={image7} className="background fade-in" alt="" />;
      } else if (heroCount === 1) {
        return <img src={image6} className="background fade-in" alt="" />;
      } else if (heroCount === 2) {
        return <img src={image5} className="background fade-in" alt="" />;
      }
}

export default Background
