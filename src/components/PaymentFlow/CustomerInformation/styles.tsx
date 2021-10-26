import { css } from "@emotion/react";

export const formControl = css({
  ".react-tel-input .form-control.invalid-number": {
    backgroundColor: 'white',
    borderColor: "#E53E3E",
    boxShadow: "0 0 0 1px #e53e3e",
  },

  ".react-tel-input .form-control": {
    height: "48px",
    borderColor: 'rgb(226, 232, 240)',
    width: "100%",
    backgroundColor: 'white',
    color: "#6B46C1"
  }
})