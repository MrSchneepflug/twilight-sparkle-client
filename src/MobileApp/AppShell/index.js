import React from 'react'
import { withRouter } from 'react-router'
import Reboot from 'material-ui/Reboot'
import Header from './Header'
import Footer from './Footer'

class AppShell extends React.Component {

  getTitleFromLocation = () => {
    switch(this.props.location.pathname) {
      case "/":
        return 'Home'
      case "/teams":
        return 'Choose Your Team'
      case "/developers":
        return "Select Developer"
      case "/estimation":
        return "Estimate!"
      default: 
        return "Unknown Scene"
    }
  }

  render() {
    console.log(this.props.location)
    return (
      <div>
        <Reboot />
        <Header label={this.getTitleFromLocation()} />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default withRouter(AppShell)
