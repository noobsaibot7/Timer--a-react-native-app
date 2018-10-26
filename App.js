import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import uuidv4 from 'uuid/v4';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/TimerUtils';

export default class App extends Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false
      }
    ]
  };

  // adding timing functionality to our app
  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          };
        })
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    //  this creates a new state i.e we must never mutate state
    this.setState({ timers: [newTimer(timer), ...timers] });
  };

  //this function handles the deleting of the form

  handleRemovePress = id => {
    const { timers } = this.state;
    this.setState({
      timers: timers.filter(timer => timer.id !== id)
    });
  };

  //  this form handles the submit in changes to our forms i.e after editing it
  handleFormSubmit = attr => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        const { title, project, id } = attr;
        if (timer.id === attr.id) {
          return {
            ...timer,
            title,
            project
          };
        }
        // if it doesnt match, we just return the timer
        // using map in setstate helps to keep state immmutable
        return timer;
      })
    });
  };

  //this function determines when the timer should start and stop
  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState;
      return {
        timers: timers.map(timer => {
          const { isRunning, id } = timer;
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            };
          }
          return timer;
        })
      };
    });
  };

  render() {
    const { timers } = this.state;
    //console.warn(timers);
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.timerFlexKeyboard}
          behavior="padding"
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              <EditableTimer
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                key={id}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
    backgroundColor: '#f2473f'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  timerList: {
    paddingBottom: 15
  },
  timerFlexKeyboard: {
    flex: 1
  }
});
