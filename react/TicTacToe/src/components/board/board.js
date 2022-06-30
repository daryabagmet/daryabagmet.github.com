import React, {Fragment} from 'react';
import Square from './square';

import './board.css';

export default class Board extends React.Component {
	renderSquare() {
		const squaresSize = 9;
		const squaresElements = [];

		for (let i = 0; i < squaresSize; i++) {
			squaresElements.push(
				<Square
					key={`scq-${i}`}
					value={this.props.squares[i]}
					onClick={() => this.props.onClick(i)}
				/>
			);
		}

		return squaresElements;
	}

	render() {
		return <Fragment>{this.renderSquare()}</Fragment>;
	}
}
