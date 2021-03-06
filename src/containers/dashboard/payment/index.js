import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Select from 'react-select'
import { push } from 'react-router-redux'

import ListItem from '../../../components/list-item'
import Button from '../../../components/button'
import selectStyles from '../../../components/select/styles'
import ScoupModal from '../components/scoupModal'

import { payment } from '../../../modules/payment'

import '../components/payment.css'

const shirtGenders = [{ label: 'Homme', value: 'M' }, { label: 'Femme', value: 'F' }]

const shirtSizes = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' }
]

class Cart extends React.Component {
  constructor(props) {
    super()
    const { user } = props
    if(user.paid) this.props.redirectToDashboard()
    this.state = {
      plusone: false,
      ethernet: false,
      ethernet7: false,
      shirt: false,
      tombola: 0,
      shirtGender: { value: 'H', label: 'Homme' },
      shirtSize: { value: 'M', label: 'M' },
      kaliento: false,
      mouse: false,
      keyboard: false,
      headset: false,
      screen24: false,
      screen27: false,
      chair: false,
      gamingPC: false,
      streamingPC: false,
      laptop: false,
      isScoupModalOpen: false,
    }

    this.isPartner = props.prices.partners.some(partner => user.email.endsWith(partner))

    this.switchToPlayer = this.switchToPlayer.bind(this)
    this.switchToPlusone = this.switchToPlusone.bind(this)
    this.toggleEthernet = this.toggleEthernet.bind(this)
    this.toggleEthernet7 = this.toggleEthernet7.bind(this)
    this.toggleShirt = this.toggleShirt.bind(this)
    this.onTombolaChange = this.onTombolaChange.bind(this)
    this.changeGender = this.changeGender.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.payment = this.payment.bind(this)
    this.openScoupModal = this.openScoupModal.bind(this)
    this.closeScoupModal = this.closeScoupModal.bind(this)
  }

  switchToPlayer() {
    this.setState({ plusone: false })
  }

  switchToPlusone() {
    this.setState({ plusone: true })
  }

  toggleEthernet() {
    this.setState({ ethernet: !this.state.ethernet })
  }

  toggleEthernet7() {
    this.setState({ ethernet7: !this.state.ethernet7 })
  }

  toggleShirt() {
    this.setState({ shirt: !this.state.shirt })
  }

  changeGender(option) {
    this.setState({ shirtGender: option, shirt: true })
  }

  changeSize(option) {
    this.setState({ shirtSize: option, shirt: true })
  }

  onTombolaChange(e){
    if(e.target.value === '') return this.setState({ tombola: 0 })
    if(e.target.value >= 0) this.setState({ tombola: parseInt(e.target.value, 10) > 100 ? 100 : parseInt(e.target.value, 10) })
  }

  openScoupModal() {
    this.setState({ isScoupModalOpen: true })
  }
  closeScoupModal(state) {
    this.setState({ 
      isScoupModalOpen: false,
      kaliento: state.kaliento,
      mouse: state.mouse,
      keyboard: state.keyboard,
      headset: state.headset,
      screen24: state.screen24,
      screen27: state.screen27,
      chair: state.chair,
      gamingPC: state.gamingPC,
      streamingPC: state.streamingPC,
      laptop: state.laptop,
     })
  }

  payment() {
    const basket = {
      plusone: this.state.plusone,
      ethernet: this.state.ethernet,
      ethernet7: this.state.ethernet7,
      kaliento: this.state.kaliento,
      mouse: this.state.mouse,
      keyboard: this.state.keyboard,
      headset: this.state.headset,
      screen24: this.state.screen24,
      screen27: this.state.screen27,
      chair: this.state.chair,
      gamingPC: this.state.gamingPC,
      streamingPC: this.state.streamingPC,
      laptop: this.state.laptop,
    }

    if (this.state.shirt) {
      basket.shirtGender = this.state.shirtGender.value
      basket.shirtSize = this.state.shirtSize.value
    }
    if (this.state.tombola > 0) basket.tombola = this.state.tombola

    this.props.payment(basket) 
  }

  render() {
    const playerPrice = this.isPartner ? this.props.prices.partner : this.props.prices.default
    const price =
      (this.state.plusone ? this.props.prices.plusone : playerPrice) +
      (this.state.ethernet ? this.props.prices.ethernet : 0) +
      (this.state.ethernet7 ? this.props.prices.ethernet7 : 0) +
      (this.state.shirt ? this.props.prices.shirt : 0) +
      (this.state.kaliento ? this.props.prices.kaliento : 0) +
      (this.state.mouse ? this.props.prices.mouse : 0) +
      (this.state.keyboard ? this.props.prices.keyboard : 0) +
      (this.state.headset ? this.props.prices.headset : 0) +
      (this.state.screen24 ? this.props.prices.screen24 : 0) +
      (this.state.screen27 ? this.props.prices.screen27 : 0) +
      (this.state.chair ? this.props.prices.chair : 0) +
      (this.state.gamingPC ? this.props.prices.gamingPC : 0) +
      (this.state.streamingPC ? this.props.prices.streamingPC : 0) +
      (this.state.laptop ? this.props.prices.laptop : 0) +
      (this.state.tombola > 0 ? this.state.tombola : 0)

    const gearPrice = 0 + (this.state.kaliento ? this.props.prices.kaliento : 0) +
    (this.state.mouse ? this.props.prices.mouse : 0) +
    (this.state.keyboard ? this.props.prices.keyboard : 0) +
    (this.state.headset ? this.props.prices.headset : 0) +
    (this.state.screen24 ? this.props.prices.screen24 : 0) +
    (this.state.screen27 ? this.props.prices.screen27 : 0) +
    (this.state.chair ? this.props.prices.chair : 0) +
    (this.state.gamingPC ? this.props.prices.gamingPC : 0) +
    (this.state.streamingPC ? this.props.prices.streamingPC : 0) +
    (this.state.laptop ? this.props.prices.laptop : 0)
    return (
      <React.Fragment>
        <ScoupModal
          isOpen={this.state.isScoupModalOpen}
          onClose={this.closeScoupModal}
          prices={this.props.prices}
        />
        <form className="a-dashboard-page a-dashboard-payment">
          <h2>Paiement de la place</h2>
          <p>
            Toutes les places vous donnent accès à l’ensemble du Festival des Jeux et de la LAN, et
            permettent de rester à l'UTT Arena même en dehors des horaires d'ouverture du Festival.
            Vous êtes d'une école partenaire et le prix n'est pas réduit ? Vérifiez votre e-mail dans <Link to="/dashboard/user">vos infos</Link>.
            <br />
            <br />
            Le paiement se déroule sur un site sécurisé.
          </p>
          <ListItem price={playerPrice} active={!this.state.plusone} onClick={this.switchToPlayer}>
            <h3>Place joueur</h3>
            <span>Place joueur.euse (tournoi spotlight ou libre). Permet d'avoir une place assise attitrée (sauf Super Smash Bros Ultimate)</span>
          </ListItem>
          <ListItem
            price={this.props.prices.plusone}
            active={this.state.plusone}
            onClick={this.switchToPlusone}
          >
            <h3>Place visiteur</h3>
            <span>Réservé aux accompagnateurs.rices</span>
          </ListItem>
          <div className="a-dashboard-payment__separator" />
          <ListItem
            price={`+${this.props.prices.ethernet}`}
            active={this.state.ethernet}
            onClick={this.toggleEthernet}
          >
            <h3>Câble ethernet (5m)</h3>
            <span>
              Un câble (<strong>5m</strong>) est requis pour se brancher aux switchs des tables
            </span>
          </ListItem>
          <ListItem
            price={`+${this.props.prices.ethernet7}`}
            active={this.state.ethernet7}
            onClick={this.toggleEthernet7}
          >
            <h3>Câble ethernet (7m)</h3>
            <span>
              Un câble (<strong>7m</strong>) plus long pour les joueurs situés en bout de table
            </span>
          </ListItem>
          <ListItem
            price={`+${this.props.prices.shirt}`}
            active={this.state.shirt}
            onClick={this.toggleShirt}
          >
            <h3>T-Shirt UA 2018</h3>
            <span>Un t-shirt souvenir de cette LAN de folie</span>
            <div onClick={e => e.stopPropagation()}>
              <Select
                options={shirtGenders}
                defaultValue={this.state.shirtGender}
                onChange={this.changeGender}
                isSearchable={false}
                styles={selectStyles}
              />
              <Select
                options={shirtSizes}
                defaultValue={this.state.shirtSize}
                onChange={this.changeSize}
                isSearchable={false}
                styles={selectStyles}
              />
            </div>
          </ListItem>
          <ListItem
            price={`+${parseInt(this.state.tombola, 10)}`}
            active={this.state.tombola > 0}
            onClick={() => this.state.tombola > 0 ? this.setState({ tombola: 0 }) : this.setState({ tombola: 1 })}
          >
            <h3>Tombola</h3>
            <span>Acheter des tickets de tombola à 1€ par ticket</span>
            <div style={{ marginTop: '10px'}} onClick={e => e.stopPropagation()} >
              <input type="number" name="tombola" value={`${this.state.tombola}`} onChange={this.onTombolaChange} />
            </div>
          </ListItem>
          <div className="a-dashboard-payment__separator" />
          <ListItem
            onClick={this.openScoupModal}
            price={`+${gearPrice}`}
            active={gearPrice > 0}
          >
            <h3>Matériel Scoup eSport</h3>
            <span>Louer un PC, écran, clavier, ...</span>
          </ListItem>
          <div className="a-dashboard-payment__separator" />
          <Button onClick={this.payment} raised>
            Payer {price}€
          </Button>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  prices: state.user.prices
})

const mapDispatchToProps = dispatch => ({
  payment: body => dispatch(payment(body)),
  redirectToDashboard : () => dispatch(push('/dashboard'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
