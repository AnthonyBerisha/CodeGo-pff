import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Product from '../product/product';
const CONFIG = require('../../config.json');
const API_URL = CONFIG.API_URL;


const Arrow = ({ text, className }) => {
  return (
    <div id="arrow"
      className={className} 
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: <i className="fas fa-caret-left"></i>, className: 'arrow-prev'});
const ArrowRight = Arrow({ text: <i className="fas fa-caret-right"></i>, className: 'arrow-next' });

class Home extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      selected: 0,
      wheel: false,
      alignCenter: true,
      products: []
      }
    }

  componentDidMount() {
    axios.get(`${API_URL}product/favorite`)
      .then(response => {
        console.log(response);
        this.setState({ 
          products: response.data
         })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    const { 
      selected,
      wheel,
    } = this.state;
    const productList = this.state.products.map((product) =>
        <Product product={product} key={product._id} />
    )

    

    return (
      <div>
        <Carousel>
          <Carousel.Item className="carousel__item">
          <img className="carousel__image carousel__image img-fluid"
               src='https://images.pexels.com/photos/6478/tree-lemon-fruit.jpg'
               alt='Plantation' />
            <Carousel.Caption>
              <div className="carousel__caption--shadow">
                <h2 className="carousel__caption-title">Bienvenue !</h2>
                <h3 className="carousel__caption-descr carousel__caption-descr--dark">Jardin Cabellio, une aventure biologique, responsable et écologique</h3>
            </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel__item">
          <img className="carousel__image img-fluid"
              src={'vegetables.jpg'}
              alt='Des bons légumes YUM'></img>
            <Carousel.Caption>
              <div>
                <h2 className="carousel__caption-title">Des produits 100% bio !</h2>
                <h3 className="carousel__caption-descr">Le souci de la terre, des hommes et des fruits</h3>
            </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="favorites">
            <h1 className="favorites__heading">Nos produits du moment</h1>
            <div className="mb-4">
              <ScrollMenu
                data={productList} 
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={selected}
                wheel={wheel}
              />
            </div>
          </div>
      </div>
    )
  }
}

export default Home;