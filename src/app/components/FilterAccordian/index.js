import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Div from '@jumbo/shared/Div';

function FilterAccordian({ children, actions,heading }) {
    return (
        <Div sx={{my:1}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography variant='h2' m={0} p={0}>{heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
                <AccordionActions sx={{justifyContent:"flex-start"}}>
                    <Div sx={{mx:1,mb:2}}>
                        {actions}
                    </Div>
                </AccordionActions>
            </Accordion>
        </Div>
    );
}

FilterAccordian.propTypes = {
    children: PropTypes.node.isRequired,
    actions: PropTypes.node.isRequired,
};

export default FilterAccordian