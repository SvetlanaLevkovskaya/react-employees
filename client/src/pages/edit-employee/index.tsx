import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetAllEmployeeQuery } from '../../app/services/employees';
import { Row, Spin } from 'antd';
import Layout from '../../components/layout';
import { EmployeeForm } from '../../components/employee-form';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const EditEmployee = () => {
	const navigate = useNavigate();
	const {id} = useParams<{id: string}>();
	const [error, setError] = useState('');
	const {data, isLoading} = useGetAllEmployeeQuery(id || '')
	const [editEmployee] = useEditEmployeeMutation();

	const handleEditEmployee = async (employee: Employee) => {
		try {
			const editedEmployee = {
				...data,
				...employee
			}

			await editEmployee(editedEmployee).unwrap()
			navigate(`${Paths.status}/updated`)

		} catch (e) {
			const maybeError = isErrorWithMessage(e);

			if (maybeError) {
				setError(e.data.message)
			} else {
				setError('Unknown error')
			}
		}
	}

	if (isLoading) {
		return <Spin />
	}
	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm title='Edit Employee'
											btnText='Edit'
											error={error}
											employee={data}
											onFinish={handleEditEmployee}
				/>
			</Row>
		</Layout>
	);
};
