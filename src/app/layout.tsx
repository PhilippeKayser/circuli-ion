"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppBar, Toolbar, IconButton, Typography, Button, CssBaseline, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Menu, MenuItem } from '@mui/material'
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Fragment, useState } from 'react';
import { AccountCircle, ContentCut, Logout } from '@mui/icons-material';
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


const drawerWidth = 240;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <html lang="en">
            <body className={inter.className}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Circu Li-ion
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                <ListItem disablePadding onClick={() => router.push('/discharge')}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Battery2BarIcon />

                                        </ListItemIcon>
                                        <ListItemText primary='Battery Discharge' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding onClick={() => router.push('/disassembly')}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PrecisionManufacturingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Battery Disassembly' />

                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh' }} className='bg-gray-50'>
                        <Toolbar />
                        {children}
                    </Box>
                </Box>
            </body>
        </html >
    )
}
