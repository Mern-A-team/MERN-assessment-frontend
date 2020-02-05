import React, { Component } from 'react'

// Standard submit button to be used accross forms.
export default class SubmitButton extends Component {
  render() {
    return (
      <button cy-data="submitButton" id="submitButton" type="submit">Submit</button>
    )
  }
}