import React from 'react'
import Reboot from 'material-ui/Reboot';
import Header from './Header'
import Footer from './Footer'

class AppShell extends React.Component {
  render() {
    return (
      <div>
        <Reboot />
        <Header label={this.props.label} />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default AppShell
