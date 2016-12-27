import Theme from './theme';
import Battleship from './react/battleship';

Theme.init();

ReactDOM.render(<Battleship />, document.getElementById('game'));
