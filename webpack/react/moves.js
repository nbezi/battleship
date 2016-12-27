
class Moves extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var moves = this.props.moves.map((move) => (<Move data={move} key={move.id} />));
		return (<div className="moves">{moves}</div>);
	}
}

class Move extends React.Component {

	constructor(props) {
		super(props);
	}

	getDescription() {
		return (this.props.data.piece.char)
			? `Player ${this.props.data.player} HIT! ${this.props.data.piece.char} on row ${this.props.data.piece.row}, column ${this.props.data.piece.column}`
			: `Player ${this.props.data.player} Miss on row ${this.props.data.piece.row}, column ${this.props.data.piece.column}`;
	}

	render() {
		return (<div>{this.getDescription()}</div>);
	}
}

export default Moves;
