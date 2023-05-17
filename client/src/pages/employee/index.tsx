import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetAllEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { Descriptions, Divider, Modal, Space, Spin } from 'antd';
import Layout from '../../components/layout';
import { CustomButton } from '../../components/custom-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorMessage } from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const Employee = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const params = useParams<{ id: string }>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading } = useGetAllEmployeeQuery(params.id || '');
	const [removeEmployee] = useRemoveEmployeeMutation();
	const user = useSelector(selectUser);

	const showModal = () => {
		setIsModalOpen(true)
	};

	const hideModal = () => {
		setIsModalOpen(false)
	};

	const handleDeleteUser = async () => {
		hideModal()

		try {
			if (data) {
				await removeEmployee(data.id).unwrap()
				navigate(`${Paths.status}/deleted`)
			}
		} catch (e) {
			const maybeError = isErrorWithMessage(e);

			if (maybeError) {
				setError(e.data.message)
			} else {
				setError('Unknown error')
			}
		}
	};

	if (isLoading) {
		return <Spin />
	}

	if (!data) {
		return <Navigate to="/" />
	}

	return (
		<Layout>
			<Descriptions title="User Info" bordered>

				<Descriptions.Item label="Name" span={ 3 }>
					{ `${ data.firstName } ${ data.lastName }` }
				</Descriptions.Item>

				<Descriptions.Item label="Age" span={ 3 }>
					{ data.age }
				</Descriptions.Item>

				<Descriptions.Item label="Address" span={ 3 }>
					{ data.address }
				</Descriptions.Item>

			</Descriptions>
			{
				user?.id === data.userId && (
					<>
						<Divider orientation="left">Action</Divider>
						<Space>
							<Link to={ `/employee/edit/${ data.id }` }>
								<CustomButton shape="round" type="default" icon={ <EditOutlined /> }>Edit</CustomButton>
							</Link>
							<CustomButton shape="round" danger onClick={ showModal }
														icon={ <DeleteOutlined /> }>Delete</CustomButton>
						</Space>
					</>
				)
			}
			<ErrorMessage message={ error } />
			<Modal title="Delete User"
						 open={ isModalOpen }
						 onOk={ handleDeleteUser }
						 onCancel={ hideModal }
						 okText="Confirm"
						 cancelText="Cancel"
			>
				Are you sure to delete this user?
			</Modal>
		</Layout>
	);
};
