import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
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
         <Modal show={show} onHide={handleClose} centered >
            <Modal.Dialog className="w-full h-full m-0">
                <div className="text-white text-center rounded-3xl bg-zinc-950 bg-opacity-90 p-3 h-full">
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handlePasswordChange}>
                            Change Password
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal.Dialog>
        </Modal> 
    </div> 

/* <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
{show && (
    <Container className="text-white text-center my-3 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
        <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <Form>
                <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-black text-white placeholder-stone-400 rounded-full"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-black text-white placeholder-stone-400 rounded-full"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-black text-white placeholder-stone-400 rounded-full"
                    />
                </Form.Group>
            </Form>
        </div>
        <div className="modal-footer">
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handlePasswordChange}>
                Change Password
            </Button>
        </div>
    </Container>
)}
</div> */
)}
export default PasswordDialog;