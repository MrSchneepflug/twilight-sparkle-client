import React from 'react'
import Reboot from 'material-ui/Reboot'
import Header from './Header'
import Footer from './Footer'

class AppShell extends React.Component {
  render() {
    return (
      <div>
        <Reboot/>
        <Header title={this.props.title}/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    )
  }
}

export default AppShell;
