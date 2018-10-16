import React from 'react'
import { connect } from 'react-redux'

import './mentions-legales.css'


import ScrollToTopOnMount from '../../components/scrollToTopOnMount'
import Category from '../components/category'
import Header from '../components/header'
import Footer from '../components/footer'
import Social from '../components/social'
import LoginModal from '../components/loginModal'
import ContactModal from '../components/contactModal'
import ForgotModal from '../components/forgotModal'

import { fetchCanLogin } from '../../modules/canLogin'
import { autoLogin } from '../../modules/login'

class MentionsLegales extends React.Component {
  constructor() {
    super()

    this.state = {
      loginModalOpened: false,
      forgotModalOpened: false,
      contactModalOpened: false,
      faqEntriesOpened: []
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.openForgotModal = this.openForgotModal.bind(this)
    this.openContactModal = this.openContactModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeContactModal = this.closeContactModal.bind(this)
    this.closeForgotModal = this.closeForgotModal.bind(this)
    this.scrollCapture = this.scrollCapture.bind(this)
  }

  componentWillMount() {
    this.props.fetchCanLogin()
    this.props.autoLogin()

    document.addEventListener('scroll', this.scrollCapture, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollCapture)
  }

  openLoginModal() {
    this.setState({
      loginModalOpened: true
    })
  }

  closeLoginModal() {
    this.setState({
      loginModalOpened: false
    })
  }

  openContactModal() {
    this.setState({
      contactModalOpened: true
    })
  }

  closeContactModal() {
    this.setState({
      contactModalOpened: false
    })
  }

  openForgotModal() {
    this.setState({
      loginModalOpened: false,
      forgotModalOpened: true
    })
  }

  closeForgotModal() {
    this.setState({
      loginModalOpened: true,
      forgotModalOpened: false
    })
  }

  scrollCapture() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    const bottom = window.innerHeight + 125 - 12 - 50

    document.body.className =
      scrollTop >= document.body.scrollHeight - bottom ? 'a-social-fixed' : ''
  }

  toggleFaqEntry(i) {
    let entries = this.state.faqEntriesOpened.slice()
    entries[i] = !entries[i]

    this.setState({
      faqEntriesOpened: entries
    })
  }

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <Header openLoginModal={this.openLoginModal} openContactModal={this.openContactModal} />
        <LoginModal
          isOpen={this.state.loginModalOpened}
          onClose={this.closeLoginModal}
          onForgot={this.openForgotModal}
        />
        <ContactModal
          isOpen={this.state.contactModalOpened}
          onClose={this.closeContactModal}
        />
        <ForgotModal isOpen={this.state.forgotModalOpened} onClose={this.closeForgotModal} />

        <main className="a-mentions">
          <div className="a-mentions-body">
            <Category>Mentions Légales</Category>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            <h1>Mon sous titre</h1>
            <h2>Mon plus petit sous titre</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis dolor augue, in ultrices libero suscipit vitae. Donec purus quam, laoreet ut tincidunt nec, gravida id nisi. Donec hendrerit velit quis nulla sagittis viverra et non leo. In eget nisi ante. Nulla nec dolor ut risus cursus pretium a id mi. Maecenas laoreet, urna non ullamcorper ultrices, justo libero suscipit lorem, ac pellentesque orci massa in sem. Nunc tristique nunc ex, quis condimentum erat malesuada at. Integer augue eros, congue et cursus non, porta quis velit. Maecenas vel metus mauris. Aenean nisl metus, viverra eget turpis ullamcorper, porta malesuada metus. Sed sapien diam, fringilla a suscipit eget, fermentum eu sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sit amet arcu odio. Pellentesque porta, felis vitae suscipit dictum, nisi purus porttitor magna, eu dictum nibh neque eget quam. Maecenas fermentum malesuada posuere. Ut ut erat in felis bibendum luctus.</p>
            </div>
          <Footer openContactModal={this.openContactModal} />
        </main>

        <Social />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCanLogin: () => dispatch(fetchCanLogin()),
  autoLogin: () => dispatch(autoLogin('/mentions-legales'))
})

export default connect(
  null,
  mapDispatchToProps
)(MentionsLegales)
