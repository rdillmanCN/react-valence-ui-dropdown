var React = require('react'),
	classNames = require('classnames'),
	keys = require('./keys');

var Item = React.createClass( {

	getInitialState: function() {
		return {
			isFocused: false
		};
	},

	handleFocus: function() {
		this.setState({ isFocused: true });
	},

	handleBlur: function() {
		this.setState({ isFocused: false });
	},

	handleKeyUp: function(e) {

		if (e.keyCode !== keys.SPACE || this.props.isEnabled === false) {
			return;
		}

		this.props.action();

	},

	render: function() {

		var isEnabled = (this.props.isEnabled !== false);

		var link = React.createElement(
			'a', {
				'aria-disabled': !isEnabled,
				href: isEnabled ? 'javascript:void(0);' : null,
				onClick: isEnabled ? this.props.action : null,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onKeyUp: this.handleKeyUp,
				tabIndex: -1
			},
			this.props.text
		);

		var itemClass = classNames({
			'vui-dropdown-menu-item': true,
			'vui-dropdown-menu-item-disabled': !isEnabled,
			'vui-dropdown-menu-item-focus': this.state.isFocused
		});

		return React.createElement(
			'li', {
				className: itemClass,
				role: 'menuitem'
			},
			link
		);

	}

} );

Item.getFocusableElement = function(itemNode) {
	return itemNode.firstChild;
};

module.exports = Item;