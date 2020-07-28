import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'

class About extends Component {
    render() {
      return (
          <Container className="container">
              <div  className="container">
                  <div> 
                    <h1>Jardin Cabellio constitue avant tout une communauté indépendante, militante, engagée. </h1>  
                    <p>Pour affirmer ses principes fondateurs, Jardin Cabellio a établi une charte sur laquelle repose l'ensemble de ses activités.
  Esprit de coopération et développement d'une agriculture biologique durable, transparence et relations commerciales repensées, qualité des produits et participation des consom'acteurs sont les piliers d'un texte fédérateur pour les participants au mouvement.
  Un cahier des charges composé de cinq conventions - distribution, gestion, sociale, écologique et communication - traduit cette charte en engagements pris et appliqués.</p>           
                    <h2>Un engagement au delà de l'individu, au fil des générations</h2>
                    <p>A la fin des années 70, les producteurs et consommateurs, animés par une même volonté de soutenir une agriculture biologique pour développer une consommation bio de qualité, se réunissent et projettent l'avenir. Soutenue, l'entreprise se reconvertit, et ainsi nait l'un des pionniers du bio au sein de la belle région de Cavaillon: Jardin Cabellio. 
                      <h4>LE LOCAL</h4>
                        <ul>Consommer local, c’est bon pour :
                          <li>Aider les producteurs bio en région, leur assurer une rémunération directe et favoriser ainsi une démarche de commerce équitable "Origine France".</li>
                          <li>Favoriser les rencontres avec les producteurs : manger un produit local, c’est rencontrer quelqu’un de sa région!</li>
                          <li>Diminuer l’empreinte écologique des produits.</li>
                          <li>Pour ses produits, Jardin Cabellio refuse tout transport par avion. Une évidence pour qui veut limiter les émissions de CO2!</li>
                        </ul>
                        </p>
                    </div>
                  <img src={'vue-et-paysan.jpeg'} alt='René et ses tomates'></img>
              </div>
          </Container>
        )
    }
  }
  
  export default About; 