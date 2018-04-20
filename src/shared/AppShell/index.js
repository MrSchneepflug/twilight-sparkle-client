import React, {Component} from 'react'
import Reboot from 'material-ui/Reboot'
import Header from './Header'

class AppShell extends Component {
  render() {
    return (
      <div>
        <Reboot/>
        <Header title={this.props.title}/>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default AppShell;
