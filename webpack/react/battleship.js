import BoardPlayer from './board-player';
import Moves from './moves';

class Battleship extends React.Component {

	constructor(props) {
		super(props);
		this.state = {myTurn: false};
		this.loadGameFromServer();
		setInterval(this.loadGameFromServer.bind(this), 2000);
	}

	loadGameFromServer() {
		$.ajax({url: '/game', dataType: 'json', cache: false, method: 'get',
			success: (data) => this.setState(data),
			error: (xhr, status, err) => {
				if (error) console.error('/game', status, err.toString());
			}
		});
	}

	restart() {
		if (confirm('Are you sure you want to restart?')) {
			$.ajax({url: '/restart', dataType: 'json', cache: false, method: 'get',
			success: (data) => this.loadGameFromServer()});
		}
	}

	getClass() {
		return "battleship " + (this.state.myTurn ? 'turn-playing' : 'turn-waiting');
	}

	render() {
		console.info(this.state);
		if (!this.state.myBoard) return (<span />);

		return (
			<div className={this.getClass()}>
				<h1>{this.state.gameState}</h1>
				<h2>Your Board</h2>
				<BoardPlayer board={this.state.myBoard} />
				<hr />
				<h2>Your Enemy's board</h2>
				<BoardPlayer enemy={true} board={this.state.enemyBoard} active={this.state.myTurn} />
				<hr />
				<button onClick={this.restart.bind(this)}>Restart Game!</button>
				<Moves moves={this.state.moves} />
			</div>
		);
	}
}

export default Battleship;