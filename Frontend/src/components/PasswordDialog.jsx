import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { getUserIdFromToken, getToken } from '../utils/auth';

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
                    'Authorization': `Bearer ${getToken()}`,
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
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Dialog className="w-full h-full m-0 bg-zinc-950">
                    <div className="text-white border-3 border-amber-900 text-center bg-black p-3 h-full">
                        <Modal.Header closeVariant='white' closeButton>
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
                                        className="w-5/6 bg-black text-white placeholder-stone-400 rounded-full"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 flex items-center" controlId="newPassword">
                                    <Form.Label className="w-2/6 text-left">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-5/6 bg-black text-white placeholder-stone-400 rounded-full"
                                    />
                                </Form.Group>
                                <Form.Group className="flex items-center" controlId="confirmPassword">
                                    <Form.Label className="w-2/6 text-left">Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-5/6 bg-black text-white placeholder-stone-400 rounded-full"
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
                </Modal.Dialog>
            </Modal> 
        </div>
    );
}

export default PasswordDialog;
