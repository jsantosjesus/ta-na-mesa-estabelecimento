import { FaBars } from 'react-icons/fa';

function HamburguerIcon(props) {
  return (
    <div className={props.className} onClick={props.onClick}>
      <FaBars />
    </div>
  );
}

export default HamburguerIcon;