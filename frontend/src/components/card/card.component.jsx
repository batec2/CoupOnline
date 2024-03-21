import ambassador from "./ambassador64.png"
import assassin from "./assassin64.png"
import notFound from "./not-found.png"

import './card.styles.css'

const Card = ({card}) => {
  console.log(card)
  let img = notFound
  switch (card.character) {
    case "Duke":
      img = ambassador
      break;
    case "Assassin":
      img = assassin
      break;
    case "Ambassador":
      img = ambassador
      break;
    case "Captain":
      img = ambassador
      break;
    case "Contessa":
      img = assassin
      break;
  };
    
  return(
    <div className="card"> 
      <h4>{card.character}</h4>
      <img src={img} alt="char_icon" />
      <h5>Action</h5>
      <h6>{card['action-name']=="" ? "N/A" : card['action-name']}</h6>
      <text>{card['action-effect']=="" ? "N/A" : card['action-effect']}</text>
      <h5>Counteraction</h5>
      <text>{card['counteraction']=="" ? "N/A" : card['counteraction']}</text>
    </div>
    )
};

export default Card;