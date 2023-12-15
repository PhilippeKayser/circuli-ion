"use client";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Modal } from '@mui/material';
import { CameraRounded } from '@mui/icons-material'
import Image from 'next/image'

const messages = [
    "Screws removed",
    "Cables removed",
    "Modules disassembled",
    "Batteries separated",
    "Batteries sorted"
]

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [lidRemoved, setLidRemoved] = useState(false);

    const [index, setIndex] = useState(0);

    let data = useRef<string>("");


    const startLidRemoval = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        const removeLid = () => { setLidRemoved(true); };

        setTimeout(removeLid, 3000);


    }

    let interval: any = useRef<any>(undefined);

    const startDisassembly = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        const indexIncrement = () => { setIndex(i => i + 1) };

        interval.current = setInterval(indexIncrement, 2000);


    }

    useEffect(() => {

        const log = messages[index];
        if (index == 0) {
            data.current = "Disassembly started"
        }
        if (log) {
            data.current = `${data.current} -> ${log}`;
        }


        if (index == messages.length) {
            clearInterval(interval.current);
        }

    }, [index])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const [open, setOpen] = useState(false);
    const handleBatteryCaptureModalOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBatteryCaptureModalAccept = () => {
        setOpen(false);
        handleNext();
    }




    return (
        <Fragment>
            <Card>
                <CardHeader title="Disassembly"></CardHeader>
                <Divider />
                <CardContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step key="Picture">
                            <StepLabel>
                                Battery picture
                            </StepLabel>
                            <StepContent>
                                <Typography>Capture an image of the Battery.</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            startIcon={<CameraRounded />}
                                            variant="contained"
                                            onClick={handleBatteryCaptureModalOpen}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Capture image
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Card className='m-[10%]'>
                                                <CardHeader title="Capture image"></CardHeader>
                                                <CardContent>
                                                    <Box width='250px' height='250px'>
                                                        <Image alt="Battery" width={250} height={250} src="/battery.png"></Image>
                                                    </Box>
                                                </CardContent>
                                                <CardContent>
                                                    <Button variant="outlined">Retake</Button>
                                                    <Button onClick={handleBatteryCaptureModalAccept} variant="contained">Accept</Button>
                                                </CardContent>
                                            </Card>
                                        </Modal>
                                    </div>
                                </Box>

                            </StepContent>
                        </Step>
                        <Step key="Picture">
                            <StepLabel>
                                Image analysis
                            </StepLabel>
                            <StepContent>
                                <Typography>Identification of screws on battery pack</Typography>
                                <Image alt="Battery" width={250} height={250} src="/batteryAnalysed.png"></Image>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={startLidRemoval}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step key="Picture">
                            <StepLabel>
                                Battery pack lid removal
                            </StepLabel>
                            <StepContent>
                                {!lidRemoved && <Typography>Removal of lid in progress</Typography>}
                                {lidRemoved && <Typography>Lid successfully removed</Typography>}
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            disabled={!lidRemoved}
                                            variant="contained"
                                            onClick={startDisassembly}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step key="Picture">
                            <StepLabel>
                                Battery pack disassembly
                            </StepLabel>
                            <StepContent>
                                <Box component="div" sx={{ overflow: 'auto' }}>
                                    {data.current}
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            disabled={messages.length != index}
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Finish
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    </Stepper>
                </CardContent>
            </Card>
        </Fragment>
    );
}
