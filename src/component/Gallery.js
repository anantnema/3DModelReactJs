import React, {Component} from 'react';

import Modal from "react-responsive-modal";
import data from '../Data/data.json';
import ThreeDModel from '../component/ThreeDModel';
import '../App.css';
import * as actionType from '../store/action';
import {connect} from 'react-redux';

class Gallery extends Component {

    render() {

        return (

            <div>

                {
                    data.categories.slice(0, this.props.lmt).map((el, i) => {
                        return (
                            <div className="App">
                                <h1>{el.name}</h1>
                                <div key={i} className="scrollmenu">
                                    {el.models.map(res => {
                                        return (
                                            <a key={res.name+i} onClick={() => this.props.onOpenModal(res.obj)}>
                                                <img src={res.thumb} style={{
                                                    borderRadius: '50%',
                                                    height: 100,
                                                    marginRight: 20,
                                                    width: 120,
                                                }} />
                                                <br/>
                                                {res.name}
                                            </a>
                                        )

                                    })}
                                </div>
                            </div>)
                    })
                }

                <Modal open={this.props.opn} onClose={this.props.onCloseModal}
                       center>

                    <ThreeDModel objValue={this.props.objValue}/>
                </Modal>

                <p style={{textAlign: 'center'}}>
                    <button
                        onClick={() => this.props.onLoadMore(data.categories.length)}>Load
                        More...
                    </button>
                    <br/>
                </p>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        lmt: state.limit,
        opn: state.open,
        objValue: state.objValue
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenModal: (objValue) => {
            return dispatch({
                type: actionType.OPEN_MODAL,
                objValue: objValue
            })
        },
        onCloseModal: () => dispatch({type: actionType.CLOSE_MODAL}),
        onLoadMore: (length) => dispatch({
            type: actionType.LOAD_MORE,
            len: length
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
