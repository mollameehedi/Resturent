import React,{Component} from 'react';
import MenuItem from './MenuItem'
import DishDetail from './DishDetail';
import {CardColumns, Modal, ModalBody, ModalFooter, Button, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import { addComment, fetchDishes, fetchComment } from '../../redux/actionCreators';
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
        fetchDishes: () => dispatch(fetchDishes()),
        fetchComment: () => dispatch(fetchComment())
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
        this.props.fetchDishes();
        this.props.fetchComment();
    }
    render() {
        document.title='Menu';
        if (this.props.dishes.isLoading) {
            return(
                <Loading/>
            )
            console.log("Loading")
        }
        else if(this.props.dishes.errMess!=null){
            console.log('Message')
            return(
                <div>
                    <Alert color='danger'>{this.props.dishes.errMess}</Alert>
                </div>
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
            const  comments = this.props.comments.comments.filter(comment => comment.dishId === this.state.selectedDish.id);

            dishDetail = <DishDetail 
                    dish={this.state.selectedDish}
                    comments={comments}
                    addComment={this.props.addComment}
                    commentsIsLoading={this.props.comments.isLoading}
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