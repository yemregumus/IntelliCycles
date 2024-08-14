import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { getUserIdFromToken, getToken } from '../utils/auth';
import PropTypes from 'prop-types';

function PasswordDialog({show, handleClose, apiUrl}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const userId = getUserIdFromToken();

        try {
            const response = await fetch(`${apiUrl}/api/user/password/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${getToken()}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (response.ok) {
                toast.success('Password changed successfully');
                handleClose();
            } else {
                console.error('Failed to change password', response.status, response.statusText);
                toast.error('Failed to change password');
            }
        } catch (error) {
            console.error('Failed to change password', error);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="md" centered className="rounded-3xl">
                <div className="fixed text-white inset-0 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-[#540056bf] to-[#000c4b4d] border-1 border-black backdrop-blur-md border-1 border-black p-3 h-auto max-w-3xl mx-auto rounded-3xl">
                        <Modal.Header closeVariant='white' closeButton className="text-white">
                            <Modal.Title>Change Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-4'>
                            <Form>
                                <Form.Group className="mb-4 flex items-center" controlId="oldPassword">
                                    <Form.Label className="w-2/6 text-left">Old Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-4/6 bg-stone-400 text-black placeholder-stone-950 rounded-full"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 flex items-center" controlId="newPassword">
                                    <Form.Label className="w-2/6 text-left">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-4/6 bg-stone-400 text-black placeholder-stone-950 rounded-full"
                                    />
                                </Form.Group>
                                <Form.Group className="flex items-center" controlId="confirmPassword">
                                    <Form.Label className="w-2/6 text-left">Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-4/6 bg-stone-400 text-black placeholder-stone-950 rounded-full"
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handlePasswordChange}>
                                Change Password
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

PasswordDialog.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    apiUrl: PropTypes.string,
};

export default PasswordDialog;
