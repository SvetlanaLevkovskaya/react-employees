import React, { FC } from 'react';
import { Employee } from '@prisma/client';
import { Card, Form, Space } from 'antd';
import { CustomInput } from '../custom-input';
import { ErrorMessage } from '../error-message';
import { CustomButton } from '../custom-button';

type Props<T> = {
	onFinish: (value: T) => void
	btnText: string
	title: string
	error?: string
	employee?: T
}
export const EmployeeForm: FC<Props<Employee>> = ({
																						 onFinish, btnText, employee, title, error,
																					 }) => {
	return (
		<Card title={title} style={{width: '30rem'}}>
			<Form name='emploeey-form' onFinish={onFinish} initialValues={employee}>
				<CustomInput type='text' name='firstName' placeholder='Name'/>
				<CustomInput type='text' name='lastName' placeholder='Last Name'/>
				<CustomInput type='number' name='age' placeholder='Age'/>
				<CustomInput type='text' name='address' placeholder='Address'/>
				<Space>
					<ErrorMessage message={error}/>
					<CustomButton htmlType='submit'>{btnText}</CustomButton>
				</Space>
			</Form>
		</Card>
	);
};
