import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";

export const ActionTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} arrow classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        borderRadius: 8
    },
}));