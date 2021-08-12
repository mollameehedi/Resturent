import React, {Component} from 'react';
import DISHES from '../../data/dishes';
import MenuItem from './MenuItem';
import DishDetail from './DishDetail';
import {CardColumns, Modal, ModalBody, ModalFooter, Button} from 'reactstrap';
import COMMENTS from '../../data/comments'

class Menu extends Component {
    state = {
        dishes : DISHES,
        comments : COMMENTS,
        selectedDish : null,
        modalOpen: false,
    }

    onDishSelect = dish => {
        this.setState({
            selectedDish : dish,
            modalOpen: !this.state.modalOpen,
        })
    }
    toggleModale = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        })
    }

    render(){
        document.title = 'Menu | Resturent';
        const menu = this.state.dishes.map( item => {
             return(
                    <MenuItem
                    dish={item}
                    key={item.id}
                    DishSelect={ () => this.onDishSelect(item)}
                />
             );
        })
        let dishDetail = null ;
        if (this.state.selectedDish != null) {
            const comments = this.state.comments.filter(comment => comment.dishId === this.state.selectedDish.id)
            dishDetail = <DishDetail 
                                dish={this.state.selectedDish} 
                                comments={comments}
                                />
        }
        return(
            <div className="container">
                <div className="row">
                    <CardColumns>
                        {menu}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen} onClick={this.toggleModale}>
                        <ModalBody>
                            {dishDetail}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModale}>
                                closs
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}


export default Menu;