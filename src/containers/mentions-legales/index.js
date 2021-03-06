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
                        <h1>Propriétaire du site</h1>
                        <p>
                            UTT Net Group, association loi 1901<br/>
                            N° RNA : W103000699<br/>
                            situé au 12 rue Marie Curie<br/>
                            10004 Troyes<br/>
                            03 26 40 60 00<br/>
                            ung@utt.fr<br/>
                        </p>

                        <h1>Hébergeur du site</h1>
                        <p>UTT Net Group, association loi 1901<br/>
                            N° RNA : W103000699<br/>
                            12 rue Marie Curie <br/>
                            10004 Troyes<br/>
                            03 26 40 60 00<br/>
                            ung@utt.fr
                        </p>

                        <h1>Informations relatives aux cookies</h1>
                        <p>Afin d’assurer la fourniture du service à l’utilisateur authentifié, un cookie de session est inscrit sur la navigateur lors de l’authentification sur le site. Celui-ci, identifié par le nom “arena-2018-token” dans le scope “arena.utt.fr” a pour seule fonction d’assurer la persistence de la session authentifiée de l’utilisateur. Il est détruit lors de la déconnexion, où à son expiration (sous 7200 secondes).
                            Conformément à la directive européenne 2009/136/CE, ce cookie est indispensable à la fourniture du service sollicité. L’utilisateur peut se dispenser de ce cookie en ne s’inscrivant pas sur le site.
                        </p>

                        <h1>Conditions d'accès aux systèmes informatiques</h1>
                        <p>
                            Pour assurer la qualité et la sécurité du réseau et des équipements rattachés d'une part,
                            et la fluidité des échanges et des services offerts d'autre part, les organisateurs se réservent le droit
                            de bloquer, altérer ou réaliser toute autre action qu'ils jugeront pertinente sur les échanges réseaux afin d'atteindre
                            les objectifs susmentionnés.
                        </p>

                        <h1>Conditions générales de vente</h1>

                        <h2>Préambule</h2>
                        <p>
                            Les présentes conditions générales de vente s’appliquent à toutes les ventes conclues sur le site internet arena.utt.fr

                            Le site internet arena.utt.fr est un service de :<br/>

                            UTT Net Group, association loi 1901<br/>
                            N° RNA : W103000699<br/>

                            situé au 12 rue Marie Curie 10004 Troyes<br/>

                            03 26 40 60 00<br/>
                            ung@utt.fr<br/>

                            Le site arena.utt.fr commercialise le produit suivant : Place pour la LAN et matériel en prévente ou location. Le client déclare avoir pris connaissance et avoir accepté les conditions générales de vente antérieurement à la passation de sa commande. La validation de la commande vaut donc acceptation des conditions générales de vente.<br/>

                            Le paiement est assuré par le prestataire suivant :<br/>

                            BDE UTT, association loi 1901<br/>
                            sis au 12, rue Marie Curie, 10000 Troyes<br/>
                            SIRET 4483866720001<br/>
                        </p>

                        <h2>Article I - Principe</h2>
                        <p>
                            Les présentes conditions générales expriment l’intégralité des obligations des parties. En ce sens, l’acheteur est réputé les accepter sans réserve.
                            Les présentes conditions générales sont accessibles sur le site de l’UTT Arena et prévaudront, le cas échéant, sur toute autre version ou tout autre document contradictoire.
                            Le vendeur et l’acheteur conviennent que les présentes conditions générales régissent exclusivement leur relation. Le vendeur se réserve le droit de modifier ponctuellement ses conditions générales. Elles seront applicables dès leur mise en ligne.
                            Si une condition de vente venait à faire défaut, elle serait considérée être régie par les usages en vigueur dans le secteur de la vente à distance dont les sociétés ont siège en France.
                            Les présentes conditions générales de vente sont valables jusqu’au 10 décembre 2018.</p>

                        <h2>Article II - Contenu</h2>
                        <p>
                            Les présentes conditions générales ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de biens proposés par le vendeur à l’acheteur, à partir du site internet de l’UTT Arena.
                            Les présentes conditions ne concernent que les achats effectués sur le site de l’UTT Arena.
                            Ces achats concernent les produits suivants : Place pour la LAN et matériel en prévente ou location.</p>

                        <h2>Article III - Informations précontractuelles</h2>
                        <p>
                            L’acheteur reconnaît avoir eu communication, préalablement à la passation de sa commande et à la conclusion du contrat, d’une manière lisible et compréhensible, des présentes conditions générales de vente et de toute les informations listées à l’article L.221-5 du code de la consommation.
                            Sont transmises à l’acheteur, de manière claire et compréhensible, les informations suivantes :
                            -Les caractéristiques essentielles du bien ;
                            -Le prix du bien et/ou le mode de calcul du prix
                            -les informations relatives à l’identité du vendeur, à ses coordonnées postales, téléphoniques et électroniques, et à ses activités, celles relatives aux garanties légales, aux fonctionnalités du contenu numérique et, à l'existence et aux modalités de mise en oeuvre des garanties et autres conditions contractuelles.
                        </p>
                        <h2>Article IV - La commande</h2>
                        <p>
                            L’acheteur a la possibilité de passer sa commande en ligne au moyen du formulaire d’achat prévu lors de son inscription.
                            L’acheteur sera informé de tout indisponibilité du produit ou du bien commandé.
                            Pour que la commande soit validée, l’acheteur devra accepter, en cliquant à l’endroit indiqué, les présentes conditions générales. Il devra également indiquer l’adresse mail vers laquelle sera envoyé son produit, et enfin valider le mode de paiement.
                            La vente sera considérée comme définitive :
                            -après l’envoie à l’acheteur de la confirmation de l’acceptation de la commande par le vendeur par courrier électronique ;
                            -et après encaissement par le vendeur de l’intégralité du prix.
                            Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente.
                            Dans certains cas, notamment défaut de paiement, adresse erronée ou autre problème sur le compte de l’acheteur, le vendeur se réserve le droit de bloquer la commande de l’acheteur jusqu’à la résolution du problème.
                            Pour toute question relative au suivi d’une commande, l’acheteur doit appeler le numéro de téléphone suivant : 0326406000 (coût d’un appel local), aux jours et horaires suivants : du lundi au vendredi, de 9h à 18h, ou d’envoyer un mail au vendeur à l’adresse mail suivante : arena@utt.fr
                        </p>
                        <h2>Article V - Signature électronique</h2>
                        <p>
                            La fourniture en ligne du numéro de carte bancaire de l’acheteur et la validation finale de la commande vaudront preuve de l’accord de l’acheteur :
                            -exigibilité des sommes dues au titre du bon de commande,
                            -signature et acceptation expresse de toutes les opérations effectuées.
                            En cas d’utilisation frauduleuse de la carte bancaire, l’acheteur est invité, dès le constat de cette utilisation, à contacter le vendeur à l’adresse mail suivante : arena@utt.fr
                        </p>
                        <h2>Article VI - Confirmation de commande</h2>
                        <p>
                            Le vendeur fournit à l’acheteur un exemplaire du contrat, par messagerie électronique.
                        </p>
                        <h2>Article VII - Preuve de la transaction</h2>
                        <p>
                            Les registres informatisés, conservés dans les systèmes informatiques du vendeur dans des conditions raisonnables de sécurité, seront considérés comme les preuves des communications, des commandes et des paiements intervenus entre les parties. l’archivage des bons de commande et des factures est effectué sur un support fiable et durable pouvant être produit à titre de preuve.
                        </p>
                        <h2>Article VIII - Informations sur les produits</h2>
                        <p>
                            Les produits sont décrits et présentés avec la plus grande exactitude possible. Toutefois, si des erreurs ou des omissions ont pu se produire quant à cette présentation, la responsabilité du vendeur ne pourrait être engagée.
                            Les photographies des produits ne sont pas contractuelles.
                        </p>
                        <h2>Article IX - Prix</h2>
                        <p>
                            Le vendeur s’engage à ce que les tarifs indiqués lors de la commande demeurent les même jusqu’à confirmation par courrier électronique de la commande.
                            Les prix sont indiqués en euros et tiennent compte de la TVA applicable au jour de la commande. Tout changement du taux applicable TVA sera automatiquement répercuté sur le prix des produits de la boutique en ligne.
                        </p>
                        <h2>Article X - Mode de paiement</h2>
                        <p>
                            Il s’agit d’un commande avec obligation de paiement, ce qui signifie que la passation de la commande implique un règlement de l’acheteur.
                            Pour régler sa commande, l’acheteur dispose, à son choix, de l’ensemble des modes de paiements mis à sa disposition par le vendeur et listés sur le site du vendeur. L’acheteur garantit au vendeur qu’il dispose des autorisations éventuellement nécessaires pour utiliser le mode de paiement choisi par lui, lors de la validation du bon de commande.
                            Le paiement du prix s’effectue en totalité au jour de la commande, selon les modalités suivantes :
                            par carte de paiement.
                        </p>
                        <h2>Article XI - Droit de rétractation</h2>
                        <p>
                            Conformément à l'article L. 121-20-4 du code de la consommation, les inscriptions ne font pas l'objet d'un droit de rétractation. Toute commande est ferme et définitive.<br/>
                        Toutefois, l'organisateur autorise tout inscrit à demander un remboursement de son inscription, au plus tard 7 jours calendaires avant la date de l'évènement — soit le 30/11/22018 18:00 CET.<br/>
                            Toute demande doit être formulée par courriel addressé à arena@utt.fr, précisant le nom d'utilisateur et l'adresse courriel utilisée pour l'inscription. Le remboursement sera exécuté sous quinzaine à dater de la fin de l'évènement, et interviendra sur la carte bleue ayant servi au paiement. <br/>
                            Compte-tenu des frais bancaires endossés, tout remboursement fera l'objet d'une retenue d'un montant 1€ (un euro) sur le montant total à rembourser.
                        </p>
                        <h2>Article XII - Force majeure</h2>
                        <p>
                            Toutes circonstances indépendantes de la volonté des parties empêchant l’exécution dans des conditions normales de leurs obligations sont considérées comme des causes d’exonération des obligations des parties et entraînent leur suspension.
                            La partie qui invoque les circonstances visées ci-dessus doit avertir immédiatement l’autre partie de leur survenance, ainsi que de leur disparition.
                            Seront considérés comme cas de force majeure tous faits ou circonstances irrésistibles, extérieurs aux parties, imprévisibles, inévitables, indépendants de la volonté des parties et qui ne pourront être empêchés par ces dernières, malgré tous les efforts retenus par la jurisprudence des cours et des tribunaux français : catastrophes naturelle, arrêt des réseaux de télécommunication ou difficultés propres aux réseaux de télécommunication externes aux clients.
                            Les parties se rapprocheront pour examiner l’incidence de l’événement et convenir des conditions dans lesquelles l’exécution du contrat sera poursuivie. Si le cas de force majeure a une durée supérieure à trois mois, les présentes conditions générales pourront être résiliées par la partie lésée.
                        </p>
                        <h2>Article XIII - Propriété intellectuelle</h2>
                        <p>
                            Le contenu du site internet reste la propriété du vendeur, seul titulaire des droits de propriété intellectuelle sur ce contenu.
                            Les acheteurs s’engagent à ne faire aucun usage de ce contenu ; toute reproduction totale ou partielle de ce contenu est strictement interdite et est susceptible de constituer un délit de contrefaçon.
                        </p>
                        <h2>Article XIV - Informatiques et Libertés</h2>
                        <p>
                            Les données nominatives fournies par l’acheteur sont nécessaires au traitement de sa commande et à l’établissement de ses factures.
                            Elles peuvent être communiquées aux partenaires du vendeur chargés de l'exécution, du traitement, de la gestion et du paiement des commandes.
                            Le traitement des informations communiquées par l’intermédiaire du site internet de l’UTT Arena a fait l’objet d’une déclaration auprès de la CNIL.
                            L’acheteur dispose d’un droit d’accès permanent, de modification, de rectification et d’opposition s’agissant des informations le concernant. Ce droit peut être exercé dans les conditions et selon les modalités définies sur le site de l’UTT Arena.

                        </p>

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
