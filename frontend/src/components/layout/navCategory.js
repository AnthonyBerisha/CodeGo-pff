import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const NavCategory = ({ category }) => (
	<Dropdown.Item href={'/category/' + category.title}>
		{category.title}
	</Dropdown.Item>
);

export default NavCategory;