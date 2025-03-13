import React, { Component } from 'react';

class Button extends Component {
  render() {
    //return  ...;
    return <form action="">
      <label for="fname">First Name:</label><br/>
      <input type="text" id="fname" name="fname" value=""/><br/>

      <label for="lname">Last Name:</label><br/>
      <input type="text" id="lname" name="lname" value=""/><br/>

      <label for="phone">Phone:</label><br/>
      <input type="text" id="phone" name="phone" value=""/><br/>

      <label for="email">Email:</label><br/>
      <input type="text" id="email" name="email" value=""/><br/>
      <br/>
      <input type="submit" value="Submit"/>
    </form>;
  }
}

export default Button;
