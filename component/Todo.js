import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddTodo,
  UpdateTodo,
  RemoveTodo,
} from '../actions/todoAction/todoActions';
import {styles} from './TodoStyles';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Todo = () => {
  const [todoValue, setTodoValue] = useState('');
  const [todoButton, setTodoButton] = useState('Add Todo');
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const todos = data.todos.todos;
  const addTodo = () => {
    if (todos && !todos.includes(todoValue)) {
      console.log(todos);
      console.log(todoValue);
      dispatch(AddTodo(todoValue));
      setTodoValue('');
    } else {
      alert(`${todoValue} already added in Todo List`);
    }
  };

  const removeTodo = item => {
    const todoIndex = todos.indexOf(item);
    if (todoIndex > -1) {
      Alert.alert('Alert Title', 'Are you sure want to delete Text', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(RemoveTodo(item))},
      ]);
    } else {
      alert(`${todoValue} is not in the Todo List`);
    }
  };
  const editTodo = (item, index) => {
    console.log(item);
    setTodoValue(item);
    setTodoButton('Update Todo');
    setIndex(index);
    // const todoIndex = todos.indexOf(item);

    // let index = list.findIndex(todo => todo.id === id)
    // if(index === -1) return list;
    // let updatedList = update(list, {
    //   [index]: {
    //     todo: {$set: value}
    //   }

    // if (todoIndex > -1) {
    //   Alert.alert('Alert Title', 'Are you sure want to delete Text', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => dispatch(RemoveTodo(item))},
    //   ]);
    // } else {
    //   alert(`${todoValue} is not in the Todo List`);
    // }
  };
  const updateTodo = () => {
    console.log('todos', todos);
    console.log('todoValue', todoValue);
    console.log('index', index);
    todos[index] = todoValue;
    dispatch(UpdateTodo(todos));
    setTodoValue('');
    setTodoButton('Add Todo');
  };
  const renderTodoList = () => {
    return (
      <FlatList
        data={todos}
        renderItem={({item, index}) => (
          <View style={styles.todoView}>
            <View style={styles.todoList}>
              <Text style={{width:'60%'}}>{item}</Text>
              <TouchableOpacity
                style={styles.removeTodo}
                onPress={() => editTodo(item, index)}>
                <Text> Edit </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeTodo}
                onPress={() => removeTodo(item)}>
                <Text> X </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.mainInput}
        onChangeText={setTodoValue}
        placeholder={'Add your todo here'}
        value={todoValue}
      />
      <Button
        name="increase"
        title={todoButton}
        onPress={todoButton === 'Add Todo' ? addTodo : updateTodo}
      />

      <Text style={{alignSelf: 'stretch', paddingLeft: 40}}>
        List of Todos :
      </Text>
      {renderTodoList()}
    </View>
  );
};

export default Todo;
