import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

// <Switch className="col s4 m4 l4" label="Remote" type="checkbox" value="" name="remote" checked={position.remote} id="" />

function Checkbox(props) {

	const {label1, label2, value, name, checked, className, id} = props;
		
	// Track checkbox state
	const [check, setCheck] = useState(checked);
	
	// Empty default checked state
	let remoteChecked = '';
	// If remote passed is true, set as checked
	if (check){
		remoteChecked = 'checked';
	}

	// Set checkbox state on click
	const checkClick = () => {
		setCheck(!check)
	}
	
	return (
		<div className="input-field">
			<div className={`${className} checkbox-wrapper switch`}>
				<label>
					{label1}
					<input type="checkbox" checked={remoteChecked} name={name} value={value} id={id} onClick={checkClick} />
					<span class="lever"></span>
					{label2}
				</label>
			</div>
		</div>
	)
}

Checkbox.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
};

export default Checkbox;
