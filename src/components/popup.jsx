import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function popup(props) {
    const [title, children, openPopup, setOpenPopup] = props;

    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>Title</div>
            </DialogTitle>
            <DialogContent>
                <div>Content</div>
            </DialogContent>
        </Dialog>
    )
}