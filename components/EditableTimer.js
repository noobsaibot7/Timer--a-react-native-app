import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerForm from './TimerForm';
import Timer from './Timer';


export default class EditableTimer extends Component {
  static propTypes ={
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed:  PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired
  }
  state = {
    editFormOpen: false,
  };

  handleEditPress = () =>this.openForm()

  handleFormClose = () => this.closeForm()

  // handleDelete = val =>{
  //   const { onDeleteForm } = this.props;
  //   onDeleteForm(val);
  // }

  handleSubmit = timer => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timer);
    this.closeForm()
  }     

  closeForm = () => {
    this.setState({ editFormOpen: false })
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  //this events are passed down as props

  render() {
    const {
      id,
      title,
      project,
      elapsed,
      isRunning,
      onRemovePress,
      onStartPress,
      onStopPress
    } = this.props;
    // be ware of Timerform props as it is a reuseable form so we must never change the props name but we arev free to change the function name
    const { editFormOpen } = this.state;
    if (editFormOpen) {
      return (
        <TimerForm
          id={id}
          title={title}
          project={project}
          onFormSubmit={this.handleSubmit}
          onFormCancel={this.handleFormClose}
        />
      );
    }
    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
        onRemovePress = {onRemovePress}
        onStartPress = {onStartPress}
        onStopPress = { onStopPress }
      />
    );
  }

}