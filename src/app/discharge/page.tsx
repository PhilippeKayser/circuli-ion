"use client";

import { Fragment, useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Card, CardContent, CardHeader, Divider, LinearProgress } from '@mui/material';
import { PlayArrow, StopRounded, PauseRounded, PlayArrowRounded } from '@mui/icons-material';

export type ActionType = 'charge' | 'discharge';

export type VoltageDataPoint = {
    timestamp: number;
    voltage: number;
}

const dataPoints: VoltageDataPoint[] = [
    {
        timestamp: 0,
        voltage: 4
    },
    {
        timestamp: 2,
        voltage: 3.8
    },
    {
        timestamp: 4,
        voltage: 3.6
    },
    {
        timestamp: 6,
        voltage: 3.55
    },
    {
        timestamp: 8,
        voltage: 3.5
    },
    {
        timestamp: 10,
        voltage: 3.45
    },
    {
        timestamp: 12,
        voltage: 3.4
    },
    {
        timestamp: 14,
        voltage: 2.3
    },
    {
        timestamp: 16,
        voltage: 0
    }
];

export default function Discharge() {
    const resistance = 3.3;

    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);

    const [index, setIndex] = useState(0);

    let data = useRef<VoltageDataPoint[]>([]);
    let currentVoltage = useRef(4);


    let interval: any = useRef<any>(undefined);

    const start = () => {
        setStarted(true)
        setPaused(false);

        const indexIncrement = () => { setIndex(i => i + 1) };

        interval.current = setInterval(indexIncrement, 2000);


    }

    const pause = () => {
        setPaused(true)
        clearInterval(interval.current);
    }

    const stop = () => {
        setPaused(false);
        setStarted(false);
        clearInterval(interval.current);
    }

    useEffect(() => {

        const newPoint = dataPoints[index];
        if (newPoint) {
            data.current = [...data.current, newPoint];
            currentVoltage.current = newPoint.voltage;
        }


        if (index == dataPoints.length) {
            clearInterval(interval.current);
            setStarted(false);
        }

    }, [index])

    const getButtons = () => {

        let startButton;
        let pauseButton;
        let stopButton;
        let empty;

        if (!started && currentVoltage.current != 0) {
            startButton = <Button className='mx-2' startIcon={<PlayArrowRounded />} onClick={start} variant='contained'>Begin Discharge</Button>
        }
        if (started) {
            startButton = undefined;
            pauseButton = <Button className='mx-2' startIcon={<PauseRounded />} onClick={pause} variant="contained">Pause</Button>;
            stopButton = <Button className='mx-2' startIcon={<StopRounded />} color='secondary' onClick={stop} variant="contained">Stop</Button>;
        }
        if (paused) {
            pauseButton = <Button className='mx-2' startIcon={<PlayArrow />} onClick={start} variant="contained">Continue</Button>;
        }
        if (currentVoltage.current == 0) {
            empty = <Button className='mx-2' disabled onClick={start} variant="outlined">Depleted</Button>
        }

        return (
            <Fragment>
                {startButton}
                {pauseButton}
                {stopButton}
                {empty}
            </Fragment>
        );
    }
    return (
        <Fragment>
            <Card>
                <CardHeader title="Battery Discharge" action={getButtons()} />
                <LinearProgress variant='determinate' value={index / (dataPoints.length) * 100} />
                <CardContent>
                    <div className='grid grid-cols-2 gap-2 grow mb-8'>
                        <Card className='w-full'>
                            <CardHeader title="Voltage" />
                            <Divider />
                            <CardContent className='text-center'>
                                <p className='font-bold text-2xl'>{currentVoltage.current} V</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full'>
                            <CardHeader title="Current" />
                            <Divider />
                            <CardContent className='text-center'>
                                <p className='font-bold text-2xl'>{Math.round((currentVoltage.current / resistance + Number.EPSILON) * 100) / 100} A</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='w-[100%] h-[300px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <LineChart
                                width={500}
                                height={300}
                                data={data.current}
                                id='test'
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis name='Time' dataKey="timestamp" />
                                <YAxis name='Voltage' ticks={[0, 1, 2, 3, 4, 5]} domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name='Voltage' dataKey="voltage" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </CardContent>
            </Card>
        </Fragment>
    )
}
