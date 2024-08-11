import { Box } from '@mui/material'
import React from 'react'

const FullViewContent = ({ children }) => {
    return (
        <Box
            sx={{
           
                width: "100vw",
                height: "100%",
                margin: "auto",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 9999,
                bgcolor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            {children}
        </Box>
    )
}

export default FullViewContent