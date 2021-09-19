import React,{Component} from 'react';
import MenuItem from './MenuItem'
import DishDetail from './DishDetail';
import {CardColumns, Modal, ModalBody, ModalFooter, Button} from 'reactstrap';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../../redux/actionCreators';
import Loading from './Loading';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments
    }
}


const mapDispatchToProps = dispatch => {
    return{
        addComment :(dishId, author, rating, comment) => dispatch(addComment(dishId, author, rating, comment)) ,
        fetchDishes: () => dispatch(fetchDishes())
    }
}

class Menu extends Component {
    state = {
        selectedDish: null,
        modalOpen: false,
    }
    onDishSetect = dish => {
        this.setState({
             selectedDish: dish,
             modalOpen: !this.state.modalOpen,
            })
    }
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        })
    }
    componentDidMount(){
        this.props.fetchDishes()
    }
    render() {
        document.title='Menu';
        if (this.props.dishes.isLoading) {
            return(
                <Loading/>
            )
        }
        else{
        const menu = this.props.dishes.dishes.map( item => {
            return(
                <MenuItem
                key={item.id}
                dish={item}
                DishSelect={ () => this.onDishSetect(item)}
                />
            );
        })

        let dishDetail = null;

        if (this.state.selectedDish != null) {
            const  comments = this.props.comments.filter(comment => comment.dishId === this.state.selectedDish.id);

            dishDetail = <DishDetail 
                    dish={this.state.selectedDish}
                    comments={comments}
                    addComment={this.props.addComment}
                    />
        }
        return(
            <div className="container">
                <div className='row'>
                    <CardColumns> 
                         {menu}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>
                             {dishDetail}
                        </ModalBody>
                        <ModalFooter>
                         <Button color='secondary' onClick={this.toggleModal}>
                            closs
                            </Button>    
                        </ModalFooter>    
                     </Modal>  
                     
                </div>
            </div>
        );
    }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);