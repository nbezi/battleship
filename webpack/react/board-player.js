
class BoardPlayer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var rows = this.props.board.map((row, idx) => {
			return (<Row cells={row} rowNumber={idx} enemy={this.props.enemy} active={this.props.active} key={idx} />);
		});

		return (<div className="board">{rows}</div>);
	}
}

class Row extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var cells = this.props.cells.map((cell, idx) => {
			return (<Cell data={cell} active={this.props.active} enemy={this.props.enemy} rowNumber={this.props.rowNumber} columnNumber={idx} key={idx} />);
		});

		return (<div className="board-row">{cells}</div>);

	}
}

class Cell extends React.Component {

	constructor(props) {
		super(props);
	}

	isHittable() {
		return this.props.active && !this.props.data.hit;
	}

	getClass() {
		return 'board-cell ' + (this.isHittable() ? 'hittable' : '') + (this.props.data.hit ? ' hitted' : '');
	}

	fire() {
		if (this.isHittable()) {
			$('.hittable').removeClass('hittable');
			$.ajax({
				url: '/move', dataType: 'json', method: 'put', 
				data: {row: this.props.rowNumber, column: this.props.columnNumber},
				success: () => {}
			});
		} else {
			alert("It's not your turn yet, please wait for your oponent.");
		}
	}

	getData() {
		if (!this.props.enemy) {
			return this.props.data.char
				? this.props.data.char + ' ' + this.props.data.index
				: '';
		}

		if (this.props.data.hit) {
			return this.props.data.char
				? this.props.data.char + ' ' + this.props.data.index
				: 'X';
		} else {
			return '';
		}
	}

	render() {
		return (
			<span className={this.getClass()} onClick={this.fire.bind(this)}>
				{this.getData()}
			</span>
		);
	}
}

export default BoardPlayer;
