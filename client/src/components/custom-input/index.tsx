import React, { FC } from 'react';
import { Form, Input } from 'antd';

type Props = {
	name: string
	placeholder: string
	type?: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'| string
}
export const CustomInput: FC<Props> = ({name, placeholder, type = 'text'}) => {
	return (
		<Form.Item name={name} rules={[{required: true, message: 'Required field'}]} shouldUpdate={true}>
			<Input placeholder={placeholder} type={type} size='large'/>
		</Form.Item>

	);
};
