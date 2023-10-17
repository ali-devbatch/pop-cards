// styling
import TextField from '@mui/material/TextField';

export default function PopcardTextfield(props) {
  return (
    <TextField
      variant="outlined"
      sx={{
        marginBottom: "25px",
        width: "100%",
        borderRadius: "5px",
        height: "52px",
        maxHeight: "52px",
        color: "#7E8299",
        "&>label": {
          fontSize: "14px",
          fontWeight: 600,
          color: "#7E8299",
        },
        "&>div>input": {
          fontSize: "14px",
          fontWeight: 600,
          color: "#7E8299",
        },
      }}
      {...props}
    />
  )
}
